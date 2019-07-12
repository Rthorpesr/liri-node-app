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
//console.log("1.) What is in Process.argv: " + process.argv);
//console.log("2.) What is in nodeArgvs: " + nodeArgs); 
//console.log("3.) What is in Process.argv[2]: " + process.argv[2]); 
var action = process.argv[2];
//console.log("5.) What is in Action: " + action); 
var nextUserInput = "";

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
         //console.log("** Concert RTN at the top **");
         var bandName = "";
         //console.log("Concert-this bandName:" + bandName);
         /* Loop through all the words in the var nodeArg starting at index 3  
            where  the band's Name will begin. This For loop strings Band names
            together with the "plus" sign to seach for band names that are more
            that one name bands for the API query, 
            Example: if value = "Kool and the Gang" then BandName = "Kool+and+the+gang" 
         */
       // console.log("begin for loop to extract band name from nodeArgs: " + nodeArgs);
      //  console.log("the nodeArgs length is " + nodeArgs.length);
         
           for (var i = 3; i < nodeArgs.length; i++) 
              {
                   if (i > 3 && i < nodeArgs.length)
                        {
                           //console.log("1. Loop - the value of I: " +i);
                          // console.log("2. Loop - nodeArgs[i]: " + nodeArgs[i]); 
                           bandName = bandName + " " + nodeArgs[i];
                           // console.log("3. Loop - inside for loop, bandName = " + bandName);
                           // console.log("4. Loop - BandName now: " + bandName);
                            
                        } 
                   else 
                        {
                             bandName += nodeArgs[i];
                        }
              }
         //console.log("AFTER LOOP 1 - the band name is: " + bandName);
         //console.log("AFTER LOOP 2 - the queryUrl is: " + queryUrl);
         // Then run a request with axios to the OMDB API with the movie specified
         var queryUrl = "https://rest.bandsintown.com/artists/"+bandName + "/events?app_id=codingbootcamp" 

         // This line is just to help us debug against the actual URL.
         //console.log("AFTER LOOP 3 - the queryUrl is: " + queryUrl);
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
      //console.log("** SPOTIFY RTN at the top **");

         //console.log("SPOTIFY- 1.) The value in nodeArgs: " + nodeArgs);
         var songName = "";
         //console.log("SPOTIFY - 2.) The value in songName : " + songName );
         //console.log("SPOTIFY - 3.) The nodeArgs length is " + nodeArgs.length);
        // console.log("SPOTIFY - 4.) The LOOP: ");

         for (var i = 3; i < nodeArgs.length; i++) 
         {
              if (i > 3 && i < nodeArgs.length) 
                   {
                       // console.log("1. Loop - the value of I: " +i);
                       // console.log("2. Loop - nodeArgs[i]: " + nodeArgs[i]);
                        songName = songName + " " + nodeArgs[i];
                       // console.log("3. Loop - songName now: " + songName);
                   } 
              else 
                   {
                       songName += nodeArgs[i];
                   }
         }
            
         //console.log('SPOTIFY QUERY USING songName: ' + songName);
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
         //console.log("** MOVIE RTN at the top **");
         var movieName = "";
         //console.log("Concert-this movieName:" + movieName);     
         /* Loop through all the words in the var "value"  
            For loop strings movie names that are mutliple words for API query.
            for example: if value = "All the Presidents Men"
            the var movieName would = "All+the+President's+Men" 
         */

        //console.log("begin for loop to extract movie name from nodeArgs: " + nodeArgs);
       // console.log("the nodeArgs length is " + nodeArgs.length);

         for (var i = 3; i < nodeArgs.length; i++) 
              {
                   if (i > 3 && i < nodeArgs.length) 
                        {
                            // console.log("1. Loop - the value of I: " +i);
                            // console.log("2. Loop - nodeArgs[i]: " + nodeArgs[i]); 
                             movieName = movieName + " " + nodeArgs[i];
                            // console.log("3. Loop - inside for loop, movieName = " + movieName);
                            // console.log("4. Loop - movieName now: " + movieName);
                        } 
                   else 
                        {
                            movieName += nodeArgs[i];
                        }
              }

         function isEmptyOrSpaces(movieName)
             {
                  return movieName=== null || movieName.match(/^ *$/) !== null;
             }
         
             if(isEmptyOrSpaces(movieName))
               {
                 console.log("inside the if");
                 movieName ="Mr Nobody"
               };

         //console.log("AFTER LOOP 1 - the movieName  is: " + movieName );
         //console.log("AFTER LOOP 2 - the queryUrl is: " + queryUrl);
         // Then run a request with axios to the OMDB API with the movie specified
         var queryUrl = "http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy";
         
         // This line is just to help us debug against the actual URL.
         //console.log("AFTER LOOP 3 - the queryUrl is: " + queryUrl);

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
         console.log("** DO WHAT IT SAYS RTN at the top **");
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

             // console.log("DO - 1.) the value of Process.argv: " + process.argv);
             // console.log("DO - 2.) what is the value of nodeArgs: " + nodeArgs);
             // console.log("DO - 3.) what is the nodeArgs length? " + nodeArgs.length);
             // console.log("DO - 4.) The value in data before the replace: " + data);
              data = data.replace(/["']/g, "");
              data = data.split(/[ ,]+/).join(',')
            //  console.log("DO - 5.) The contents of dataArr after the replace: " + data);
            //  console.log("DO - 6.) The value of process.argv[2]: " + process.argv[2]);
              dataArr = new Array(); 
   

              dataArr = data.split(",");

            //  console.log("THE dataArr.length is:" + dataArr.length);

            

            //  console.log("DO - 7.) The value in dataArr[0]: " + dataArr[0]);
              process.argv[2] = dataArr[0];
              
              for (i = 1; i < dataArr.length; i++)
                   { 
                        process.argv.push(dataArr[i]);
                   }
      
            //  console.log("DO - 8.) The value of dataArr[1]: " + dataArr[1]);
            //  console.log("DO - 9.) The value of Process.argv: " + process.argv);
      
        // nextUserInput = userInput.replace(/%20/g, " ");

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