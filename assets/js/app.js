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

database.ref().once("value").then(function(snapshot){
    var data = snapshot.val()
    console.log(data)
    for(i in data){
        build_brewery_button(data[i])
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
    var voted = localStorage.getItem('voted');
    if(!voted){
        localStorage.setItem('voted', true)
        var databaseRef = database.ref(breweryId).child('votes')
        console.log(databaseRef)
        databaseRef.transaction(function(votes) {
            if (votes) {
                votes = votes + 1;
            } else {
                votes = 1
            }

            return votes;
        });
    }
}

function build_brewery_button(breweryResults){
    console.log(breweryResults.brewery.name)
    //store object data (name,logo,location,price, website, phone, beeers, tweets?)
    // anchor for dropdown portion
    var anchor = $("<a>").attr({"data-toggle": "collapse",
         "href": "#collapseOne",
         "aria-expanded": "true",
         "aria-controls": "collapseOne"});

    //main div for brewery button
    var mainDiv = $("<div>").addClass("row row-button align-items-center mx-auto my-2");

    //div for ranking position
    // var rankDiv = $("<div>").addClass("col-md-1 ").append($("<h2>" + i + "</h2>"));

    //div for brewery name
    var nameDiv = $("<div>").addClass("col-md-4 ").append($("<h1>" + breweryResults.name + "</h1>"));

    //div for logo
    var logoDiv = $("<div>").addClass("col-md-4 ").append($("<img src=" + breweryResults.images.icon + " class='img-thumbnail custom'>"));

    //container div for holding city and price
    var containerDiv = $("<div>").addClass("col-md-3");
    var cityDiv = $("<div>").addClass("col-md-3 align-self-center ").append($("<h6>" + breweryResults.city + "</h6>"));
    var dateDiv = $("<div>").addClass("col-md-3 align-self-center ").append($("<h6>" + breweryResults.createDate + "</h6>"));

    //Appends the city and price to the container div
    containerDiv.append(cityDiv);
    containerDiv.append(dateDiv);

    //appending everything in the brewery button together
    anchor.append(mainDiv);

    // anchor.append(rankDiv);
    anchor.append(nameDiv);
    anchor.append(logoDiv);
    anchor.append(containerDiv);

    //Dropdown portion for when the brewery button is clicked
    var dropdownDiv = $("<div>").attr({id: "collapseOne",
         class: "collapse hide",
         role: "tabpanel",
         "aria-labelledby": "headingOne",
         "data-parent": "#accordion"});

    //Div that will hold left and right side information
    var infoDiv = $("<div>").addClass("row widthContainer mx-auto");

    //left side div
    var leftSideDiv = $("<div>").addClass("col");
    var headingDescription = $("<h4> Description: </h4>");
    var pDescription = $("<p>");
    leftSideDiv.append(headingDescription);
    leftSideDiv.append(pDescription);

    //  append left side div to infodiv
    infoDiv.append(leftSideDiv);

    // right side div
    var rightSideDiv = $("<div>").addClass("col");

    //anchor element to hold website
    var dropdownAnchor = $("<a>").attr('href', breweryResults.website);
    dropdownAnchor.attr("target", "_blank");
    dropdownAnchor.append($("<h4>'Website: " + breweryResults.website + "</h4>"));
    rightSideDiv.append(dropdownAnchor);
    infoDiv.append(rightSideDiv);

    //appending everything in the dropdown together
    dropdownDiv.append(infoDiv);

}

