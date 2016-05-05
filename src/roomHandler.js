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
    
    
    var RoomPasswordTable = [];
    var RoomCharactersTable = [];
    
    io.on('connection', function(socket){
        
        socket.on("join", function(data){
            
            console.log(data.creating);
            console.log(data.roomName);
            console.log(data.pass);
            
            if(data.creating === "true"){
                
                console.log("Trying to make room");
                
                if(data.roomName in RoomPasswordTable){
                    socket.emit('roomConnectionFail', {
                        err: "Room already exists with that name. Reconnect to it or use another name." 
                    });
                    return;
                }
                
                RoomPasswordTable[data.roomName] = data.pass; 
                socket.join(data.roomName);
                
                RoomCharactersTable[data.roomName] = [];
                RoomCharactersTable[data.roomName].push({
                    name: "ENEMY"
                });
                
                socket.emit('roomConnectionSuccess', []);
                
                return;
            }
            else{
                
                console.log("Trying to connect to Room");
                
                if(!(data.roomName in RoomPasswordTable)){
                    socket.emit('roomConnectionFail', {
                        err: "Room doesn't exist with that name." 
                    });
                    return;
                }
                
                if(RoomPasswordTable[data.roomName] != data.pass){
                    socket.emit('roomConnectionFail', {
                        err: "Incorrect Password." 
                    });
                    return;
                }
                
                socket.join(data.roomName);
                
                socket.emit('roomConnectionSuccess', RoomCharactersTable[data.roomName]);
                
            }
            
        });
        
        socket.on('createRequest', function(data){
            
            RoomCharactersTable[data.roomName].push({
                name: data.name,
                hp: data.health,
                init: data.init
            });
            
            io.sockets.in(data.roomName).emit('newCharacter', {
                name: data.name,
                hp: data.health,
                init: data.init
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