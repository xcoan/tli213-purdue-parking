function initMap() {
  // Initialize Map settings
  var myLatLng = new google.maps.LatLng(40.428558, -86.9136493);
  var MapSettings ={
    zoom: 15,
    center: myLatLng,
    mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_CENTER
      },
      fullscreenControl: false,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      scaleControl: false,
      streetViewControl: false,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER
      }
  }
  // Create map object with settings
  var map = new google.maps.Map(document.getElementById('map'), MapSettings);

  //Simulated data that would come from parking sensors/web server
  var jqxhr = $.getJSON( "scripts/data.json", function() {})
    .done(function(json) {
      // place marker on page
      function placeMarker(lot) {
        var markerColor = "blue";
        if (lot['spots'].charAt(0) == '0') {
          markerColor = "red"; // lot is full
        }
        var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h2 id="firstHeading" class="firstHeading">'+lot['lot']+'</h2>'+
          '<div id="bodyContent">'+
          '<p>'+lot['spots']+' spaces available</p>'+
          '</div>'+
          '</div>';

        var coords = lot['latlng'].split(',');
        var marker = new google.maps.Marker({
          position: {lat: parseFloat(coords[0]), lng: parseFloat(coords[1])},
          map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/' + markerColor + '.png',
          title: lot['lot'],
          contentString: contentString
        });

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.setContent(this.contentString);
          infowindow.open(map, this);
        });
      }
      // Place markers on map for each parking lot
      for (lot in json) {
        placeMarker(json[lot]);
      }
    })
    .fail(function() {
      var newDiv = "<div><h1>Something went wrong. Please contact support.</h2></div>";
      $("#map").append(newDiv);
    });
}
