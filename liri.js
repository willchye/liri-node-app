// Basic Node application for requesting data from the OMDB website

var action = process.argv[2];
var value = process.argv[3];
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');

switch(action){
    case 'mymovie':
        mymovie();
    break;

    case 'mytwitter':
        mytwitter();
    break;

    case 'myspotify':
        myspotify();
    break;


}

//ombd =======================================================================

function mymovie(){


// var movie='"'+ process.argv[2] +'"';
// var replaced = movie.split(' ').join('+');

// console.log(replaced);

request('http://www.omdbapi.com/?t='+value+'&y=&plot=short&r=json', function (error, response, body) {

	if (!error && response.statusCode == 200) {

		console.log("The movie's year is: " + JSON.parse(body)["Year"])
		console.log("The movie's runtime is: " + JSON.parse(body)["Runtime"])
		console.log("The movie's genre is: " + JSON.parse(body)["Genre"])
		console.log("The movie's language is: " + JSON.parse(body)["Language"])
		console.log("The movie's rating is: " + JSON.parse(body)["imdbRating"])
	}
})
};





//twitter =======================================================================

function mytwitter(){


var client = new Twitter({
  consumer_key: 'bU4Qu0iIHhiZhhY3HrLogmjQQ',
  consumer_secret: 'YtLZOVRbTC2DhXk81jlY5vUxI6gmP2oWqQ66DJY94rdIHQbRye',
  access_token_key: '267006553-jZWjmd4XjO0i51EA5plHNJPoO4nW03JWhCiUx2Cl',
  access_token_secret: '4hqeBsM4KeRTLpnAiNwcYKQYkKAs3QIBDBHRETXu8GLoh'
})



// to post to twitter
// var post = '"'+ process.argv[2] +'"';
//
// client.post('statuses/update', {status: post},  function(error, tweet, response) {
//   // if(error) throw error;
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });



client.get('statuses/user_timeline', function(error, tweets, response) {
  // if(error) throw error;
  // console.log(tweets);  // The favorites.
  console.log(tweets);  // Raw response object.
})

};







//spotify =======================================================================

function myspotify(){


// var song = '"'+ process.argv[2] +'"';
spotify.search({ type: 'track', query: value }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

  console.log("song name: " + data.tracks.items[0].name);
  console.log("album name: " + data.tracks.items[0].album.name);
    console.log("artist name: " + data.tracks.items[0].artists[0].name);
      console.log("preview link: " +data.tracks.items[0].external_urls.spotify);

})
};
