 var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      'your Twitter application consumer key',
      'your Twitter application secret',
      '1.0A',
      null,
      'HMAC-SHA1'
    );
    oauth.get(
      'https://api.twitter.com/1.1/trends/place.json?id=23424977',
      'your user token for this app', 
      //you can get it at dev.twitter.com for your own apps
      'your user secret for this app', 
      //you can get it at dev.twitter.com for your own apps
      function (e, data, res){
        if (e) console.error(e);        
        console.log(require('util').inspect(data));
        done();      
      });    
});

/*
 oauth_consumer_key 	Your OAuth consumer key (from Manage API Access).
oauth_token 	The access token obtained (from Manage API Access).
oauth_signature_method 	hmac-sha1
oauth_signature 	The generated request signature, signed with the oauth_token_secret obtained (from Manage API Access).
oauth_timestamp 	Timestamp for the request in seconds since the Unix epoch.
oauth_nonce 	A unique string randomly generated per request.


var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'consumer-key',
  consumer_secret: 'consumer-secret',
  token: 'token',
  token_secret: 'token-secret',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});

 */
