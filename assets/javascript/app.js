$(document).ready(function () {

    $("#search-btn").on("click", function (e) {
        e.preventDefault(); //!!!IMPORTANT!!!

        var searchText = $("#search").val().trim();
        // var searchText = $("#search").val().trim() + " cooking";


        var recipe = getRecipe(searchText);
        recipe.then(function (recipeResults) {
            $(".recipeImage").text("");
            // console.log(recipeResults);

            for (var i = 0; i < recipeResults.length; i++) {
                var imageURL = recipeResults[i].imageURL;
                var title = recipeResults[i].title;
                // console.log(imageURL);
                // console.log(title);

                var col = $("<div>").addClass("col-md-4");

                var card = $("<div>").addClass("card border-1 food-card mr-3 mb-3");
                card.attr("width", "100%");
                card.attr("name", title);

                var img = $("<img>").addClass("card-img-top");
                img.attr("src", imageURL);

                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<div>").addClass("card-title");
                cardTitle.text(title);
                cardBody.append(cardTitle);
                card.append(img, cardBody);
                col.append(card);

                $(".recipeImage").append(col);
            };

            $(".embedVideo").text("Click on the image to show the video...");
        });
    });

    $(document).on("click", ".food-card", function () {
        console.log($(this).attr("class"));

        var searchText = $(this).attr("name");
        var order = "relevance";

        var videoID = getVideos(searchText, order, 6);
        // console.log("video ID is", videoID); // This console.log returns Promise

        // 'videoIDArrReturned' is the result returned from the function 'getVideos'.
        // Using Javascript built-in object 'Promise' helps to return the result from AJAX query because AJAX is asynchronous.
        videoID.then(function (videoIDArrReturned) {
            // console.log("result is ", videoIDArr);
            // console.log(videoIDArrReturned.title);

            $(".embedVideo").text("");

            for (var i = 0; i < videoIDArrReturned.id.length; i++) {
                var srcVideo = "https://www.youtube.com/embed/" + videoIDArrReturned.id[i];
                // console.log(srcVideo);

                var col = $("<div>").addClass("col-sm-12");
                
                var div = $("<div>").addClass("embed-responsive embed-responsive-16by9 mb-4");
                var iframe = $("<iframe>").addClass("embed-responsive-item");
                iframe.attr("id", "video" + i);
                // iframe.attr("width", 240);
                // iframe.attr("height", 120);
                iframe.attr("frameborder", 1);
                iframe.attr("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen");
                iframe.attr("src", srcVideo);
                $(div).append(iframe);
                $(col).append(div);
                $(".embedVideo").append(col);
            };
        });
    });
});
