var food = ["Pizza", "Tacos", "Cheeseburger", "Fried Chicken", "Pie", "Mom's Spaghetti", "Popcorn"];

$(document).ready(function() {

    function displayAllButtons() {

        for (var i = 0; i < food.length; i++) {
            var buttonDisplay = $('<button type="button" class="btn btn-info btn-lg"><br>');
            buttonDisplay.attr('data-food', food[i]);
            buttonDisplay.addClass("show-buttons");
            buttonDisplay.text(food[i]);

            $('.buttons-appear-here').append(buttonDisplay);
        }
    }
    displayAllButtons();


    $('#submit-food').on('click', function(event) {
        $('.buttons-appear-here').empty();
        event.preventDefault();

        var userFood = $('#inputFoodName').val().trim();

        food.push(userFood);
        console.log(userFood);
        console.log(food);

        displayAllButtons();
        gifAction();
    });

    function gifAction() {
        $('.show-buttons').on('click', function() {
            var food2 = $(this).data('food');
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food2 + "&api_key=dc6zaTOxFJmzC&limit=6";
            console.log(food2);

            $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {

                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var i = 0; i < response.data.length; i++) {

                    var foodDiv = $('<div>');
                    var gifRating = $('<p>').text("RATING: " + results[i].rating);

                    foodDiv.append(gifRating);
                    foodDiv.append(gifImage);

                    $('#gifs-appear-here').prepend(foodDiv);

                    var gifImage = $('<img>');

                    gifImage.attr('src', results[i].images.fixed_height_still.url);
                    gifImage.attr('data-still', results[i].images.fixed_height_still.url);
                    gifImage.attr('data-animate', results[i].images.fixed_height.url);
                    gifImage.attr('data-state', 'still');
                }
                $('img').on('click', function() {

                    console.log("I clicked: ");

                    var stateOfGif = $(this).attr('data-state');

                    if (stateOfGif === 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
                });
            });
        });
    }
    gifAction();
});
