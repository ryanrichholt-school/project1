function getResults(term){    
    var url = "https://api.giphy.com/v1/gifs/search"

    var search_params = {
        api_key: "4b47391ae84f4d4ba766ea48f24cbcd6",
        q: term
    }

    var req = $.ajax({
      method: "GET",
      url: url,
      data: $.param(search_params)
    })

    req.done(function(resp){
        console.log(resp.data)
    })
}

function getBreweries(){
    var apiKey = "70ec47e3e10b786dfce3d08410c16454";
    var URL = "https://api.brewerydb.com/v2/breweries/";

    params = {
        key: apiKey,
        format: 'json',
    };

    $.ajax({
        url: URL,
        method: "GET",
        data: $.param(params)
    }).done(function(response) {
        console.log(response)
    });
}

function getBreweries2(){
    var apiKey = "70ec47e3e10b786dfce3d08410c16454";
    var URL = "https://api.brewerydb.com/v2/breweries/?key=70ec47e3e10b786dfce3d08410c16454&format=json";

    $.ajax({
        url: URL,
        method: "GET",
    }).done(function(response) {
        console.log(response)
    });
}
