var controllers = require('./controllers');

var router = function(app){
    app.get("/", controllers.Room.roomPage);
};

module.exports = router;