var User = require('../models/user');
var Place = require('../models/place');
//var mongoose = require('mongoose');
//var fileId = mongoose.Types.ObjectId();

function bdFunctions(){

    /* Esta funcion, agrega lugar al que el usuario desaria asistir.
    *
    * */

    this.addPlace = function(req, res, next){
        User
        .findOneAndUpdate({ 'facebook.id': req.params.usid }, { $push: { places: req.params.place }})
//req.user.facebook.id
        .exec(function(err, result) {
            console.log("Place Added!, user id:"+req.params.id+" , place id: "+req.params.place);
            //res.json(result);
            return next();
        });
       //pub-momo-santiago-de-compostela-2 
    };

    this.removePlace = function(req, res, next){
        User
        .findOneAndUpdate({'facebook.id': req.params.usid }, 
            { $pull: { places: req.params.place } }, { 'new': true })
        .exec(function(err, result) {
            console.log("DELETED!!!: "+"user id:"+req.params.id+" , place id: "+req.params.place);
            console.log(result);
            //res.json(result);
            return next();
        });
    };

    this.loadPlaces = function(req, res){
        User
        .findOne({ 'facebook.id': req.params.usid }, {'_id': false})
        //req.user.facebook.id
        .exec(function(err, result){
            var aux = {};
            aux.userdata = result;
            Place.find({}, {'_id': false})
            .exec(function (err, result2){
                aux.placedata = result2;
                //console.log(aux);
                res.json(aux);
            });
            if(err) console.log("error..");
        });
    };

    this.loadPlaces2 = function(req, res){
        Place.find({}, {'_id': false})
        .exec(function (err, result2){
            res.json(result2);
        });
    }
    
    this.loadUser = function(req, res){
        User
        .findOne({ 'facebook.id': req.params.usid }, {'_id': false})
        .exec(function (err, result2){
            res.json(result2);
        });
    }

    this.changePlace = function(req, res){
        User
        .findOneAndUpdate({ 'recentplace': req.params.place })
        .exec(function(err, result){
            res.json(result);
        });
    }

    this.addGoingPlace = function(req, res){
       Place.findOne({ 'facebook.id': req.params.usid },{ 'place_id': req.params.place })
        .exec(function(err, result){
            if(result){
        Place.findOneAndUpdate({ 'place_id': req.params.place }, { $inc: { 'going': 1 } })
        .exec(function(err, result){
            res.json(result);
        });
            }
            else{
                var newPlace = new Place({
                    'place_id': req.params.place,
                    'going': 1
                });
                newPlace.save(function(err, result2){
                    res.json(result2);
                });
            }
        });
    }

    this.addGoing = function(req, res){
        Place.findOneAndUpdate({ 'place_id': req.params.place }, { $inc: { 'going': 1 } })
        .exec(function(err, result){
            res.json(result);
        });
    };

    this.removeGoingPlace = function(req, res){
        Place.findOneAndUpdate({ 'place_id': req.params.place }, { $inc: { 'going': -1 } })
        .exec(function(err, result){
            res.json(result);
        });
    };



    /* Estos de abajo no los pesques, por que es de otra app (de los votos)
    *
    * */
/*
    this.getProfilePolls = function(req, res){
            Polls
            .find({'creator': req.user.local.email}, {'id_': false})
            .exec(function(err, result){
                console.log(result);
                res.json(result);
            });
    };

   this.postPoll = function (req, res){
        //if (err) { console.log("error no se xq ¬¬"); throw err; }
        console.log("holaa"); 
        var newPoll = new Polls({
            'creator': req.user.local.email,
            'pollname': req.body.pollname,
            'hola' : []
        });
        if(req.body.ins){
            req.body.ins.forEach(function(aux){
                var aux2 = {'name': aux, 'votes': 0};
                newPoll.hola.push(aux2);
            });
        }
        newPoll.save(function (err, doc) {
            if (err) { throw err; }
            //res.json(doc);
            res.redirect('/profile');
        });
    }; 

    this.getUser =  function(req, res){
        res.render('pollform.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    };

     this.getPoll = function(req, res){
        Polls
        .find({'pollname': req.params.id})
        .exec(function(err, result){
            console.log(req.params.id);
            if(!result) return [{}];
            res.json(result);
       });
    }; 

    this.postVote = function(req, res){
        Polls
        .findOneAndUpdate({'pollname': req.params.id, 'hola.name': req.params.id2}, {$inc: {'hola.$.votes': 1}})
        .exec(function(err, result) {
            res.redirect('/done');
        });
    };

    this.prepareEdit = function(req, res){
        Polls
        .find({'creator': req.user.local.email, 'pollname': req.params.id })
        .exec(function(err, result){
            res.render('polledit.ejs', {
                user : req.user, polls : result
            });
       });
    }; 

   this.deletePoll =  function(req, res){
        Polls
        .findOneAndRemove({ 
            'pollname' : req.params.id, 
            'creator' : req.user.local.email })
        //.exec(function(err, result) { console.log(res.json(result)); })
        //.remove()
        .exec(function(err) {
            console.log(req.params.id + '  ');
            console.log(req.user.local.email);
            res.redirect('/profile');
        });
    };


    this.viewPoll = function(req, res){
        Polls
        .find({'pollname': req.params.id})
        .exec(function (err, result) {
            res.redirect('/poll');
        });
    };
*/
}
module.exports = bdFunctions;
