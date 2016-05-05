var controllers = require('./controllers');
var middleware = require('./middleware');

var router = function(app){
    app.get("/", middleware.requiresLogin, controllers.Account.mainPage);
    app.get("/logout", middleware.requiresLogin, controllers.Account.logout);
    
    app.get("/login", middleware.requiresSecure, middleware.requiresLogout, controllers.Account.loginPage);
    app.post("/login", middleware.requiresSecure, middleware.requiresLogout, controllers.Account.login);
    app.post("/signup", middleware.requiresSecure, middleware.requiresLogout, controllers.Account.signup);
    
    app.get("/room", middleware.requiresLogin, controllers.Room.roomPage);
    
    //app.post("/joinRoom", middleware.requiresLogin, controllers.Room.joinRoom);
    //app.post("/createRoom", middleware.requiresLogin, controllers.Room.createRoom);
    
    app.get("/characters", middleware.requiresLogin, controllers.Character.characterPage);
    app.post("/getCharacters", middleware.requiresLogin, controllers.Character.getCharacters);
    app.post("/characters", middleware.requiresLogin, controllers.Character.createCharacter);
    app.post("/characterDelete", middleware.requiresLogin, controllers.Character.delete);
};

module.exports = router;