var _ = require('underscore');
var models = require('../models');

var PlayerCharacter = models.PlayerCharacter;

var characterPage = function(req, res) {
    PlayerCharacter.PCModel.findByOwner(req.session.account._id, function(err, entries) {
        if(err) {
            console.log(err);
            return res.status(400).json({error: "An Error occured"});
        } 
        
        res.render('charactersPage', {csrfToken: req.csrfToken(), characters: entries});
        
    });
};

var getCharacters = function(req, res) {
    PlayerCharacter.PCModel.findByOwner(req.session.account._id, function(err, entries){
        
        if(err){
            console.log(err);
            return res.status(400).json({error: "An Error occured"});
        }
        
        return res.status(200).json(entries); 
    });    
};

var createCharacter = function(req, res) {
    if(!req.body.name || !req.body.health || !req.body.initiative) {
        return res.status(400).json({error: "All fields are required"});
    }
    
    var data = {
        name: req.body.name,
        health: req.body.health,
        initiative: req.body.initiative,
        owner: req.session.account._id
    };
    
    var newChar = new PlayerCharacter.PCModel(data);
    
    newChar.save(function(err) {
        if(err) {
            return res.status(400).json({error: "An error occured while creating a new character"});
        }
        res.json({redirect: '/characters'});
    });
};

var deleteCharacter = function(req, res){
    console.log("Delete Requested: " + req.body.name);
    
    PlayerCharacter.PCModel.deleteSpecific(req.session.account._id, req.body.name, function(err, docs) { 
        console.log("Entry Deleted");
    });
    res.json({redirect: "/characters"});
};

module.exports.characterPage = characterPage;
module.exports.getCharacters = getCharacters;
module.exports.createCharacter = createCharacter;
module.exports.delete = deleteCharacter;