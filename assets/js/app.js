// Code for brewery ranking website

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBtqVuU6Qtl_OtteNN2VYcS32PkzvT3VRo",
    authDomain: "myawesomeproject-131ac.firebaseapp.com",
    databaseURL: "https://myawesomeproject-131ac.firebaseio.com",
    projectId: "myawesomeproject-131ac",
    storageBucket: "myawesomeproject-131ac.appspot.com",
    messagingSenderId: "369533829285"
};

firebase.initializeApp(config);

var database = firebase.database()


database.ref().on("value", function(snapshot){
	 $("#buttons-div").empty();

    var breweries = []
    var data = snapshot.val()
    for(i in data){
        breweries.push(data[i])
    }

    var sorted = breweries.sort(function(a, b){
        return a.votes - b.votes

    })
console.log(sorted);
    for(i in sorted){
        build_brewery_button(sorted[i])
    }
})


// For updating database
function scan_cities(){
    var cities = ['Tempe', 'Scottsdale', 'Phoenix', 'Mesa']
    for(i in cities){
        findBreweriesInCity(cities[i])
    }
}

function findBreweriesInCity(city){
    var apiKey = "70ec47e3e10b786dfce3d08410c16454";
    var URL = "https://api.brewerydb.com/v2/locations/";
    
    par = {
        key: apiKey,
        format: 'json',
        locality: city,
    };

    $.ajax({
        url: URL,
        method: "GET",
        data: $.param(par)
    }).done(function(response) {
        for(i in response.data){
            var brewery = response.data[i]
            console.log(brewery)
            console.log(brewery.id)
            var db_obj = database.ref().child(brewery.id)
            db_obj.update(brewery)
        }
    });
}

function upvote_brewery(breweryId){
    // Prevent a user from voting multiple times
    var voted = sessionStorage.getItem('voted');
    if(!voted){
        sessionStorage.setItem('voted', true)
        var databaseRef = database.ref(breweryId).child('votes')
        databaseRef.transaction(function(votes) {
            if (votes) {
                votes = votes + 1;
            } else {
                votes = 1
            }
            return votes;
        });
    } else {
        console.log('already voted')
    }
}

function build_brewery_button(breweryResults){
    console.log(breweryResults.brewery.name)
    //store object data (name,logo,location,price, website, phone, beeers, tweets?)
    // anchor for dropdown portion
    var anchor = $("<a>").attr({"data-toggle": "collapse",
         "href": "#" + breweryResults.id,
         "aria-expanded": "true",
         "aria-controls": "collapseOne"});

    //main div for brewery button
    var mainDiv = $("<div>").addClass("row row-button align-items-center mx-auto my-2");

    //div for ranking position
    // var rankDiv = $("<div>").addClass("col-md-1 ").append($("<h2>" + i + "</h2>"));

    //div for brewery name
    var nameDiv = $("<div>").addClass("col-md-3 text-center pt-2").append($("<h4>" + breweryResults.brewery.name + "</h4>"));

    //div for logo
    var logoDiv = $("<div>").addClass("col-md-4 ").append($("<img src=" + breweryResults.brewery.images.medium + " class='img-thumbnail custom'>"));

    //container div for holding city and price
    var containerDiv = $("<div>").addClass("col-md-3");
    var cityDiv = $("<div>").addClass("col-md-3 align-self-center ").append($("<h6>" + breweryResults.locality + "</h6>"));
    var dateDiv = $("<div>").addClass("col-md-3 align-self-center ").append($("<h6>" + breweryResults.brewery.established + "</h6>"));
    var buttonButton = $("<button>").attr({id:"upVote",
    		 type:"button",
    		 "data-type": breweryResults.id,
    		  class:"btn btn-outline-secondary"
    }).append($("<i>").attr({class:"fa fa-thumbs-o-up fa-2x", 
    	"aria-hidden":"true"
    }));
    var buttonDiv= $("<div>").addClass("col-md-2 align-self-center").append(buttonButton);

    //Appends the city and price to the container div
  	containerDiv.append(cityDiv);
    containerDiv.append(dateDiv);

    //appending everything in the brewery button together
    mainDiv.append(nameDiv);
    mainDiv.append(logoDiv);
    mainDiv.append(containerDiv);
    mainDiv.append(buttonDiv);

    //append everything to anchor
    anchor.append(mainDiv);

    $("#buttons-div").append(anchor);

    //Dropdown portion for when the brewery button is clicked
    var dropdownDiv = $("<div>").attr({"id": breweryResults.id,
         class: "collapse hide",
         role: "tabpanel",
         "aria-labelledby": "headingOne",
         "data-parent": "#accordion"});

    //Div that will hold left and right side information
    var infoDiv = $("<div>").addClass("row widthContainer mx-auto");

    //left side div
    var leftSideDiv = $("<div>").addClass("col pt-3");
    var headingDescription = $("<h4> Description: </h4>");
    var pDescription = $("<p>" + breweryResults.brewery.description + "</p>");
    leftSideDiv.append(headingDescription);
    leftSideDiv.append(pDescription);

    //  append left side div to infodiv
    infoDiv.append(leftSideDiv);

    // right side div
    var rightSideDiv = $("<div>").addClass("col pt-3");

    //anchor element to hold website
    var dropdownAnchor = $("<a>").attr('href', breweryResults.brewery.website);
    dropdownAnchor.attr("target", "_blank");
    dropdownAnchor.append($("<h4>Website: " + breweryResults.brewery.website + "</h4>"));
    rightSideDiv.append(dropdownAnchor);
    infoDiv.append(rightSideDiv);

    //appending everything in the dropdown together
    dropdownDiv.append(infoDiv);
    $("#buttons-div").append(dropdownDiv);
    

}

