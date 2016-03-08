var places = [
    {
        name      : 'Adelitas',
        location  : 'Denver, CO'
    },
    {
        name      : 'The Hornet',
        location  : 'Denver, CO'
    },
    {
        name      : 'Sushi Den',
        location  : 'Denver, CO'
    },
    {
        name      : 'Kaos Pizzaria',
        location  : 'Denver, CO'
    },
    {
        name      : 'Park Burger',
        location  : 'Denver, CO'
    },
    {
        name      : 'Gaia Bistro',
        location  : 'Denver, CO'
    },
    {
        name      : 'Devils Food',
        location  : 'Denver, CO'
    }
];

var Place = function(data) {
    this.name = ko.observable(data.name);
    this.location = ko.observable(data.location);
    // this.marker = 
}

function myViewModel() {
    var self = this;
    this.placeList = ko.observableArray([]);
    places.forEach(function(e){
        self.placeList.push(new Place(e));
    });

    this.currentPlace = ko.observable(this.placeList()[0]);
    this.setCurrentPlace = function(e) {
        self.currentPlace(e);
    }
};
ko.applyBindings(new myViewModel());
