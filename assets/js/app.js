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
    for(i in data){
        build_brewery_button(data[i])
    }
})


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


function build_brewery_button(brewery_obj){
    // given a brewery object, like the example in get_beweries_ranked(), 
    // return a new html element including the expandable div and all the info
    // from the brewery_obj
    console.log('building button for ' + brewery_obj.brewery.name)
    console.log(brewery_obj)
}



