/* Setting variable for array topics list "timePeriod" 
These are linked into the "Giphy API" through queryURL
Also dynamically generated with jQuery to display as <buttons> within the html*/
var timePeriod = [
    "Prehistoric", 
    "1800's", 
    "1900's", 
    "1920's", 
    "1930's",
    "1940's", 
    "1950's", 
    "1960's", 
    "1970's", 
    "1980's", 
    "1990's", 
    "2000's", 
    "Year 2020", 
    "Futuristic"
];
/*Function for "Travel Back" Button (Refresh Page Function)
Found out about (location.reload) from "stackoverflow.com"*/
$("#present").on("click", function (){
    location.reload();
    })
//Declaring a function of Giphy API & plugging in the array list
function showTime() {
    //Initialing an (alert) to execute upon the click of a button
    alert("Initiating Time Travel...");
    //Obtaining the "data-name" from Giphy API from each item in the array "timePeriod"
    var timePeriod  = $(this).attr("data-name");
    //Defining the unique Giphy API key 
    var APIKey = "y3cWa5clsBbUjjqN6xVL9g8F3fwIiaVm";
    /*Identifying a giphy "search" link within Giphy API using APIKey and attaching the array list
    Also setting a search return limit of 10 */
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    timePeriod + "&api_key=y3cWa5clsBbUjjqN6xVL9g8F3fwIiaVm&limit=10";
    //Creating an AJAX call
    $.ajax({
        //Grabbing the link for the Giphy API 
        url: queryURL,
        //Method "Get" and retrieve data from the API
        method: "GET"
    //Calling (.then) promise - the script "promises" to execute data as soon as it's able to obtain it
    }).then(function(response) {
        console.log(queryURL);//Logging the queryURL in console
		console.log(response);//Logging the (response) of the function into console
		//Defining a variable that contains the (response) of the function
        var results = response.data;
        //Setting a for loop that runs through the results variable length (10)
        for (var i = 0; i < results.length; i++) {
        //Creating a variable to dynamically generate <div>
        var timeTag =  $("<div>");
        //Creating a variable to generate <p>, grabbing the keyword "rating" within "results" and writing it into HTML
        var pTag = $("<p>").text("Rated: " + results[i].rating);
    /*Creating and storing an image
    Refrencing code from (06-ajax/01-Activities/Day-03/15-PausingGifs/Solved/pausing-gifs-solution.html)
    https://stackoverflow.com/questions/47803082/how-to-toggle-between-a-still-image-and-a-gif-from-giphy-api-on-click
    Setting variables/size for the images linked with "results"*/
    var pause = results[i].images.fixed_height_still.url ;
    var moving = results[i].images.fixed_height.url;
    var pauseD= pause;
    //Creating a variable to make <img> 
    var timeGifs = $("<img>");
    //Adding a class "gif" <image>
    timeGifs.addClass("gif");
    timeGifs.attr("src", moving);
    //Attributing data-states found within "results"
	timeGifs.attr("data-animate", moving);
    timeGifs.attr("data-still", pause);
    timeGifs.attr("data-state", pauseD);
    //Attaching & appending the <p> and <img>
    timeTag.append(pTag);
    timeTag.append(timeGifs);
    //Placing timeTag within the div id: "#timeDisplay" in the HTML
         $("#timeDisplay").prepend(timeTag);
           }
     });
    }
    //Reference: (06-ajax/01-Activities/Day-03/15-PausingGifs/Solved/pausing-gifs-solution.html)
    //Setting on click function for each .gif
	$(document).on("click", ".gif", function() {
      //Setting variable for attribute to set value to "data-state"
      var state = $(this).attr("data-state");
      //Declaing If & Else Statements
      //If "state" (clicked image) is equal to "still"
      if ("state" === "still") {
        //Changes the "src" to "data-animate" value within the API
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        //Else - Change the "src" to the "data-still" value within the API
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    /*Function for displaying the time periods
    Reference:(06-AJAX/Day-02/10-working-movie-app-solved.html)*/
    function renderButtons() {
        //This function prevents buttons from multiplying every time "launch" is clicked
        $("#timeButtons").empty();
        //Creating a for floop going through the length of the array variable
        for (var i = 0; i < timePeriod.length; i++) {
		//Creating buttons dynamically through javascript for each value within the array "timePeriod"
		var button = $("<button>");
          //Adding a class named "timeAdd" to button 
          button.addClass("timeAdd");
          //Attributing button with value of data-name and timePeriod index
          button.attr("data-name", timePeriod[i]);
          //Generating text inside a button from the array index
          button.text(timePeriod[i]);
         //Appending these buttons into the div id "timeButtons" in the HTML
          $("#timeButtons").append(button);
        }
    } 
    /*Creating an on click function for the "#launch" id
    Refrence:firebase/01-Activities/Day-01/02-signin-nopersistence/2-student-do-signin-no-persistence-solution.html*/
    $("#launch").on("click", function(event) {
        //This is neccessary so the form doesn't submit without the user's click
        event.preventDefault();
        //Setting variable to let user input inside "inputYear" id form box
        var timeAdd = $("#inputYear").val().trim();
        //Pushes the input from the user's form box "inputYear" 
        timePeriod.push(timeAdd);
        //Execute renderButtons function which creates button from the array
        renderButtons();
      });
     //Creating on click function, when class id: "timeAdd" and function: showTime are clicked
     $(document).on("click", ".timeAdd", showTime);
      //Execute renderButtons function
      renderButtons(); 