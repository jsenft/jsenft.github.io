function googleError(){$("h2").hide(),$("p").hide(),$("input").hide(),$("li").hide(),$("header").append("<h1>Sorry, Google Maps has failed to load!</h1>")}function googleSuccess(){"undefined"!=typeof google||null===google?ko.applyBindings(new myViewModel):googleError()}var places=[{name:"Adelitas Cocina y Cantina",id:"B5GgKhPREBgipv8kfSOluw",web:"http://www.adelitasdenver.com/",latlng:{lat:39.693269,lng:-104.987079}},{name:"The Hornet",id:"QmgLDVzZl_91e3-GceV-5w",web:"http://hornetrestaurant.com/",latlng:{lat:39.71813,lng:-104.987261}},{name:"Sushi Den",id:"8lKL5Bxt620aqh0ulDByIg",web:"http://www.sushiden.net/",latlng:{lat:39.689548,lng:-104.980744}},{name:"Kaos Pizzaria",id:"t2xnzRv93FTEvDnWQxYBkg",web:"https://kaospizzeria.com/",latlng:{lat:39.69048,lng:-104.980636}},{name:"Park Burger Pearl",id:"JSNizJSuj0gZ594nBXhVWQ",web:"http://www.parkburger.com/",latlng:{lat:39.682267,lng:-104.980374}},{name:"Gaia Bistro",id:"NztM8WhkcZiHyn_NGqWN5Q",web:"http://www.gaiabistro.com/",latlng:{lat:39.688423,lng:-104.980606}},{name:"Devils Food Bakery & Cookery",id:"4DE8RY7jkako7ADqpnAd3w",web:"http://www.devilsfooddenver.com/",latlng:{lat:39.697947,lng:-104.961488}}],myViewModel=function(){var e,a,n,t,o=this;o.markers=[],o.query=ko.observable(""),o.allPlaces=ko.observableArray(places);var i={lat:39.695291,lng:-104.979265};(function(){function l(n){function o(){return Math.floor(1e12*Math.random()).toString()}var i={oauth_consumer_key:"PHjRa8XxHyGkomr4Pk3CVQ",oauth_token:"vcZOZB6BjS3ENdun266bc05nAxlBOKWz",oauth_nonce:o(),oauth_timestamp:Math.floor(Date.now()/1e3),oauth_signature_method:"HMAC-SHA1",callback:"cb"},l="https://api.yelp.com/v2/business/"+n,r=oauthSignature.generate("GET",l,i,"GfVqiQ93A_VPJ6Ir5H93FYBJtkE","vk1WWobdGt7kfeXPiS9YWt0NGZo");i.oauth_signature=r;var s={url:l,data:i,cache:!0,dataType:"jsonp",timeout:1e3,success:function(n){var o='<div class="col-md-9"><h3>'+n.name+'</h3><div><img src="'+n.rating_img_url+'"></div><h4>'+n.location.address+"</h4><h4>"+n.display_phone+'</h4><a href="'+t.web+'" target="_blank">'+t.web+'</a><hr><div><img src="'+n.image_url+'" class="img-responsive"></div><div>'+n.snippet_text+'</div><hr><div><a href="'+n.url+'" target="_blank">Go to Yelp Page</a></div><div><img src="img/yelp_powered_btn_red.png"></div></div>';a.setContent(o),a.open(e,t)},error:function(){a.setContent("Sorry, No Yelp Information Available"),a.open(e,t)}};$.ajax(s)}e=new google.maps.Map(document.getElementById("map_canvas"),{center:i,zoom:13});var r=new google.maps.LatLngBounds({lat:39.678447,lng:-104.993143},{lat:39.725502,lng:-104.959331});google.maps.event.addDomListener(window,"resize",function(){e.fitBounds(r),e.setZoom(13)}),google.maps.event.addListener(e,"click",function(){a.close(),e.setCenter(i)}),o.allPlaces().forEach(function(a){n=new google.maps.Marker({map:e,position:a.latlng,title:a.name}),n.id=a.id,n.web=a.web,a.marker=n,o.markers.push(n)}),o.markers.map(function(e){function n(a){return function(a){e.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){e.setAnimation(null)},1500),t=e,l(this.id)}}a=new google.maps.InfoWindow({maxWidth:260}),e.addListener("click",n(a))}),o.listClick=function(e){this.name&&(e.marker.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){e.marker.setAnimation(null)},1500),t=e.marker,l(e.id))},o.search=ko.computed(function(){return a.close(),ko.utils.arrayFilter(o.allPlaces(),function(e){return e.name.toLowerCase().indexOf(o.query().toLowerCase())>=0?(e.marker.setVisible(!0),!0):(e.marker.setVisible(!1),!1)})},o)})()};