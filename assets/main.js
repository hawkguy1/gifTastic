//-- INSTRUMENT ARRAY --//
var instruments = ["BAGPIPES", "BANJO", "BASSOON", "BUGLE", "CELLO", "CLARINET", "DIDGERIDOO", "DRUMS", "GUITAR", "HARMONICA", "KAZOO", "MARACAS", "MARIMBA", "OBOE", "OCARINA", "ORGAN", "PICCOLO", "SAXOPHONE", "SOUSAPHONE", "TAMBOURINE", "TROMBONE", "TRUMPET", "TUBA", "VIOLIN"]

console.log("INSTRUMENTS: " + instruments)

$(document).ready(function () {

    //-- CREATES GIF BUTTONS FROM ARRAY --//
    addInstrumentButtons();

    function addInstrumentButtons() {
        
        $("#giphyButton").empty();
        
        for (var i = 0; i < instruments.length; i++) {

            var instrumentBtn = $("<button>");

            instrumentBtn.addClass("instruments");
            instrumentBtn.addClass("btn btn-default");
            instrumentBtn.attr("data-name", instruments[i]);
            instrumentBtn.text(instruments[i]);

            $("#giphyButtons").append(instrumentBtn);
        }
    }
    
    //-- ADDS NEW INSTRUMENT BUTTONS --//
    $("#addButton").on("click", function (event) {
        
        event.preventDefault();
        
        var addInstrument = $("#instrumentAdder").val().trim();
        
        console.log("ADDING INSTRUMENT: " + addInstrument);
        
        if (addInstrument != " ") {
            
            instruments.push(addInstrument);
            
            addInstrumentButtons();
            
            $("#instrumentAdder").val("");
        }
    });

    //-- SHOW GIPHY ACCORDING TO BUTTON CLICKED --//
    $(document).on("click", ".instruments", showGiphy);
    
    function showGiphy() {

        var giphyName = $(this).attr("giphyButtons");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=QeJQJNQ2m3JzWEePVxhm6XDKAajxDxP0&q=" + giphyName + "&limit=10&offset=0&rating=G&lang=en";
        
        $("#giphyColumn").empty();
        
        console.log(giphyName);
        console.log(queryURL);
        console.log(showGiphy);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        
        .then(function (response) {

            var results = response.data;

            console.log("GIPHY RESULTS: " + results)

            for (var i = 0; i < results.length; i++) {
                
                var giphyDiv = $('<div>');
                var giphyRating = $("<p>").text("RATING: " + results[i].rating);
                var giphyImage = $("<img>");

                console.log(giphyDiv);
                console.log(giphyRating);
                console.log(giphyImage);

                giphyImage.attr("src", results[i].images.fixed_height.url);
                giphyDiv.append(giphyRating);
                giphyDiv.append(giphyImage);

                $("#giphyArea").prepend(giphyDiv);
            }
        });
    }
    //-- CLICK TO MAKE MOVE OR STOP MOVING --//
    $("#giphyArea").on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
})
