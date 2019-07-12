require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require ('moment');

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// The switch-case statement are used to go to the function that matches the input.
// Load the fs package to read and write
var fs = require("fs");

// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.

// Store all of the Command line arguments into an array
var nodeArgs = process.argv; 
var action = process.argv[2];

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
         //var nodeArgs = process.argv;
         var bandName = "";
         nodeArgs = process.argv;
         /* Loop through all the words in the var nodeArg starting at index 3  
            where  the band's Name will begin. This For loop strings Band names
            together with the "plus" sign to seach for band names that are more
            that one name bands for the API query, 
            Example: if value = "Kool and the Gang" then BandName = "Kool+and+the+gang" 
         */
        console.log("begin for loop to extract band name: " +nodeArgs);
        console.log("the nodeArgs length is " + nodeArgs.length);
         
           for (var i = 3; i < nodeArgs.length; i++) 
              {
                   if (i > 3 && i < nodeArgs.length)
                        {
                           console.log("the value of I: " +i);
                            bandName = bandName + "+" + nodeArgs[i];
                            console.log("nodeArgs[i] = " + nodeArgs[i]);
                            console.log("BandName now: " + bandName);
                            
                        } 
                   else 
                        {
                             bandName += nodeArgs[i];
                        }
              }
         console.log("after the for loop the band name is: " + bandName);
         
         // Then run a request with axios to the OMDB API with the movie specified
         var queryUrl = "https://rest.bandsintown.com/artists/"+bandName + "/events?app_id=codingbootcamp" 

         // This line is just to help us debug against the actual URL.
         console.log("++++++++++++ HERE IS THE QUERYURL FOR  ++++++++++++: " + queryUrl);

         axios.get(queryUrl).then(
         function(response) 
              {
                   for (var i = 0; i < response.data.length; i++)
                        {
                             var date = response.data[i].datetime; //Saves datetime response into a variable
                             var date = moment(date).format("MM/DD/YYYY");

                             console.log("********* CONCERT INFO*********");
                             fs.appendFileSync("log.txt", "**********CONCERT INFO*********\n");
                             console.log("Venue Name: " + response.data[i].venue.name);
                             fs.appendFileSync("log.txt", "Venue Name: " + response.data[i].venue.name+ "\n");
                             console.log("Venue Location: " + response.data[i].venue.city );
                             fs.appendFileSync("log.txt", "Venue Location: " + response.data[i].venue.city  + "\n");
                             console.log("Date of the Event: " + date);
                             fs.appendFileSync("log.txt", "Date of the Event: " +  date + "\n");
                             console.log("*****************************");  
                             fs.appendFileSync("log.txt", "*****************************\n");
                         }
              })
         .catch(function(error) 
              {
                   if (error.response) 
                        {
                             // The request was made and the server responded with a status code
                             // that falls out of the range of 2xx
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
         nodeArgs = process.argv;
         console.log('My Song name is: ' + nodeArgs);
         var songName = "";

         for (var i = 3; i < nodeArgs.length; i++) 
         {
              if (i > 3 && i < nodeArgs.length) 
                   {
                        console.log("spotify i value: " + i);
                        songName = songName + " " + nodeArgs[i];
                        console.log("songName = " + songName);
                   } 
              else 
                   {
                       songName += nodeArgs[i];
                   }
         }
            
         console.log('%%%%%%%%% - here is what is in songName:' +songName);
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
 
             console.log("**********SONG INFO*********");
             fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
             fs.appendFileSync("log.txt", i +"\n");
             console.log("Song name: " + songs[i].name);
             fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
             console.log("Preview song: " + songs[i].preview_url);
             fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
             console.log("Album: " + songs[i].album.name);
             fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
             console.log("Artist(s): " + songs[i].artists[0].name);
             fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
             console.log("*****************************");  
             fs.appendFileSync("log.txt", "*****************************\n");
         }   
     );
 };
// If the "action" entered is "movie-this" function is called...
function moviethis() 
    {
         console.log('Now in the Movie This RTN at the top');
         nodeArgs = process.argv;
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
                             movieName = movieName + " " + nodeArgs[i];
                        } 
                   else 
                        {
                            movieName += nodeArgs[i];
                        }
              }
         
         //console.log("what the blank: " + movieName);

         function isEmptyOrSpaces(movieName)
             {
                  return movieName=== null || movieName.match(/^ *$/) !== null;
             }
         
             if(isEmptyOrSpaces(movieName))
               {
                 console.log("inside the if");
                 movieName ="Mr%20Nobody"
               };

          //console.log("after the blank: " + movieName);
         // Then run a request with axios to the OMDB API with the movie specified
         var queryUrl = "http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy";
         
         // This line is just to help us debug against the actual URL.
         //console.log(queryUrl);

         axios.get(queryUrl).then(
         function(response) 
              {
                   //console.log(queryUrl);
                  // console.log(response.data);
                   console.log("********* MOVIE INFO*********");
                   fs.appendFileSync("log.txt", "********** MOVIE INFO*********\n");
                   console.log("Title: " + response.data.Title);
                   fs.appendFileSync("log.txt", "Title: " + response.data.Title + "\n");
                   console.log("Release Year: " + response.data.Year);
                   fs.appendFileSync("log.txt", "Release Year: " + response.data.Year + "\n");
                   console.log("IMDB Rating: " + response.data.imdbRating);
                   fs.appendFileSync("log.txt", "IMDB Rating: " +  response.data.imdbRating + "\n");
                   console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                   fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n"); 
                   console.log("Country of Production: " + response.data.Country);     
                   fs.appendFileSync("log.txt", "Country of Production: " + response.data.Country+ "\n");
                   console.log("Language: " + response.data.Language);     
                   fs.appendFileSync("log.txt", "Language: " + response.data.Language+ "\n");
                   console.log("Plot: " + response.data.Plot);
                   fs.appendFileSync("log.txt", "Plot: " + response.data.Plot + "\n");
                   console.log("Actors: " + response.data.Actors);
                   fs.appendFileSync("log.txt", "Actors: " + response.data.Actors + "\n");
                   console.log("*****************************");  
                   fs.appendFileSync("log.txt", "*****************************\n");
              })
         .catch(function(error) 
              {
                   if (error.response) 
                        {
                             // The request was made and the server responded with a status code
                             // that falls out of the range of 2xx
                             console.log("Moviethis rtn " +movieName);
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
         fs.readFile("random.txt", "utf8", function (err, data) 
              {
                   if (err) 
                        {
                             return console.log(err);
                        }
                   console.log()
                   fs.appendFile("log.txt", "\n" + data, function (err)
   
                        {
                             if (err) 
                                  {
                                       return console.log(err);      
                                  } 
                             else 
                                  {
                                       console.log("log.txt was updated");
                        }
              });      

     
         
         // var action = process.argv[2];
         process.argv[2] = 'RandomtxtArr[0]';
         
            
         console.log("hey Thorpe, the value of Process.argv: " + process.argv);
          switch (process.argv[2]) 
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
              }

         
     });
 }