// GET simulated data
var jqxhr = $.getJSON("scripts/data.json", function() {})
  .done(function(json) {
    for (lot in json) {
      var boxDiv = "<div class='box'>" +
        "<h2>" + json[lot]['lot'] + "</h2>" +
        "<small>" + json[lot]['spots'] + ' spots available</small>' +
        "</div>";
      $(".boxContainer").append(boxDiv);
    }
  })
  .fail(function() {
    var newDiv = "<div><h1>Something went wrong. Please contact support.</h2></div>";
    $(".boxContainer").append(newDiv);
  })
