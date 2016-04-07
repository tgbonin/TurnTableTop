$(function(){
    $('#charactersDiv').sortable();
    
    connectSocket();
});

var socket;
var room = 'test';

function connectSocket(){
    socket = io.connect();
    
    $("#charactersDiv").on("sortupdate", function (event, ui) {

        var characterHeight = $('.character').outerHeight(false) + /*margin height*/ 10;
        
        console.dir(characterHeight);
        
        var curPos = Math.floor(ui.position.top / characterHeight);
        var prevPos = Math.floor(ui.originalPosition.top / characterHeight);
        
        if(curPos < 0) curPos = 0;
        if(curPos > $('.character').length -1) curPos = $('.character').length -1;
        
        console.log("Sending update");
        socket.emit("updateOrderServer", {
            posCurrent: curPos,
            posPrevious: prevPos,
            roomName: room
        });
        
        console.dir({
            posCurrent: curPos,
            posPrevious: prevPos
        });
        
    });
    
    socket.on('connect', function(){
        console.log("connected to room");
        socket.emit('join', {roomName: room});
    });
    
    socket.on('updateOrder', function(data){   
        
        var characterDivs = $('.character');
        
        if(data.posCurrent != 0) {
            $(characterDivs[data.posPrevious]).insertAfter($(characterDivs[data.posCurrent]));
        }
        else{
            $(characterDivs[data.posPrevious]).insertBefore($(characterDivs[0]));
        }
    });
}