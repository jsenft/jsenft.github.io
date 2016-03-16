var places = [
    {
        name      : "Adelitas Cocina Y Cantina",
        lat       : "39.693269",
        lng       : "-104.987079"
    },
    {
        name      : "The Hornet",
        lat       : "39.718130",
        lng       : "-104.987261"
    },
    {
        name      : "Sushi Den",
        lat       : "39.689548",
        lng       : "-104.980744"
    },
    {
        name      : "Kaos Pizzaria",
        lat       : "39.69048",
        lng       : "-104.980636"
    },
    {
        name      : "Park Burger Pearl",
        lat       : "39.682267",
        lng       : "-104.980374"
    },
    {
        name      : "Gaia Bistro",
        lat       : "39.688423",
        lng       : "-104.980606"
    },
    {
        name      : "Devils Food",
        lat       : "39.697947",
        lng       : "-104.961488"
    }
];


var Place = function(data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
}

var myViewModel = function() {

    var self = this;

    this.placeList = ko.observableArray([]);
    this.places.forEach(function(item) {
        self.placeList.push(new Place(item));
    });

    this.currentPlace = ko.observable(this.placeList()[0]);
    this.setCurrentPlace = function(e) {
        self.currentPlace(e);
    }

}

function initMap() {

    var denCenter = {lat: 39.695, lng: -104.991};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: denCenter,
        zoom: 14,
    });

    var infowindow = new google.maps.InfoWindow();
    var marker, i, currentMarker;

        for ( i = 0; i < self.places.length; i++) {
            var data = self.places[i];
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
}


var myVM = new myViewModel();
initMap();
ko.applyBindings(myVM);
