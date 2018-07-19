
$(document).on("click", ".showhSavedArticle", function(){
  $.ajax({
    method: "GET",
    url:"/savedArticles"
  }).then(function(data){

    for (var i=0; i<data.length; i++) {
        var divToContainSaved = $('<div>'); //created new div 
    divToContainSaved.addClass("theDivOfContainerSaved"); 
    divToContainSaved.attr("data-id-saved", data[i]._id)
    divToContainSaved.addClass("theDivOfContainerSaved"+data[i]._id)

    var titleSaved = $('<div>'); //created the ratings div
        titleSaved.addClass("titleClassSaved");

        titleSaved.text("Title: " + data[i].title);
        $(divToContainSaved).append(titleSaved); //appended ratings div to div that i created myself

          var linkSaved = $('<div>'); //created the ratings div
        linkSaved.addClass("linkClassSaved");

        linkSaved.text("Link: " + data[i].link);
        $(divToContainSaved).append(linkSaved); //appended ratings div to div that i created myself

        $(".two").append(divToContainSaved)
  }
  })
})

// Whenever someone clicks a p tag
$(document).on("click", ".theDivOfContainerSaved", function() {



  var thisId = $(this).attr("data-id-saved");

  $("#notes").empty();

  // Empty the notes from the note section

    $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {


      // An input to enter a new title

      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");


        if (data.note) {
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }

      // If there's a note in the article

    });

});

$(document).on("click", "#savenote", function() {


  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/savedArticles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data.note)
      // Empty the notes section
      $("#notes").empty();

      $.ajax({
        method: "GET",
        url: "/notes/" + data.note
      }).then(function(newData){
        console.log(thisId)
        console.log(newData)

        $(".theDivOfContainerSaved"+thisId).append(newData.body + "<br>")

      })
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
