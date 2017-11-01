var inquirer = require("inquirer");

var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('file-system');

var client = new Twitter(keys.twitter)

var spot = new Spotify(keys.spotify)

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
	if (!name) {
		spot
		  .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
		  .then(function(data) {
		    console.log('Artist(s):', data.album.artists[0].name);
			console.log('Song:', 'The Sign');
			console.log('Preview:', 'https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=efee065879d74d72925470820cd414e3');
			console.log('Album:', 'The Sign (US Album) [Remastered]');
		  })
		  .catch(function(err) {
		    console.error('Error occurred: ' + err); 
		  });
	} else {
		spot.search({ type: 'track', query: name }, function(err, data) {
			console.log('Artist(s):', data.tracks.items[0].album.artists[0].name);
			console.log('Song:', data.tracks.items[0].name); 
			console.log('Preview:', data.tracks.items[0].preview_url); 
			console.log('Album:', data.tracks.items[0].album.name);
		});
	}	 
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
	fs.readFile('random.txt', 'utf8', (err, data) => {
	  if (err) throw err;
	  var split = data.split(',')
	  command = split[0]
	  if (command === 'spotify-this-song') {
	  	name = split[1]
	  	spotify.search({ type: 'track', query: name }, function(err, data) {
			console.log('Artist(s):', data.tracks.items[0].album.artists[0].name);
			console.log('Song:', data.tracks.items[0].name); 
			console.log('Preview:', data.tracks.items[0].preview_url); 
			console.log('Album:', data.tracks.items[0].album.name);
		});
	  }
	});
}