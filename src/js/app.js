var data = {
    places: [
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
        name      : 'Uno Mas',
        location  : 'Denver, CO'
    }
]};

// Inside the view model constructor function is where to write most of the
// code to handle data-binding the list on the page with the data points.
var myViewModel = function(data) {
    var self = this;
    self.name = data.places.name;
    self.location = data.places.location;
}
