$(document).ready(function() {
    
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
    
    $("#btnCreateCharacter").on("click", function(){
        var inputName =  $("input[name='cName']")[0].value;
        var inputHealth = $("input[name='cHealth']")[0].value;
        var inputInitiative = $("input[name='cInitiative']")[0].value;
        
        if(inputName == '' || inputHealth == '' || inputInitiative == ''){
            return false;
        }
        
        var request = $.param({
            name: inputName,
            health: inputHealth,
            initiative: inputInitiative,
            _csrf: $("input[name='_csrf']")[0].value
        });
        
        sendAjax("/characters", request);
    });
    
    var deleteButtons = $(".charDelete");
    
    for(var i = 0; i < deleteButtons.length; i++){
        
        deleteButtons[i].onclick = (function(e){
            e.preventDefault();
            
            var siblings = $(this).siblings();
            var name = siblings[0].innerHTML.slice(6);
            
            var request = $.param({name: name, _csrf: $("input[name='_csrf']")[0].value});
            
            sendAjax("/characterDelete", request);
        });
    }
    
});