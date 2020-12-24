const DataService = require('../services/data');
const jwtHelper = require('../helpers/jwt');
const config = require('../config/constants');
const DeviceService = require('../services/device');
async function saveData(socket, document) {
    try {
        let newData = DataService.newData(socket, document);
        let result = await DataService.insert(newData);
        return result;
    } catch (error) {
        return error;
    }
}
async function checkSocketToken(document) {
    try {
        const device = await jwtHelper.verifyToken(
            document.device,
            config.jwt.deviceSecret
        );
        const user = await jwtHelper.verifyToken(
            document.user,
            config.jwt.accessSecret
        );
        document.device = device;
        document.user = user;
        return document;
    } catch (error) {
        return false;
    }
}
async function checkDevice(deviceID) {
    try {
        const device = await DeviceService.getDevice(deviceID);
        return device;
    } catch (error) {
        return error;
    }
}

function socketFunction(socket) {
    console.log('Device connected', socket.id);
    socket.join(socket.id.toString());
    socket.on('disconnect', () => {
        console.log('Device disconnected', socket.id);
    });
    socket.on('send-data-from-client', (document) => {
        checkDevice(document.device).then((result, error) => {
            if (error) {
                socket.emit('return-from-server', 'Auth failed');
                socket.disconnect();
            }
            saveData(socket, document).then((data, error) => {
                if (error) {
                    socket
                        .to(socket.id.toString())
                        .emit('return-from-server', 'Save data failed !');
                } else {
                    socket.to(socket.id.toString()).emit('return-from-server', data);
                }
            });
        });
    });
}

module.exports = {
    socketFunction,
};