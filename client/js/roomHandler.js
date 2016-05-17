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
        socket.emit('join', 
                    {
                        roomName: localStorage.getItem("room"),
                        pass: localStorage.getItem("pass"),
                        creating: localStorage.getItem("creating")
                    }
                   );
    });
    
    socket.on('roomConnectionSuccess', function(data){
        console.log('connection successful'); 
        room = localStorage.getItem("room");
        
        for(var i = 0; i < data.length; i++){
            AddCharToRoom(data[i]);
        }
        
        GetCharacterList();
    });
    
    socket.on('roomConnectionFail', function(data){
        alert(data.err);
        window.location = '/';
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
    
    socket.on('newCharacter', function(data){
        AddCharToRoom(data);
    });
    
    socket.on('removeCharacter', function(data){
       //remove a character from the table 
    });
}

function GetCharacterList(){
    
    $.ajax({
        cache: false,
        type: "POST",
        url: "getCharacters",
        data: $.param({_csrf: $("input[name='_csrf']")[0].value}),
        dataType: "json",
        success: function(result, status, xhr){
            DisplayPlayerCharacters(result)
        }
    });
    
}

function DisplayPlayerCharacters(characters){
    for(var i = 0; i < characters.length; i++){
        var option = document.createElement("option");
        option.appendChild(document.createTextNode(characters[i].name));
        option.setAttribute("value", i);
        $("#charSelector").append(option);
    }
    
    $("#charSelectDiv").fadeIn();
    
    $("#btnCharEnter").on("click", function(){
        if(("#charSelector")[0].value != ""){
            $("#charSelectDiv").fadeOut();
            
            console.dir(characters);
            console.dir($("#charSelector")[0]);
            var char = characters[$("#charSelector")[0].value];
            
            socket.emit("createRequest",{
                name: char.name,
                health: char.health,
                init: char.initiative,
                roomName: room
            });
        }
    });
}

function AddCharToRoom(char){
    
    console.dir(char);
    
    if(char.name != "ENEMY"){
        var characterDiv = document.createElement("div");
        characterDiv.setAttribute("class", "character");
        
        var charName = document.createElement("h2");
        charName.appendChild(document.createTextNode(char.name));
        characterDiv.appendChild(charName);
        
        var charHealth = document.createElement("h3");
        charHealth.appendChild(document.createTextNode("Health: " + char.hp + "/" + char.hp));
        characterDiv.appendChild(charHealth);
        
        var charInit = document.createElement("h3");
        charInit.appendChild(document.createTextNode("Initiative: " + char.init));
        characterDiv.appendChild(charInit);
        
        $("#charactersDiv").append(characterDiv);
    }
}





