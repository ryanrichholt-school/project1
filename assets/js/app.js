<<<<<<< HEAD
$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBEvfvRzimElWF-3XO47hYG4yzqa7Jvd_s",
        authDomain: "aaron-project-c8c21.firebaseapp.com",
        databaseURL: "https://aaron-project-c8c21.firebaseio.com",
        projectId: "aaron-project-c8c21",
        storageBucket: "aaron-project-c8c21.appspot.com",
        messagingSenderId: "272640189163"
=======
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
    var breweries = []
    var data = snapshot.val()
    for(i in data){
        breweries.push(data[i])
    }

    var sorted = breweries.sort(function(a, b){
        return a.votes - b.votes
    })

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
>>>>>>> cd19e4312e137373bce1fe5069339e36910f630a
    };

    firebase.initializeApp(config);

    var database = firebase.database()

    database.ref().on("value", function(snapshot) {

        var breweries = [];
        var data = snapshot.val();

        for(i = 0; i < data.length; i++) {
            breweries.push(data[i]);
        }
<<<<<<< HEAD

        var sorted = breweries.sort(function(a, b){
            return a.votes - b.votes
        })

        for(i = 0; i < sorted.length; i++) {
            buildBreweryButton(sorted[i]);
        }
    })


    // used in conjunction with the function directly below
    function scanCities() {
        // vote only on breweries located in these cities
        var cities = ['Tempe', 'Scottsdale', 'Phoenix', 'Mesa'];

        for(i =0; i < cities.length; i++) {

            findBreweriesInCity(cities[i]);
        }
    }

    scanCities();

    function findBreweriesInCity(city) {

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

            console.log("=====================================");
            console.log(response);
            console.log("=====================================")


            var results = response.data;

            for(i = 0; i < results.length; i++) {

                var brewery = results[i];

                console.log(brewery);
                console.log(brewery.id);
                
                var db_obj = database.ref().child(brewery.id);
                db_obj.update(brewery);
            }
=======
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
>>>>>>> cd19e4312e137373bce1fe5069339e36910f630a
        });
    } else {
        console.log('already voted')
    }

    // function upvoteBrewery(breweryId){
    //     // Prevent a user from voting multiple times
    //     var voted = sessionStorage.getItem('voted');
    //     if(!voted){
    //         sessionStorage.setItem('voted', true)
    //         var databaseRef = database.ref(breweryId).child('votes')
    //         databaseRef.transaction(function(votes) {
    //             if (votes) {
    //                 votes = votes + 1;
    //             } else {
    //                 votes = 1
    //             }
    //             return votes;
    //         });
    //     } else {
    //         console.log('already voted')
    //     }
    // }

    function buildBreweryButton(breweryResults) {
        // anchor for dropdown portion
        var anchor = $("<a>");
        anchor.attr("data-toggle", "dropdown");
        anchor.attr("href", "collapseOne");
        anchor.attr("aria-expanded", "true");
        anchor.attr("aria-controls", "collapseOne");
        //main div for brewery button
        var mainDiv = $("<div>").addClass("row row-button align-items-center mx-auto my-2");
        // store names of breweries in variable
        var name = breweryResults.brewery.name;
        // create brewery div and display the brewery name inside it
        var nameDiv = $("<div>").addClass("col-md-4 ").html("<p>" + name + "</p>");
        // add nameDiv inside mainDiv
        mainDiv.append(nameDiv);
        // store logo into a variable
        var logo = breweryResults.brewery.images.medium;
        // create logoDiv
        var logoDiv = $("<div>").addClass("col-md-4 ");
        // create img div
        var image = $("<img>").addClass("img-thumbnail custom").attr("src", logo);
        // append image variable to logoDiv
        logoDiv.append(image);
        //append logDiv to mainDiv
        mainDiv.append(logoDiv);
        // container div for holding city and price
        var containerDiv = $("<div>").addClass("col-md-4");
        // create div to store established date
        var localityDiv = $("<div class='col-md-6 align-self-center'>");
        // store location (city) into a variable
        var locality = breweryResults.locality;
        // display city in html
        localityDiv.html("<h6> Located in: " + locality + "</h6>");
        // create div for time of establishment 
        var dateDiv = $("<div class='col-md-6 align-self-center'>");
        // store year of establishment in variable
        var date = breweryResults.brewery.established;
        // display date in html
        dateDiv.html("<h6> Established: " + date + "</h6>");
        //Appends the city and date of establishment to the container div
        containerDiv.append(localityDiv);
        containerDiv.append(dateDiv);
        // add containerDiv to mainDiv 
        mainDiv.append(containerDiv);
        //appending everything in the brewery button together
        anchor.append(mainDiv);
        // display button in html
        $("#brewery-buttons").append(anchor);

        // dropdown elements
        var dropdownDiv = $("<div>");
        dropdownDiv.addClass("collapse hide");
        dropdownDiv.attr("id", "collapseOne");
        dropdownDiv.attr("role", "tabpanel");
        dropdownDiv.attr("aria-labelledby", "headingOne");
        dropdownDiv.attr("data-parent", "#accordion");
        //Div that will hold left and right side information
        var infoDiv = $("<div>").addClass("row widthContainer mx-auto");
        //left side div
        var leftSideDiv = $("<div>").addClass("col");
        // store description in variable
        var description = breweryResults.brewery.description;
        // display descripition in html, under the h4 heading
        var headingDescription = $("<h4> Description: </h4>");
        var pDescription = $("<p>" + description + "</p>");
        // add the heading and paragraph to the leftSideDiv
        leftSideDiv.append(headingDescription);
        leftSideDiv.append(pDescription);    
        //  append left side div to infoDiv
        infoDiv.append(leftSideDiv);
        // right side div
        var rightSideDiv = $("<div>").addClass("col");
        // store website address into a variable
        var website = breweryResults.brewery.website;
        //anchor element to hold website
        var dropdownAnchor = $("<a>").attr("href", website);
        dropdownAnchor.attr("target", "_blank");
        dropdownAnchor.html("<h4>'Website: " + website + "</h4>");
        rightSideDiv.append(dropdownAnchor);

        infoDiv.append(rightSideDiv);

        dropdownDiv.append(infoDiv);

        anchor.append(dropdownDiv);

    }

});

