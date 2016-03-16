function initialize() {

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
    var myVM = new myViewModel();
    ko.applyBindings(myVM);
}
