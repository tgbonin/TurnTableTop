$(function(){
    
    function sendAjax(action, data){
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) { 
              window.location = result.redirect; 
            },
            error: function(xhr, status, error){
                var msgObj = JSON.parse(xhr.responseText);
                console.log(msgObj.error);
            }
        });
    }
    
    $("#menu").accordion({
        header: "h2",
        active: false,
        collapsible: true,
        heightStyle: "content"
    });
    
    $("#btnLogOut").on('click', function(){
        window.location.href = '/logout';
    });
    
    $("#charactersSelect").on('click', function(){
        window.location.href = '/characters'; 
    });
    
    $("#btnJoinRoom").on('click', function(){
        var roomKey = $("input[name='joinRoomKey']")[0].value;
        var pass = $("input[name='joinRoomPass']")[0].value;
        
        //if(roomKey == '' || pass == ''){
        //    return false;
        //}
        //
        //var request = $.param({
        //    roomKey: roomKey,
        //    pass: pass
        //});
        //
        //sendAjax("/joinRoom", request);
        //return false;
        
        localStorage.setItem("room", roomKey);
        localStorage.setItem("pass", pass);
        localStorage.setItem("creating", false);
        
        window.location = "/room";
    });
    
    $("#btnCreateRoom").on('click', function(){
        var roomKey = $("input[name='createRoomKey']")[0].value;
        var pass = $("input[name='createRoomPass']")[0].value;
        
        //if(roomKey == '' || pass == ''){
        //    return false;
        //}
        //
        //var request = $.param({
        //    roomKey: roomKey,
        //    pass: pass
        //});
        //
        //sendAjax("/createRoom", request);
        //return false;
        
        localStorage.setItem("room", roomKey);
        localStorage.setItem("pass", pass);
        localStorage.setItem("creating", true);
        
        window.location = "/room";
        
    });
    
})