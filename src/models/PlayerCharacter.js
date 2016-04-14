var mongoose = require('mongoose');
var _ = require('underscore');

var PCModel;

var setName = function(name) {
    return _.escape(name).trim();
};

var PCSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    health: {
        type: Number,
        required: true
    },
    
    initiative: {
        type: Number,
        required: true
    },
    
    picture: {
        type: String,
    },
    
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account'
    },
    
    metaData: {
        type: Date,
        default: Date.now
    }
});

PCSchema.methods.toAPI = function() {
    return {
        name: this.name,
        health: this.health,
        initiative: this.initiative,
        picture: this.picture
    };
};

PCSchema.statics.findByOwner = function(ownerId, callback) {
    var search = {
        owner: mongoose.Types.ObjectId(ownerId),
    };
    
    return PCModel.find(search).select("name health initiative picture").exec(callback);
};

PCSchema.statics.deleteSpecific = function(ownerID, _name, callback) {
    var search = {
        owner: mongoose.Types.ObjectId(ownerID),
        name: _name
    };
    
    return PCModel.find(search).remove().exec(callback);
};

PCModel = mongoose.model('PlayerCharacter', PCSchema);

module.exports.PCModel = PCModel;
module.exports.PCSchema = PCSchema;