# liri-node-app

Created by: Reginald D. Thorpe Sr.
Date: July 12, 2019

Reason: GWU Boot camp  Homework assignment
                              
Purpose: To create a node.js  application that demonstrates the following:

1.)	Using NPM to install modules need to successfully run the program.

2.)	Using and understanding of the following:

a.)	 Require

b.)	FS

c.)	Reading of external text files

d.)	Writing to external text files (Logging)

e.)	 function, the “FS”   

3.)	The program when working correctly should be able to

a.	When typed on the command line: node liri.js concert-this <artist/band name here>

      i.	Execute the commands in the program and return a list of concert date for the band entered. T
          The program with create a search using: Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" 
           + artist + "/events?app_id=codingbootcamp") for the artist and render the following information about each event to
           the terminal:
           
                      	Name of the venue
                      
                      	Venue location
	Date of the Event (use moment to format this as "MM/DD/YYYY")
4.)	When typed on the command line: node liri.js spotify-this-song '<song name here>' 
This will show the following information about the song in your terminal/bash window
	Artist(s)
	The song's name
	A preview link of the song from Spotify 
•	If no song is provided then your program will default to "The Sign" by Ace of Base.  

5.)	 When typed on the command line: node liri.js movie-this '<movie name here>'   This will output the following information to your terminal/bash window:
	Title of the movie.
	 Year the movie came out.
	 IMDB Rating of the movie.
	Rotten Tomatoes Rating of the movie.
	Country where the movie was produced.
	Language of the movie.
	Plot of the movie.
	Actors in the movie.
	
6.)	If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/It's on Netflix!
7.)	When typed on the command line: node liri.js node liri.js do-what-it-says, then using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands:
a.	spotify-this-song for "I Want it That Way," as follows the text in random.txt.
b.	movie-this
c.	concert-this.


Bonus work:   For extra credit, we were to log the data to a data to a .txt file called log.txt.
Technology used: Node.js, Javascript, APIs, NPM.
