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

function get_yelp_price(brewery_name){

}

function get_brewery_logo(brewery_name){

}

