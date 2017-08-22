var keys = require("./keys.js");

var twitter = require('twitter');

var Spotify = require("node-spotify-api");

var request = require("request");

var keys = require('./keys.js');

var client = keys;

var fs = require('fs');

var action = process.argv[2];

switch (action) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifyThisSong();
	break;

	case "movie-this":
	movieThis();
	break;

	case "do-what-it-says":
	doWhatItSays();
	break;
}

function myTweets() {
	client.get('statuses/user_timeline', function(error, tweets, created_at) {
		if(error) throw error;
		console.log(tweets + created_at);
	});
}

function spotifyThisSong() {
	var spotify = new Spotify({
		id: '3791015d6b4c4f59af0dfe8823f5f5de',
		secret: '2a113315f3de40078448fde2b991437e'
	});

	spotify.search({type: 'track', query: process.argv[3]}, function(err, data) {
		if (err) { 
			return console.log('Error occurred: ' + err);
		}

	console.log(data);
	});
}

var movieTitle = process.argv[3];
var queryUrl = 'http://www.omdbapi.com/?t=' + movieTitle + '&plot=short&apikey=40e9cece';

function movieThis() {
	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			
			console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMBD Rating: " + JSON.parse(body).imbdRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nCast: " + JSON.parse(body).Actors); 
		}

		if (movieTitle === "") {
			movieTitle = "Mr.+Nobody";
			console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMBD Rating: " + JSON.parse(body).imbdRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nCast: " + JSON.parse(body).Actors);
		}
	});
}

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log(err);
		}

		data = data.split(",");

		action = data[0];
		process.argv[3] = data[1];


	});
}

