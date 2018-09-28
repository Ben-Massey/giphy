//celebrities array to make starting buttons
var celebrities = ["margot robbie", "Justin Timberlake", "Chris Pratt", "Ryan Reynolds", "Jennifer Lawrence", "emma watson", "selena gomez"];

function showGifs() {
    $("#gif-view").empty();

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=LEI2dKjsFduE4YCf6DTBAEw4mCZMPyop&limit=10";

    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var stillGif = results[i].images.fixed_height_still.url;
            var animatedGif = results[i].images.fixed_height.url;
            var pOne = $("<p>").text("Rating: " + results[i].rating);
            var celebrityImg = $("<img class='star-img'>");
            var celebrityDiv = $("<div>");

            celebrityImg.attr("src", stillGif);
            celebrityImg.attr("gif-still", stillGif);
            celebrityImg.attr("gif-animate", animatedGif);
            celebrityImg.attr("gif-state", "still");
            celebrityImg.attr("alt", "gif-img");
            celebrityImg.addClass("gif-container");

            celebrityDiv.append(celebrityImg);
            celebrityDiv.append(pOne);

            $("#gif-view").prepend(celebrityDiv);
        }
    });
}

$(document).on("click", ".star-img", function () {
    var state = $(this).attr("gif-state");
    var moving = $(this).attr("gif-animate");
    var still = $(this).attr("gif-still");

    if (state === "still") {
        $(this).attr('src', moving);
        $(this).attr('gif-state', 'animate');
    }
    else {
        $(this).attr('src', still);
        $(this).attr('data-state', 'still');
    }
});
function renderButtons() {
    $("#buttons-view").empty();
    $("#gif-input").val("");

    for (var i = 0; i < celebrities.length; i++) {
        var button = $("<button>");

        button.addClass("gifs-btn btn btn-danger ml-4 mb-3");
        button.attr("data-name", celebrities[i]);
        button.text(celebrities[i]);
        $("#buttons-view").append(button);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();

    var celebrity = $("#gif-input").val().trim();

    celebrities.push(celebrity);

    renderButtons();
});

$(document).on("click", ".gifs-btn", showGifs);

renderButtons();
