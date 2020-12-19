const dataService = require("../services/data");

async function saveData(socket, document) {
    let newData = dataService.newData(socket, document);
    let result = await dataService.insert(newData);
    console.log(result);
}

function socketFunction(socket) {
    console.log("Device connected", socket.id);
    socket.on("disconnect", () => {
        console.log("Device disconnected", socket.id);
    });
    socket.on("send-data-from-client", (document) => {
        saveData(socket, document);
    });
}
module.exports = {
    socketFunction,
};