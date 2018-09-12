//-- INSTRUMENT ARRAY --//
var topics = ["BAGPIPES", "BANJO", "BASSOON", "BUGLE", "CELLO", "CLARINET", "DIDGERIDOO", "DRUMS", "GUITAR", "HARMONICA", "KAZOO", "MARACAS", "MARIMBA", "OBOE", "OCARINA", "ORGAN", "PICCOLO", "SAXOPHONE", "SOUSAPHONE", "TAMBOURINE", "TROMBONE", "TRUMPET", "TUBA", "VIOLIN"]
console.log(topics)
//-- INITIALIZES DOCUMENT --//
$(document).ready(function () {
    //-- CREATES GIF BUTTONS FROM ARRAY --//
    addInstrumentButtons();
    function addInstrumentButtons() {
        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var instrumentBtn = $("<button>");
            instrumentBtn.addClass("instruments");
            instrumentBtn.addClass("btn btn-default");
            instrumentBtn.attr("data-name", topics[i]);
            instrumentBtn.text(topics[i]);
            $("#gifButtons").append(instrumentBtn);
        }
    }
    addInstrumentButtons();
    $("#addButton").on("click", function (event) {
        event.preventDefault();
        var addInstrument = $("#input").val().trim();
        if (addInstrument !== "") {
            topics.push(addInstrument);
            addInstrumentButtons();
            $("#input").val("");
        }
    });
    $(document).on("click", ".gifButtons", showGiphy);
    function showGiphy() {
        var giphyName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=QeJQJNQ2m3JzWEePVxhm6XDKAajxDxP0&q=" + giphyName + "&limit=10&offset=0&rating=G&lang=en";
        $("#giphyColumn").empty();
        console.log(giphyName);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var giphyImage = $("<img>");
                giphyImage.attr("src", results[i].images.fixed_height_still.url);
                giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
                giphyImage.attr("data-animate", results[i].images.fixed_height.url);
                giphyImage.addClass("gif");
                giphyImage.attr("data-state", "still");
                var newItemdiv = $('<div class="giphyColumn">');
                var gifRating = results[i].rating;
                var divRating = $("<p>").text("RATING: " + gifRating);
                newItemdiv.append(divRating);
                newItemdiv.append(giphyImage);
                $("#giphyArea").prepend(newItemdiv);
            }
        });
    }
    $("#giphyArea").on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
})
