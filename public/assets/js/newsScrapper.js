
$(document).on("click", ".scrapeArticle", function(){
  $.ajax({
    method: "GET",
    url:"/scrape"
  }).then(function(data){
    console.log("Scrape Complete")
  })
})


$(document).on("click", ".showhArticle", function(){

  
  $.ajax({
    method: "GET",
    url:"/articles"
  }).then(function(data){
  	

 	for (var i=0; i<data.length; i++) {

 		var divToContain = $('<div>'); //created new div 
		divToContain.addClass("theDivOfContainer"); 
		divToContain.attr("data-id", data[i]._id)

 		var title = $('<div>'); //created the ratings div
				title.addClass("titleClass");

				title.text("Title: " + data[i].title);
				$(divToContain).append(title); //appended ratings div to div that i created myself

					var link = $('<div>'); //created the ratings div
				link.addClass("linkClass");

				link.text("Link: " + data[i].link);
				$(divToContain).append(link); //appended ratings div to div that i created myself

				$(".row").append(divToContain)
 	}
    
    


  })
})

$(document).on("click", ".theDivOfContainer", function() {
  // Empty the notes from the note section
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {

    	saved:true
    }
  })
    // With that done, add the note information to the page
    .then(function(data) {
		
      alert("Article Saved")

    });
});


