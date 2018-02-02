 
      var topics = ["lion", "tiger", "cheetah"];

$("#moarGifsbtn").click(function(){
console.log("Hello");
topics.push($("#moarGifstxt").val());
// console.log(topics);
$("#bigCatButtons").empty();
renderButtons();
});

// function addToArray(array)
// {
// array.push($(#moarGifstxt).val());
// return array;
// }
// addToArray(topics);

// console.log(topics);      

function renderButtons(){
  console.log(topics);
      for (var i = 0; i < topics.length; i++) {
        //this derives button title AND value from topics
        $("#bigCatButtons").append("<button value ='" + topics[i] + "' class = 'searched'>" + topics[i] + "</button>" + "  ");
      }
    }

    renderButtons();


    //this function must be activated on click
    $(document).on("click", ".searched", function(){

      

       //returns value attribute of button clicked  But the console cannot read this.
       var topic = this.value;

        //api key = x1c1aoBcDDV4eAMbPgyoTHnw0BWWhIyr
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=x1c1aoBcDDV4eAMbPgyoTHnw0BWWhIyr&limit=10";

        

         $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++)
      {
       
         var rating = results[i].rating;
         var sourceStill = results[i].images.fixed_height_still.url;
         var sourceAni = results[i].images.fixed_height.url;
         console.log(results[i])

         var bigCatImage = $("<img>");
         bigCatImage.attr("data-state", "still");
         bigCatImage.attr("data-still", sourceStill);
         bigCatImage.attr("data-ani", sourceAni);
         bigCatImage.attr("src", sourceStill);
         bigCatImage.addClass("gif");

         $("#gif-gallery").append("<p>" + rating + "</p>");
         $("#gif-gallery").append(bigCatImage);
        

      }
    });


    });

$(document).on("click", ".gif", function(){

  
       // if ($(this).attr("data-state") == "still")
       //  {
       //    $(this).attr("data-state", "animate");
       //    console.log(data-state);
       //  }
       //  else{
       //    $(this).attr("data-state", "still");
       //    console.log(data-state);
       //  }

        var state = $(this).attr("data-state");
       

       if (state == "still")
        {
          $(this).attr("data-state", "animate");
          $(this).attr("src", $(this).attr("data-ani"))

          console.log(state)
          
        }
        else
        {
          $(this).attr("data-state", "still");
          $(this).attr("src", $(this).attr("data-still"))
          console.log(state) 
        }
})

    