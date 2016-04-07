var socketio = require('socket.io');

var startRoomServer = function (app, port){
    
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    server.listen(port, function(err){
        if(err){
            throw err;
        }
        console.log('IO Server and App started  on Port: ' + port);
    });
    
    
    
    var characters = [];
    
    io.on('connection', function(socket){
        
        socket.on("join", function(data){
            console.log("User Joined");
            socket.join(data.roomName);
        });
        
        socket.on('createRequest', function(data){
            
            io.sockets.in(data.roomName).emit('newCharacter', {
                name: data.name,
                hp: data.health
            });
            
        });
        
        socket.on('updateOrderServer', function(data){
            
            console.log("recieved update order");
            
            socket.broadcast.to(data.roomName).emit('updateOrder', {
                posCurrent: data.posCurrent,
                posPrevious: data.posPrevious
            });
            
        });
        
    });    
    
};

module.exports = startRoomServer;