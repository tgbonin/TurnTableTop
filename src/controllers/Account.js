var models = require('../models');
var Account = models.Account;

var loginPage = function(req, res) {
    res.render('loggedOut', {csrfToken: req.csrfToken()});
};

var mainPage = function(req, res) {
    res.render('mainPage', {csrfToken: req.csrfToken()});
};

var logout = function(req, res){
    req.session.destroy();
    res.redirect('/login');
};

var login = function(req, res){
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({error: "Please enter both username and password"});
    }
    
    Account.AccountModel.authenticate(req.body.username, req.body.password, function(err,account){
        if(err || !account){
            return res.status(401).json({error: "Username or Password is wrong!"});
        } 
    
        req.session.account = account.toAPI();
        res.json({redirect: '/'});
    });
};

var signup = function(req, res){
    
    if(!req.body.username || !req.body.password1 || !req.body.password2) {
        return res.status(400).json({error: "Please input all needed information"});
    }
    
    if(req.body.password1 !== req.body.password2) {
        return res.status(400).json({error: "Passwords do not match"});
    }
    
    Account.AccountModel.generateHash(req.body.password1, function(salt, hash) {
        var accountData = {
            username: req.body.username,
            salt: salt,
            password: hash
        };
        
        var newAccount = new Account.AccountModel(accountData);
        
        newAccount.save(function(err){
           if(err){
               console.log(err);
               return res.status(400).json({error: 'An error occured'});
           } 
            
            req.session.account = newAccount.toAPI();
            
            res.json({redirect: '/'});
        });
    });
};


module.exports.loginPage = loginPage;
module.exports.mainPage = mainPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;