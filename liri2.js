/*  STEP - 1 
           get this envionment file because my .env file needs it.
*/
   require("dotenv").config(); 

/*  STEP - 2 
           Set var to the Location of my Spotify keys  
*/
var Spotify   = require('node-spotify-api')
var keys      = require("./keys.js");
var myspotify = new Spotify(keys.spotify);
var request   = require("request");
var moment    = require("moment");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// The switch-case statement are used to go to the function that matches the input.
// Load the fs package to read and write
var fs = require("fs");

// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.

// Store all of the Command line arguments into an array
varuserCommand = process.argv[2];
var userInput = process.argv.splice(3,process.argv.length).join (" ");
 


 
console.log('type of Entertainment: ' + typeofEntertainment);
 


// Create an empty variable for holding the movie name
 

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
         console.log('Now in the Concert RTN at the top');
         var nodeArgs = process.argv;
         console.log('My bandname is: ' + nodeArgs);
         var bandName = "";
         /* Loop through all the words in the var "value"  
            For loop strings Band names that are mutliple words for API query.
            for example: if value = "Kool and the Gang"
            the var BandName would = "Kool+and+the+gang" 
         */
         for (var i = 3; i < nodeArgs.length; i++) 
              {
                   if (i > 3 && i < nodeArgs.length)
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
                   console.log(response.data);
                   
                   //console.log("Release Year: " + response.data.Year);
              })
         .catch(function(error) 
              {
                   if (error.response) 
                        {
                             // The request was made and the server responded with a status code
                             // that falls out of the range of 2xx
                             console.log("concert this rtn " +bandName);
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
      console.log("at the top of function: spotifythissong rtn ");
      var nodeArgs = process.argv;
         console.log('My Song name is: ' + nodeArgs);
         var songName = "";

         for (var i = 3; i < nodeArgs.length; i++) 
         {
              if (i > 3 && i < nodeArgs.length) 
                   {
                        songName = songName + "+" + nodeArgs[i];
                   } 
              else 
                   {
                       songName += nodeArgs[i];
                   }
         }

               spotify.search(
               {
                    type: "track",
                    query: songName
               },
               function (err, data) {
                    if (err) {
                         console.log("Error occurred: " + err);
                         return;
                    }
             var songs = data.tracks.items;
 
             for (var i = 0; i < songs.length; i++) {
                 console.log("**********SONG INFO*********");
                 //fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                 console.log(i);
                 //fs.appendFileSync("log.txt", i +"\n");
                 console.log("Song name: " + songs[i].name);
                 //fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                 console.log("Preview song: " + songs[i].preview_url);
                // fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                 console.log("Album: " + songs[i].album.name);
                // fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                 console.log("Artist(s): " + songs[i].artists[0].name);
                // fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                 console.log("*****************************");  
                // fs.appendFileSync("log.txt", "*****************************\n");
              }
         }
     );
 };
// If the "action" entered is "movie-this" function is called...
function moviethis() 
    {
         console.log('Now in the Movie This RTN at the top');
         var nodeArgs = process.argv;
         console.log('My movie name is: ' + nodeArgs);
         var movieName = "";
         /* Loop through all the words in the var "value"  
            For loop strings movie names that are mutliple words for API query.
            for example: if value = "All the Presidents Men"
            the var movieName would = "All+the+President's+Men" 
         */
         for (var i = 3; i < nodeArgs.length; i++) 
              {
                   if (i > 3 && i < nodeArgs.length) 
                        {
                             movieName = movieName + "+" + nodeArgs[i];
                        } 
                   else 
                        {
                            movieName += nodeArgs[i];
                        }
              }

         // Then run a request with axios to the OMDB API with the movie specified
         var queryUrl = "http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy";
         
         // This line is just to help us debug against the actual URL.
         //console.log(queryUrl);

         axios.get(queryUrl).then(
         function(response) 
              {
                   //console.log(queryUrl);
                  // console.log(response.data);
                   console.log("");
                   console.log("HI THERE MOVIE WATCHER");
                   console.log("****** HERE IS THE RESULTS OF YOUR MOVIE INQUIRY *****")
                   console.log("Title: " + response.data.Title);
                   console.log("Release Year: " + response.data.Year);
                   console.log("IMDB Rating: " + response.data.imdbRating);
                   console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                   console.log("Country of Production: " + response.data.Country);     
                  // fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
                   console.log("Plot: " + response.data.Plot);
                  // fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
                   console.log("Actors: " + response.data.Actors);
                 // fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
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


