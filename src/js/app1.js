var places = [
    {
        name      : 'Adelitas Cocina Y Cantina',
        id        : 'B5GgKhPREBgipv8kfSOluw',
        latlng    : {lat: 39.693269, lng: -104.987079}
    },
    {
        name      : 'The Hornet',
        id        : 'QmgLDVzZl_91e3-GceV-5w',
        latlng    : {lat: 39.718130, lng: -104.987261}
    },
    {
        name      : 'Sushi Den',
        id        : '8lKL5Bxt620aqh0ulDByIg',
        latlng    : {lat: 39.689548, lng: -104.980744}
    },
    {
        name      : 'Kaos Pizzaria',
        id        : 't2xnzRv93FTEvDnWQxYBkg',
        latlng    : {lat: 39.69048, lng: -104.980636}
    },
    {
        name      : 'Park Burger Pearl',
        id        : 'JSNizJSuj0gZ594nBXhVWQ',
        latlng    : {lat: 39.682267, lng: -104.980374}
    },
    {
        name      : 'Gaia Bistro',
        id        : 'NztM8WhkcZiHyn_NGqWN5Q',
        latlng    : {lat: 39.688423, lng: -104.980606}
    },
    {
        name      : 'Devils Food',
        id        : '4DE8RY7jkako7ADqpnAd3w',
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
      google.maps.event.addListener(map,'click',function() {
          infWin.close();
      });

      var contentString = "<div style='width:150px; text-align: center;'>Data!</div>";


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
          infWin = new google.maps.InfoWindow({
              content: contentString
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
            item.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                item.marker.setAnimation(null)
            }, 1500);
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

      var getYelp = function(item) {
          function nonce_generate() {
              return (Math.floor(Math.random() * 1e12).toString());
          };

          var parameters = {
              oauth_consumer_key: 'PHjRa8XxHyGkomr4Pk3CVQ',
              oauth_token: 'vcZOZB6BjS3ENdun266bc05nAxlBOKWz',
              oauth_nonce: nonce_generate(),
              oauth_timestamp: Math.floor(Date.now() / 1000),
              oauth_signature_method: 'HMAC-SHA1',
              callback: 'cb',
          }
          var url = 'https://api.yelp.com/v2/business/' + places[0].id;
          var encodedSignature = oauthSignature.generate('GET', url, parameters, 'GfVqiQ93A_VPJ6Ir5H93FYBJtkE', 'vk1WWobdGt7kfeXPiS9YWt0NGZo');
          parameters.oauth_signature = encodedSignature;

          var settings = {
              url: url,
              data: parameters,
              cache: true,
              dataType: 'jsonp',
              success: function(results) {
                  console.log("SUCCESS! %o", results);
                  // infWin.open(map, marker);
              },
              error: function(results) {
                  console.log("error %o", results);
              }
          }
          $.ajax(settings);
      }
    }();
}
ko.applyBindings(new myViewModel());
