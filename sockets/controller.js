const SocketService = require('./service');

async function receiveDataFromClient(socket, document) {
    try {
        const isAuth = await SocketService.checkDevice(document.device);
        if (!isAuth) {
            socket.emit('message', 'Auth failed');
            socket.disconnect();
        }
        let result = await SocketService.saveData(socket, document);
        console.log(result);
        socket.emit('message', result);
    } catch (error) {
        socket.emit('message', error);
    }
}

module.exports = {
    receiveDataFromClient: receiveDataFromClient,
};