var lots = [
  {'lot': 'Ross Ade', 'latlng': '40.436993,-86.918943'},
  {'lot': 'Cary Quad', 'latlng': '40.433064,-86.917838'},
  {'lot': 'Francis A. Cordova', 'latlng': '40.429502,-86.922777'}
];

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.428558, lng: -86.9136493},
    zoom: 14
  });

  // loop through lots and place markers w/ cards
  for (var lot in lots) {
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h2 id="firstHeading" class="firstHeading">'+ lots[lot]['lot'] + '</h2>'+
      '<div id="bodyContent">'+
      '<p>3/50 Spaces Available</p>' +
      '</div>'+
      '</div>';


    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var coords = lots[lot]['latlng'].split(',');
    console.log(coords);

    var marker = new google.maps.Marker({
      position: {lat: parseFloat(coords[0]), lng: parseFloat(coords[1])},
      map: map,
      title: lots[lot]['lot']
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }

}
