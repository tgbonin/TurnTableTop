$(function(){
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
    
})