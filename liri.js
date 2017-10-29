var inquirer = require("inquirer");

var Twitter = require('twitter');

var keys = require('./keys.js');

var client = new Twitter({
  consumer_key: 'EEDml0ELLQr8375Xw7xlToFsT',
  consumer_secret: 'W3ktFUN6LPWYClIVIItHYq0d2rAeenVd5CMSXX1AqJE5j9zu4u',
  access_token_key: '2790092151-zDI2OIepj0jeLSEpzUfqjRo5IAsHFBRT6oeZNNq',
  access_token_secret: 'KUClCI34y0xbC0KLnmTh3rVCtXefbYnGqZuBgtfhBNPGe',
}); 

inquirer.prompt([
	{
      type: "list",
      message: "Choose a method",
      choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
      name: "method"
    },
]).then(function(response) {
	if (response.method === 'my-tweets') {
		var params = {screen_name: 'yungtechgod'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    console.log(tweets);
		  }
		});
	} else if (response.method === 'spotify-this-song') {
		console.log('here is the song')
	} else if (response.method === 'movie-this') {
		console.log('here is the movie')
	} else if (response.method === 'do-what-it-says') {
		console.log('im doing what you said')
	}
})