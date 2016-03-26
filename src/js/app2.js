var map, marker, location, infowindow, windowContent;
var places = [
        {
            name      : 'Adelitas Cocina Y Cantina',
            lat       : 39.693269,
            lng       : -104.987079
        },
        {
            name      : 'The Hornet',
            lat       : 39.718130,
            lng       : -104.987261
        },
        {
            name      : 'Sushi Den',
            lat       : 39.689548,
            lng       : -104.980744
        },
        {
            name      : 'Kaos Pizzaria',
            lat       : 39.69048,
            lng       : -104.980636
        },
        {
            name      : 'Park Burger Pearl',
            lat       : 39.682267,
            lng       : -104.980374
        },
        {
            name      : 'Gaia Bistro',
            lat       : 39.688423,
            lng       : -104.980606
        },
        {
            name      : 'Devils Food',
            lat       : 39.697947,
            lng       : -104.961488
        }
];

function initMap() {

    var denCenter = {lat: 39.695, lng: -104.991};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: denCenter,
        zoom: 14,
    });

    for (var i = 0; i < places.length; i++) {
        var data = places[i];
        location = new google.maps.LatLng(data.lat, data.lng);
        marker = new google.maps.Marker( {
            map: map,
            position: location,
            title: data.name
        });
        marker.setMap(map);
        data.marker = marker;

        marker.addListener('click', toggleBounce);

        infowindow = new google.maps.InfoWindow();
        data.infowindow = infowindow;

        marker.addListener('visible_changed', function() {
            infowindow.close(map, marker);
        });

        google.maps.event.addListener(marker, 'click', function() {
            // launch yelp function
        });
    }
}

function createInfoWindow(clickPosition) {
    infowindow.setContent(infowindowContent);
    infowindow.open(map, clickPosition);
}

function toggleBounce() {
    var self = this;
    if (this.getAnimation() !== null) {
        this.setAnimation(null);
    } else {
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.setAnimation(null)
          }, 1000);
    }
}

var Place = function(data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
}

var myViewModel = function() {
    var self = this;

    self.placeList = ko.observableArray([]);
    places.forEach(function(item) {
        self.placeList.push(new Place(item));
    });

    self.currentPlace = ko.observable(self.placeList()[0]);

    self.toggleMarker = function(listMarker) {

    }
    self.setCurrentPlace = function(item) {
        self.currentPlace(item);
    }
}
ko.applyBindings(new myViewModel());
