require("dotenv").config();

var keys = require("./keys.js");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

//var spotify = new Spotify(keys.spotify);

// The switch-case statement are used to go to the function that matches the input.
// Load the fs package to read and write
var fs = require("fs");

// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var action = process.argv[2];
var value  = process.argv[3];

// Create an empty variable for holding the movie name
var nodeArgs  = value;
var movieName = "";
var bandName  = "";

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.

switch (action) 
{
    case "concert-this":
            concertthis();
            break;
          
          case "spotify-this-song":
            spotifythissong();
            break;
          
          case "movie-this":
            moviethis();
            break;
          
          case "do-what-it-says":
            dowhatitsays();
            break; 
}

// If the "action" entered is "concert-this" function is called...
function concertthis()
    {
         /* Loop through all the words in the var "value"  
            For loop strings Band names that are mutliple words for API query.
            for example: if value = "Kool and the Gang"
            the var BandName would = "Kool+and+the+gang" 
         */
         for (var i = 2; i < nodeArgs.length; i++) 
              {
                   if (i > 2 && i < nodeArgs.length)
                        {
                            Name = bandName + "+" + nodeArgs[i];
                        } 
                   else 
                        {
                             bandName += nodeArgs[i];
                        }
              }
         // Then run a request with axios to the OMDB API with the movie specified
         var queryUrl = "https://rest.bandsintown.com/artists/"+bandName + "/events?app_id=codingbootcamp" 

         // This line is just to help us debug against the actual URL.
         console.log(queryUrl);

         axios.get(queryUrl).then(
         function(response) 
              {
                   //console.log(response);
                   console.log(response);
                   //console.log("Release Year: " + response.data.Year);
              })
         .catch(function(error) 
              {
                   if (error.response) 
                        {
                             // The request was made and the server responded with a status code
                             // that falls out of the range of 2xx
                             console.log("concert this rtn " +value);
                             console.log("---------------Data---------------");
                             console.log(error.response.data);
                             console.log("---------------Status---------------");
                             console.log(error.response.status);
                             console.log("---------------Status---------------");
                             console.log(error.response.headers);
                        }
                   else 
                        if (error.request) 
                             {
                                  // The request was made but no response was received
                                  // `error.request` is an object that comes back with details pertaining to the error that occurred.
                                  console.log(error.request);
                             } 
                        else 
                             {
                                  // Something happened in setting up the request that triggered an Error
                                  console.log("Error", error.message);
                             }
                   console.log(error.config);
              });
    }


// If the "action" entered is "spotify-this-song" function is called...
function spotifythissong() 
    {
      console.log("spotifythissong rtn " +value);
    }

// If the "action" entered is "movie-this" function is called...
function moviethis() 
    {
         /* Loop through all the words in the var "value"  
            For loop strings movie names that are mutliple words for API query.
            for example: if value = "All the Presidents Men"
            the var movieName would = "All+the+President's+Men" 
         */
         for (var i = 2; i < nodeArgs.length; i++) 
              {
                   if (i > 2 && i < nodeArgs.length)
                        {
                             movieName = movieName + "+" + nodeArgs[i];
                        } 
                   else 
                        {
                             movieName += nodeArgs[i];
                        }
               }

         // Then run a request with axios to the OMDB API with the movie specified
         var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

         // This line is just to help us debug against the actual URL.
         console.log(queryUrl);

         axios.get(queryUrl).then(
         function(response) 
              {
                   //console.log(response);
                   console.log("Release Year: " + response.data.Year);
              })
         .catch(function(error) 
              {
                   if (error.response) 
                        {
                             // The request was made and the server responded with a status code
                             // that falls out of the range of 2xx
                             console.log("Moviethis rtn " +value);
                             console.log("---------------Data---------------");
                             console.log(error.response.data);
                             console.log("---------------Status---------------");
                             console.log(error.response.status);
                             console.log("---------------Status---------------");
                             console.log(error.response.headers);
                        }
                   else 
                        if (error.request) 
                             {
                                  // The request was made but no response was received
                                  // `error.request` is an object that comes back with details pertaining to the error that occurred.
                                  console.log(error.request);
                             } 
                        else 
                             {
                                  // Something happened in setting up the request that triggered an Error
                                  console.log("Error", error.message);
                             }
                   console.log(error.config);
              });
    }

      
    

// If the "action" entered is "do-what-it-says" function is called...
function dowhatitsays()
    {
      console.log("dowhatitsays rtn " +value);
    }




