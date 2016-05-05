var models = require('../models');
var Room = models.Room;

var roomPage = function(req, res) {
    res.render('testRoom', {csrfToken: req.csrfToken()});
};

var createRoom = function(req, res){
    var data = {
        name: req.body.name,
        pass: req.body.pass
    };
    
    var newRoom = new Room.RoomModel(data);
    
    newRoom.save(function(err){
        if(err){
            //return res.status(400).json({error: "An error occured", err});
        } 
        res.json({redirect: "/room/"});
    });
};

module.exports.roomPage = roomPage;