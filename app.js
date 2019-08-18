const ws = require('ws');

const wss = new ws.Server({port: process.env.PORT || 8080});

console.log("Server running on port "+wss.options.port);

wss.on('connection', function connection(ws, req){
    console.log('Websocket opened with : ' + req.connection.remoteAddress);
    ws.on('message', function incoming(message){
        console.log('received : %s', message);
        wss.clients.forEach(function each(client){
            if(client != ws){
                client.send(message);
            }
        });
    });
});
