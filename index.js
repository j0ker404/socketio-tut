const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // listen for events of 'connection'
    console.log('a user connected');
    // each socket also fires a 'disconnect' event
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // listen to 'chat message' event
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
})


http.listen(3000, () => {
    console.log('listening on *:3000');
});