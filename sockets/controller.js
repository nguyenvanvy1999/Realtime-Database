const SocketService = require('./service');

async function receiveDataFromClient(socket, document) {
    try {
        const isAuth = await SocketService.checkDevice(document.device);
        if (!isAuth) {
            socket.emit('message', 'Auth failed');
            socket.disconnect();
        }
        const result = await SocketService.saveData(socket, document);
        socket.emit('message', result); //FIXME:emit to this user, not is to all user
    } catch (error) {
        socket.emit('message', error);
    }
}

module.exports = { receiveDataFromClient };