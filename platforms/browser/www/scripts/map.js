$(document).ready(function() {
  // Simulated data that would come from parking sensors/web server
  var lots;

  var jqxhr = $.getJSON( "scripts/data.json", function() {})
    .done(function(json) {
      lots = json;
      var myLatLng = new google.maps.LatLng( 40.428558, -86.9136493);

      var MapSettings ={
        zoom: 14,
        center: myLatLng,
        mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
          },
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER
          },
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
          },
          scaleControl: true,
          streetViewControl: false,
          streetViewControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER
          }
      }
      var map = new google.maps.Map(document.getElementById('map'), MapSettings);
      google.maps.event.addDomListener(window, 'resize', function() {
          map.setCenter(MapSettings.center);
      });

      function addMarker(lot) {
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

      for (lot in lots) {
        addMarker(lots[lot]);
      }
    })
    .fail(function() {
      console.log( "error" );
    });

});
