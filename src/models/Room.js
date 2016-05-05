var mongoose = require('mongoose');
var _ = require('underscore');

var RoomModel;

var RoomSchema = new mongoose.Schema({
   
    name: {
        type: "string",
        required: true
    },
    
    password: {
        type: "string",
        required: true
    }
});

RoomSchema.methods.toAPI = function(){
    return {
        name: this.name,
        pass: this.pass
    };
};

RoomSchema.statics.checkRoomPassword = function(roomName, pass, callback){
    var search = {
        name: roomName
    };
    
    console.log(PCModel.find(search).select("pass"));
};

RoomModel = mongoose.model('Room', RoomSchema);

module.exports.RoomModel = RoomModel;
module.exports.RoomSchema = RoomSchema;