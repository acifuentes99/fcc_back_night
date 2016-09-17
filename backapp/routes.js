var path = process.cwd();

var Handler = require(path+'/backapp/controllers/bdFunctions');

var yelp        = require('yelp');
var yelpvar = new yelp({
  consumer_key: '60CIvGi08h4RjtV3a-8UbA',
  consumer_secret: 'YtUEuoas7-2m-0Y3a0daIVm36Nk',
  token: 'V_orI-k-kAKcYdkQfKHOvJa22ZsByL0A',
  token_secret: 'eZfWb8-wYGhLukeImRiLNUDTo5Y',
});

module.exports = function (app, passport) {
    
    var dbHandler = new Handler();

    app.route('/')
        .get(function(req, res) {
            if(req.user) console.log("user logged!");

            res.render('index.ejs', { user: req.user });
    });

    app.route('/profile')
        .get(isLoggedIn, function(req, res) {
            res.render('profile.ejs', { user: req.user });
    });

    app.route('/login')
    .get(function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    })

    app.route('/signup')
    .get( function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.route('/search/:id')
        .get(function(req, res) {
            //res.sendFile(process.cwd() + '/public/index.html');

            //console.log(req.body.place);
            yelpvar.search({ term: 'bar', location: req.params.id })
            .then(function (data) {
                //res.render('index.ejs', { food: data });
                res.send(data);
            })
            .catch(function (err) {
              console.error(err);
            });
    });

    app.route('/test')
    .get(function(req, res) {
        res.send('{"datas" : "ok.... fetched!"}');
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            //successRedirect : '/profile',
            successRedirect : '/',
            failureRedirect : '/'
    }));


// Request API access: http://www.yelp.com/developers/getting_started/api_access 
 
// See http://www.yelp.com/developers/documentation/v2/search_api 
    
    /******************/
    /*** API ROUTES ***/
    /******************/

    app.route('/api/post/:usid/:place')
    .post(dbHandler.addPlace, dbHandler.addGoingPlace)
    /*.post(function(req, res) {
        console.log("entraste...");
        console.log(req.body);
        console.log(req);
        
    })*/
    .delete(dbHandler.removePlace, dbHandler.removeGoingPlace);

    app.route('/api/load/:usid')
    .get(dbHandler.loadPlaces);


    app.route('/api/load2')
    .get(dbHandler.loadPlaces2);

    app.route('/api/loaduser/:usid')
    .get(dbHandler.loadUser)

    app.route('/api/loaduser2/:usid/:place')
    .post(dbHandler.changePlace);


};

//function to check if the user it's logged, if not, redirect to the home page
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
   res.redirect('/');
}
