var places = [
    {
        name      : 'Adelitas Cocina Y Cantina',
        address   : '',
        latlng    : {lat: 39.693269, lng: -104.987079}
    },
    {
        name      : 'The Hornet',
        address   : '',
        latlng    : {lat: 39.718130, lng: -104.987261}
    },
    {
        name      : 'Sushi Den',
        address   : '',
        latlng    : {lat: 39.689548, lng: -104.980744}
    },
    {
        name      : 'Kaos Pizzaria',
        address   : '',
        latlng    : {lat: 39.69048, lng: -104.980636}
    },
    {
        name      : 'Park Burger Pearl',
        address   : '',
        latlng    : {lat: 39.682267, lng: -104.980374}
    },
    {
        name      : 'Gaia Bistro',
        address   : '',
        latlng    : {lat: 39.688423, lng: -104.980606}
    },
    {
        name      : 'Devils Food',
        address   : '',
        latlng    : {lat: 39.697947, lng: -104.961488}
    }
];

var myViewModel = function() {
    var self = this;
    var map, infWin, marker;
    self.markers = [];
    self.query = ko.observable('');
    self.allPlaces = ko.observableArray(places);

    var initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.695, lng: -104.991},
          zoom: 14,
      });

      self.allPlaces().forEach(function(item) {
          marker = new google.maps.Marker( {
              map: map,
              position: item.latlng,
              title: item.name
          });
          item.marker = marker;
          self.markers.push(marker);
      });

      self.markers.map(function(item) {
          var contentString = 'Test';
          infWin = new google.maps.InfoWindow({
              content: contentString,
              title: item.name
          });
          item.addListener('click', function() {
              infWin.setContent(this.content)
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

      self.search = ko.computed(function() {
          return ko.utils.arrayFilter(self.allPlaces(), function(location) {
              if (location.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) {
                  location.marker.setVisible(true);
                  return true;
              } else {
                  location.marker.setVisible(false);
                  return false;
              }
          });
      }, self);

      function nonce_generate() {
          return (Math.floor(Math.random() * 1e12).toString());
      };

      var parameters = {
          term: '',
          location: 'Denver CO',
          oauth_consumer_key: 'PHjRa8XxHyGkomr4Pk3CVQ',
          oauth_token: 'vcZOZB6BjS3ENdun266bc05nAxlBOKWz',
          oauth_nonce: nonce_generate(),
          oauth_timestamp: Math.floor(Date.now() / 1000),
          oauth_signature_method: 'HMAC-SHA1',
          callback: 'cb',
      }
      // var url = 'https://api.yelp.com/v2/search?';
      var url = 'https://api.yelp.com/business?' + self.allPlaces().latlng;
      var encodedSignature = oauthSignature.generate('GET', url, parameters, 'GfVqiQ93A_VPJ6Ir5H93FYBJtkE', 'vk1WWobdGt7kfeXPiS9YWt0NGZo');
      parameters.oauth_signature = encodedSignature;

      var settings = {
          url: url,
          data: parameters,
          cache: true,
          dataType: 'jsonp',
          success: function(results) {
              console.log("SUCCESS! %o", results);
          },
          error: function(results) {
              console.log("error %o", results);
          }
      }
      $.ajax(settings);
    }();
}

ko.applyBindings(new myViewModel());
