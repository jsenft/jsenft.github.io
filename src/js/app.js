var places = [
    {
        name      : 'Adelitas Cocina y Cantina',
        id        : 'B5GgKhPREBgipv8kfSOluw',
        web       : 'http://www.adelitasdenver.com/',
        latlng    : {lat: 39.693269, lng: -104.987079}
    },
    {
        name      : 'The Hornet',
        id        : 'QmgLDVzZl_91e3-GceV-5w',
        web       : 'http://hornetrestaurant.com/',
        latlng    : {lat: 39.718130, lng: -104.987261}
    },
    {
        name      : 'Sushi Den',
        id        : '8lKL5Bxt620aqh0ulDByIg',
        web       : 'http://www.sushiden.net/',
        latlng    : {lat: 39.689548, lng: -104.980744}
    },
    {
        name      : 'Kaos Pizzaria',
        id        : 't2xnzRv93FTEvDnWQxYBkg',
        web       : 'https://kaospizzeria.com/',
        latlng    : {lat: 39.69048, lng: -104.980636}
    },
    {
        name      : 'Park Burger Pearl',
        id        : 'JSNizJSuj0gZ594nBXhVWQ',
        web       : 'http://www.parkburger.com/',
        latlng    : {lat: 39.682267, lng: -104.980374}
    },
    {
        name      : 'Gaia Bistro',
        id        : 'NztM8WhkcZiHyn_NGqWN5Q',
        web       : 'http://www.gaiabistro.com/',
        latlng    : {lat: 39.688423, lng: -104.980606}
    },
    {
        name      : 'Devils Food Bakery & Cookery',
        id        : '4DE8RY7jkako7ADqpnAd3w',
        web       : 'http://www.devilsfooddenver.com/',
        latlng    : {lat: 39.697947, lng: -104.961488}
    }
];

var myViewModel = function() {
    var self = this;
    var map, infWin, marker, currentMarker;
    self.markers = [];
    self.query = ko.observable('');
    self.allPlaces = ko.observableArray(places);

    var mapCenter = {lat: 39.695291, lng: -104.979265};
    var initMap = function() {
      map = new google.maps.Map(document.getElementById('map_canvas'), {
          center: mapCenter,
          zoom: 13
      });

      var bounds = new google.maps.LatLngBounds({ lat: 39.678447, lng: -104.993143 }, { lat: 39.725502, lng: -104.959331 });

      google.maps.event.addDomListener(window, 'resize', function(){
          map.fitBounds(bounds);
          map.setZoom(13);
      });

      google.maps.event.addListener(map,'click', function() {
          infWin.close();
          map.setCenter(mapCenter);
      });

      self.allPlaces().forEach(function(item) {
          marker = new google.maps.Marker( {
              map: map,
              position: item.latlng,
              title: item.name
          });
          marker.id = item.id;
          marker.web = item.web;
          item.marker = marker;
          self.markers.push(marker);
      });

      self.markers.map(function(item) {
          infWin = new google.maps.InfoWindow({
              maxWidth: 260
          });
          function yelpMe(info) {
              return function(info) {
                  item.setAnimation(google.maps.Animation.BOUNCE);
                  setTimeout(function() {
                      item.setAnimation(null)
                  }, 1500);
                  currentMarker = item;
                  getYelp(this.id);
              }
          }
          item.addListener('click', yelpMe(infWin));
      });

      self.listClick = function(item) {
          if (this.name) {
            item.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                item.marker.setAnimation(null)
            }, 1500);
            currentMarker = item.marker;
            getYelp(item.id);
            }
      }

      self.search = ko.computed(function() {
          infWin.close();
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

      function getYelp(placeId) {
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
          var url = 'https://api.yelp.com/v2/business/' + placeId;
          var encodedSignature = oauthSignature.generate('GET', url, parameters, 'GfVqiQ93A_VPJ6Ir5H93FYBJtkE', 'vk1WWobdGt7kfeXPiS9YWt0NGZo');
          parameters.oauth_signature = encodedSignature;

          var settings = {
              url: url,
              data: parameters,
              cache: true,
              dataType: 'jsonp',
              timeout: 1000,
              success: function(results) {
                  var infoContent = '<div id="infwin" class="col-md-9"><h3>' + results.name + '</h3>' + '<div><img src="' + results.rating_img_url + '"></div>' + '<h4>' + results.location.address + '</h4><h4>' + results.display_phone + '</h4><a href="' + currentMarker.web + '" target="_blank">' + currentMarker.web + '</a><hr><div id="placeImg"><img src="' + results.image_url + '" class="img-responsive"></div>' + '<div id="reviewText">' + results.snippet_text + '</div><hr><div><a href="' + results.url + '" target="_blank">Go to Yelp Page</a></div><div><img src="img/yelp_powered_btn_red.png"></div></div>';
                  infWin.setContent(infoContent);
                  infWin.open(map, currentMarker);
              },
              error: function() {
                  infWin.setContent("Sorry, No Yelp Information Available");
                  infWin.open(map, currentMarker);
              }
          }
          $.ajax(settings);
      }
  }();
}

function googleError() {
    $("h2").hide();
    $("p").hide();
    $("input").hide();
    $("li").hide();
    $("header").append('<h1>Sorry, Google Maps has failed to load!</h1>');
}
function googleSuccess() {
    if (typeof google !== 'undefined' || google === null) {
        ko.applyBindings(new myViewModel());
    }
    else {
        googleError();
    }
}
