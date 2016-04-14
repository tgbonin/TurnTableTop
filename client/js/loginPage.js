$(function(){
    $("#menu").accordion({
        header: "h2",
        active: false,
        collapsible: true,
        heightStyle: "content"
    });
    
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
    
    $("#btnSignIn").on("click", function(){
        var inputName = $("input[name='signInName']")[0].value;
        var inputPass = $("input[name='signInPass']")[0].value;
        
        if(inputName == '' || inputPass == ''){
            //handle error
            return false;
        }
        
        var request = $.param({
            username: inputName,
            password: inputPass,
            _csrf: $("input[name='_csrf']")[0].value
        });
        
        sendAjax("/login", request);
        return false;
    });
    
    $("#btnCreateAccount").on("click", function(){
        var inputName =  $("input[name='signUpName']")[0].value;
        var inputPass1 = $("input[name='signUpPass1']")[0].value;
        var inputPass2 = $("input[name='signUpPass2']")[0].value;
        
        if(inputName == '' || inputPass1 == '' || inputPass2 == ''){
            //error
            return false;
        }
        
        var request = $.param({
            username: inputName,
            password1: inputPass1,
            password2: inputPass2,
            _csrf: $("input[name='_csrf']")[0].value
        });
        
        sendAjax("/signup", request);
        return false;
    });
    
})