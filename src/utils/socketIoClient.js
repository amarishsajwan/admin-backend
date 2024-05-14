const openSocket = require('socket.io-client');
const constants = require('./constants')
const socket = openSocket(constants.SOCKET_URL);


module.exports = {
    send: async (body) => {
        socket.emit('createOrder', body)
    }
};