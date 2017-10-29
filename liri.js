var inquirer = require("inquirer");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var keys = require('./keys.js');

var spotify = new Spotify({
  id: 'efee065879d74d72925470820cd414e3',
  secret: '8ee79d2c2fc1410ab416b16b3a95f8b4',
});

var client = new Twitter({
  consumer_key: 'EEDml0ELLQr8375Xw7xlToFsT',
  consumer_secret: 'W3ktFUN6LPWYClIVIItHYq0d2rAeenVd5CMSXX1AqJE5j9zu4u',
  access_token_key: '2790092151-zDI2OIepj0jeLSEpzUfqjRo5IAsHFBRT6oeZNNq',
  access_token_secret: 'KUClCI34y0xbC0KLnmTh3rVCtXefbYnGqZuBgtfhBNPGe',
}); 

var arg = process.argv;

var command = arg[2];

var name = arg[3];

if (command === 'my-tweets') {
	var params = {
		screen_name: 'yungtechgod'
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }
	});
} else if (command === 'spotify-this-song') {
	spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
		.then(function(data) {
	    	console.log(data.album.artists[0].name);
	    	console.log(data.name);
	    	console.log(data.preview_url);
	    	console.log(data.album.name); 
	  	}).catch(function(err) {
	    	console.error('Error occurred: ' + err); 
		});
} else if (command === 'movie-this') {
	console.log('here is the movie')
} else if (command === 'do-what-it-says') {
	console.log('im doing what you said')
}