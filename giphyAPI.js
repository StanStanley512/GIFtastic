// array to hold buttons
$(document).ready(function(){
    let stock = ["Dogs", "The Beatles", "Snowboarding", "Anchorman", "Mountains", "Family Guy", "Star Wars", "blink-182", "Football", "Zoolander", "90's", "Vinyl", "Sloth", "Matthew McConaughey", "The Office"];
    function populateButtons(arrayToUse, classToAdd, areaToAddTo){
        $(areaToAddTo).empty();
        for (let i=0; i < arrayToUse.length; i++){
            let a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);

            $(areaToAddTo).append(a);

        }
    }
//clears existing images and adds new selection
    $(document).on("click",".gif-button", function(){
        $("#images").empty();

        $("#gif-button").removeClass("active");
        $(this).addClass("active");

        let type = $(this).attr("data-type");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=9bo092kk9phpVodmrpFkunuMwZXCOqB8";
        
        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response){
            let results = response.data;

            for (let i=0; i < results.length; i++) {
                let gifDiv = $("<div class=\"gif-item\">");

                let rating = results[i].rating;

                let p = $("<p>").text("Rating: " + rating);

                let animated = results[i].images.fixed_height.url;
                let still = results[i].images.fixed_height.url;

                let gifImage = $("<img>");
                gifImage.attr("src", still);
                gifImage.attr("data-still", still);
                gifImage.attr("data-animate", animated);
                gifImage.attr("data-state", "still");
                gifImage.attr("gif-image");

                gifDiv.append(p);
                gifDiv.append(gifImage);

                $("#images").append(gifDiv);
            }
        });
});
//change gif state on click
    $(document).on("click", "#gif-image", function(){
        let state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
//prevent from submitting and refreshing and pushing new buttons
    $("#add-gif").on("click",function(event){
        event.preventDefault();
        let newGIF = $("input").eq(0).val();

        if(newGIF.length > 2) {
            stock.push(newGIF);
        }

        populateButtons(stock, "gif-button", "#gif-button");
    });

    populateButtons(stock, "gif-button", "#gif-button");
})
