var express = require('express');
var router = express.Router();
var request = require('request'); // "Request" library
var querystring = require('querystring');

//local
/*var client_id = '95d690a7b1ce48da9ba8fe7042a953d3'; // Your client id
var client_secret = '9bcb3d57b4294fa987b40fc9461deb9a'; // Your secret
var redirect_uri = 'http://localhost:5000/callback'; // Your redirect uri*/

//live
var client_id = 'a4b15d285e5348be8d635b1235d3dde1'; // Your client id
var client_secret = 'b4eb8a6eb0094c1aa9517dd61b132ca1'; // Your secret
var redirect_uri = 'https://tessellator.herokuapp.com/callback'; // Your redirect uri

// Spotify scope
var stateKey = 'spotify_auth_state';
var scope = 'user-read-private user-read-email user-read-birthdate user-top-read user-read-recently-played ' +
    'user-modify-playback-state user-read-playback-state user-read-currently-playing streaming';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' } );
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' } );
});

router.get('/dashboard', function(req, res, next) {
    if(req.cookies.spotifyTokens) {
        res.render('dashboard', {
            title: 'Dashboard',
            access_token: req.cookies.spotifyTokens.access_token,
            refresh_token: req.cookies.spotifyTokens.refreshToken,
            product: req.cookies.userData.product,
            display_name: req.cookies.userData.display_name,
            external_urls: req.cookies.userData.external_urls
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/visualizer', function (req, res, next) {
   res.redirect('/dashboard'); //brings you to the dashboard
    //needs to be changed to check if user is logged in, hold the state?
});

router.get('/login', function (req, res, next) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

router.get('/refreshToken', function (req, res, next) {
    var refreshOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type: 'refresh_token',
            refresh_token: req.cookies.spotifyTokens.refreshToken,
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(refreshOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.cookie('spotifyTokens', {access_token: body.access_token});
            res.redirect('/dashboard');
        } else {
            res.redirect('/login');
        }
    });
});

router.get('/callback', function(req, res, next) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        res.cookie('spotifyTokens', {
            access_token: access_token,
            refreshToken: refresh_token
            },
            {
                maxAge: 1800000 // expires in 30 minutes
            }
        );

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
            if(!error) {
                res.cookie('userData', body, {maxAge: 86400000}); // expires in one day
                res.redirect('/dashboard');
            } else {
                res.redirect('/login');
            }
        });
      } else {
        res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
      }
    });
  }
});

module.exports = router;
