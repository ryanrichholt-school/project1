// Code for brewery ranking website

//wrap everything into a .on load event
function getBreweries(params=null){


function getBreweries(params){
    // Logs info to console
    var apiKey = "70ec47e3e10b786dfce3d08410c16454";
    var URL = "https://api.brewerydb.com/v2/breweries/";

    par = {
        key: apiKey,
        format: 'json',
    };

    $.extend(true, par, params)

    $.ajax({
        url: URL,
        method: "GET",
        data: $.param(par)
    }).done(function(response) {
        console.log(response)
        console.log(response.data)
        //store object data (name,logo,location,price, website, phone, beeers, tweets?)
        var breweryResults = brewery_obj;

        //loop through results to create a button for each brewery
        // for (var i = 0, i < breweryResults.length; i++){
        	// anchor for dropdown portion
        	var anchor = $("<a>").attr({data-toggle="collapse",
        		 href="#collapseOne",
        		 aria-expanded="true",
        		 aria-controls="collapseOne"});
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

        	var dropdownDiv = $("<div>").attr({id="collapseOne",
        		 class="collapse hide",
        		 role="tabpanel",
        		 aria-labelledby="headingOne",
        		 data-parent="#accordion"});

        	//Div that will hold left and right side information
			var infoDiv = $("<div>").addClass("row widthContainer mx-auto");
			//left side div
			var leftSideDiv = $("<div>").addClass("col");
			var headingDescription = $("<h4> Description: </h4>");
			var pDescription = $("<p>");
			leftSideDiv.append(headingDescription);
			leftSideDiv.append(pDescription);

			//	append left side div to infodiv
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
        // }


    });
}


function getBreweriesLocations(params){
    // Logs info to console
    var apiKey = "70ec47e3e10b786dfce3d08410c16454";
    var URL = "https://api.brewerydb.com/v2/locations/";
    
    par = {
        key: apiKey,
        format: 'json',
    };

    $.extend(true, par, params)

    $.ajax({
        url: URL,
        method: "GET",
        data: $.param(par)
    }).done(function(response) {
        console.log(response)
        console.log(response.data)
    });
}


function get_breweries_ranked(n=10){
    // Ryan finishes this function
    var breweries = [
        {
            name: 'ohso',
           // logo_url: http://url.for.logo
           // location: Arcadia, AZ
           // price: $$
           // website: www.ohso.com
           // phone number: 480-123-4567
           // beers: [Orange Blossom, Stawberry Blonde]
           // tweets?
        },
        {
            name: 'fourpeaks',
        },
        {
            name: 'helton',
        },
        {
            name: 'motherbunch'
        }
    ]
    return breweries
}


// Still needed
function get_yelp_info(brewery_name){
    // gets all the data we need from yelp
}


function get_brewerydb_info(brewery_name){
    // gets all the data we need from brewerydb
}


function build_brewery_button(brewery_obj){
    // given a brewery object, like the example in get_beweries_ranked(),
    var breweryResults = respn 
    // return a new html element including the expandable div and all the info
    // from the brewery_obj
}



