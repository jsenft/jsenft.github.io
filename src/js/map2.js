function initMap() {
    var self = this;
    var denCenter = {lat: 39.695, lng: -104.991};

    var map = new google.maps.Map(document.getElementById('map'), {
        center: denCenter,
        zoom: 14,
    });

    var infowindow = new google.maps.InfoWindow();
    var marker, i, currentMarker;

    $.getJSON("js/places.json", function(json) {
        for ( i = 0; i < json.places.length; i++) {
            var data = json.places[i];
            var location = new google.maps.LatLng(data.lat, data.lng);
            marker = new google.maps.Marker( {
                map: map,
                position: location,
                title: data.name
            });
        }
        marker.addListener('click', function() {
            currentMarker = this.marker;
            infowindow.open(map, this.marker);
        });
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
    });
}
