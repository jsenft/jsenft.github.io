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

    this.currentPlace = ko.observable(this.placeList()[0]);
    this.setCurrentPlace = function(e) {
        self.currentPlace(e);
    }
}
ko.applyBindings(new myViewModel());
