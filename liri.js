var inquirer = require("inquirer");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

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

arg = arg.slice(3);

name = arg.join('+');

if (command === 'my-tweets') {
	var params = {
		screen_name: 'yungtechgod'
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log('Tweet Text:', tweets[i].text);
	  		console.log('Tweet Created:', tweets[i].created_at)
	  		console.log('--------------------------------------------------------------------')
	  	}    
	  }
	});
} else if (command === 'spotify-this-song') {
	spotify.search({ type: 'track', query: name }, function(err, data) {
		if (err) {
	    	return console.log('Error occurred: ' + err);
		} 
		console.log('Artist(s):', data.tracks.items[0].album.artists[0].name);
		console.log('Song:', data.tracks.items[0].name); 
		console.log('Preview:', data.tracks.items[0].preview_url); 
		console.log('Album:', data.tracks.items[0].album.name); 
	});
} else if (command === 'movie-this') {
	if (!name) {
		request('http://www.omdbapi.com/?apikey=40e9cece&t=mr+nobody', function (error, response, body) {
			console.log('Title:', JSON.parse(body).Title);
			console.log('Year:', JSON.parse(body).Year);
			console.log('IMDB Rating:', JSON.parse(body).imdbRating);
			console.log('Rotten Tomatoes Rating:', JSON.parse(body).Ratings[1].Value);
			console.log('Country:', JSON.parse(body).Country);
			console.log('Language:', JSON.parse(body).Language);
			console.log('Plot:', JSON.parse(body).Plot);
			console.log('Actors:', JSON.parse(body).Actors);
		});
	} else {
		request('http://www.omdbapi.com/?apikey=40e9cece&t=' + name, function (error, response, body) {
			console.log('Title:', JSON.parse(body).Title);
			console.log('Year:', JSON.parse(body).Year);
			console.log('IMDB Rating:', JSON.parse(body).imdbRating);
			console.log('Rotten Tomatoes Rating:', JSON.parse(body).Ratings[1].Value);
			console.log('Country:', JSON.parse(body).Country);
			console.log('Language:', JSON.parse(body).Language);
			console.log('Plot:', JSON.parse(body).Plot);
			console.log('Actors:', JSON.parse(body).Actors);
		});
	}
} else if (command === 'do-what-it-says') {
	console.log('im doing what you said')
}