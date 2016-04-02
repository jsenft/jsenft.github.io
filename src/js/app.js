var places = [
    {
        name      : 'Adelitas Cocina Y Cantina',
        latlng    : {lat: 39.693269, lng: -104.987079}
    },
    {
        name      : 'The Hornet',
        latlng    : {lat: 39.718130, lng: -104.987261}
    },
    {
        name      : 'Sushi Den',
        latlng    : {lat: 39.689548, lng: -104.980744}
    },
    {
        name      : 'Kaos Pizzaria',
        latlng    : {lat: 39.69048, lng: -104.980636}
    },
    {
        name      : 'Park Burger Pearl',
        latlng    : {lat: 39.682267, lng: -104.980374}
    },
    {
        name      : 'Gaia Bistro',
        latlng    : {lat: 39.688423, lng: -104.980606}
    },
    {
        name      : 'Devils Food',
        latlng    : {lat: 39.697947, lng: -104.961488}
    }
];

var map, infWin, marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.695, lng: -104.991},
        zoom: 14,
    });
}

// function Place(item) {
//     this.name = ko.observable(item.name);
//     this.latlng = ko.observable(item.latlng);
// }

function myViewModel() {
    var self = this;
    self.markers = [];

    // self.placeList = ko.observableArray();
    // places.forEach(function(item) {
    //     self.placeList.push(new Place(item));
    // });

    // self.currentPlace = ko.observable(self.placeList()[0]);
    // self.setCurrentPlace = function(item) {
    //     self.currentPlace(item);
    // }

    self.allPlaces = ko.observableArray(places);

    self.allPlaces().forEach(function(item) {
        marker = new google.maps.Marker( {
            map: map,
            position: item.latlng,
            title: item.name
        });
        item.marker = marker;
        this.markers.push(marker);
    });

    self.markers.map(function(item) {
        infWin = new google.maps.InfoWindow({
            content: "Test",
            title: item.name
        });
        item.addListener('click', function() {
            infWin.open(map, this),
            item.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                item.setAnimation(null)
            }, 1500);
        });
    });

    self.listClick = function(item) {
        if (this.name) {
          item.marker.setAnimation(google.maps.Animation.DROP);
          infWin.open(map, item.marker);
        }
    }

    self.query = ko.observable('');

    self.search = ko.computed(function() {
        return ko.utils.arrayFilter(self.allPlaces(), function(listResult) {
            return listResult.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
        });
    });
}

// ko.applyBindings(new myViewModel());

$(document).ready(function() {
    ko.applyBindings(myViewModel);
});
