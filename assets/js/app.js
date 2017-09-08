// Code for brewery ranking website

function getBreweries(params=null){
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
           // beers: [Orange Blossom, Stawberry Blonde]
           // phone number: 480-123-4567
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
    // return a new html element including the expandable div and all the info
    // from the brewery_obj
}


