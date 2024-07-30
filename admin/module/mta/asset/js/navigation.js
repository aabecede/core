((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyCjLU08DWP-wBEfkl4lyGyOiMPV6iiEnoE",
  // Add other bootstrap parameters as needed, using camel case.
  // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
});
var malang = {
  lat: -7.9346600068216,
  lng: 112.65868753195,
};
var setZoom = 18;
var indexTry = 0;
var indexContent = 0;
var dataCollect = [];
var memoryCollect = [];
var pointCollectDj = []
var memoryCollectAco = [];
var pointCollectAco = [];
var jumlahTitikPersemut = [];
var pointDuplicateCollectAco = [];
class App {
  static map;
  static mapAco;
  static markers = new Map();
  static polylines = new Map();
  static networkPolylines = new Map();
  static stepPolylines = new Map();
  static highResStepPolylines = [];
  static steps = [];
  static pointIcon;
  static stopIcon;
  static startMarker = null;
  static endMarker = null;
  static allPointsLine = []

  static async initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    // var malang = {
    //   lat: -7.9346600068216,
    //   lng: 112.65868753195
    // };
    // Create a map object and specify the DOM element for display.
    App.map = new Map(document.getElementById("map"), {
      center: malang,
      zoom: 30,
      clickableIcons: false,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
      ],
    });
    // console.log("zoom", setZoom);

    var infoWindow = new google.maps.InfoWindow();

    // Create mapAco
    // App.mapAco = new Map(document.getElementById('mapAco'), {
    //   center: malang,
    //   zoom: 25,
    //   clickableIcons: false,
    //   styles: [{
    //     featureType: "poi",
    //     elementType: "labels",
    //     stylers: [{
    //       visibility: "off"
    //     }]
    //   }],
    //   // draggable: false, // Make mapAco read-only
    //   disableDefaultUI: true
    // });

    App.map.addListener("click", (e) => {
      $("#mta-poly-context").hide();
      if (App.startMarker == null) {
        App.startMarker = new google.maps.Marker({
          map: App.map,
          position: e.latLng,
          draggable: true,
        });
        // Trigger the same click event on mapAco
        // if (App.mapAco) {
        //   App.startMarker = new google.maps.Marker({
        //     map: App.mapAco,
        //     position: e.latLng,
        //     draggable: false
        //   });
        // }

        return;
      }
      if (App.endMarker == null) {
        App.endMarker = new google.maps.Marker({
          map: App.map,
          position: e.latLng,
          draggable: true,
        });
        // Trigger the same click event on mapAco
        // if (App.mapAco) {
        //   App.endMarker = new google.maps.Marker({
        //     map: App.mapAco,
        //     position: e.latLng,
        //     draggable: false
        //   });
        // }

        return;
      }
    });

    /**dragable */
    // Handle drag event on map
    var isDragging = false;
    var lastDragPosition;
    google.maps.event.addListener(App.map, "dragstart", function () {
      isDragging = true;
      lastDragPosition = App.map.getCenter();
    });
    google.maps.event.addListener(App.map, "dragend", function () {
      isDragging = false;
      var newDragPosition = App.map.getCenter();
      var latDiff = newDragPosition.lat() - lastDragPosition.lat();
      var lngDiff = newDragPosition.lng() - lastDragPosition.lng();
      // var newMapAcoCenter = App.mapAco.getCenter();
      // App.mapAco.setCenter({
      //   lat: newMapAcoCenter.lat() + latDiff,
      //   lng: newMapAcoCenter.lng() + lngDiff
      // });
    });

    // Make mapAco follow the initial position of map
    // App.mapAco.setCenter(App.map.getCenter());
    /**end dragable */

    // Try HTML5 geolocation.
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          var malang = {
            lat: -7.982379,
            lng: 112.630321,
          };
          App.map.setCenter(malang);
          App.map.setZoom(setZoom);
          // console.log("zoom", setZoom);
        },
        function () {
          App.handleLocationError(true, infoWindow, App.map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      App.handleLocationError(false, infoWindow, App.map.getCenter());
    }
  }

  static handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    // var malang = {
    //   lat: -7.982379,
    //   lng: 112.630321
    // };
    App.map.setCenter(malang);
    App.map.setZoom(setZoom);
    // console.log("zoom", setZoom);
  }

  static getLines() {
    // console.log("start get lines");
    // console.log("Get All interchanges and make Graph List Interchanges");
    Core.instance()
      .ajax()
      .get("m/x/mta/lineApi/getInterchanges")
      .then((interchanges) => {
        interchanges.forEach((i) => {
          let idpoints = [];
          if (i.idpoints != null) idpoints = i.idpoints.split(",");
          Graph.interchanges.set(i.idinterchange, idpoints);
        });
      });

    // console.log("Get all Lines (mikrolet)");
    Core.instance()
      .ajax()
      .get("m/x/mta/lineApi/getLines")
      .then(
        (lines) => {
          let linePromises = [];
          let idlines = [];
          // console.log("its lines :", lines);
          lines.forEach((line) => {
            // console.log('each line',line);
            //kenapa kok ada yang punya path sama point ?
            // console.log('count line ?',line.count)
            //hanya yang punya path dan destination aja yang dibikin graph lainnya gak usah
            if (parseInt(line.count)) {
              Graph.lines.set(line.idline, line);
              linePromises.push(
                Core.instance()
                  .ajax()
                  .get(`m/x/mta/lineApi/getLine/${line.idline}`)
              );
              idlines.push(line.idline);
            }
          });
          Promise.all(linePromises).then(
            (linepoints) => {
              // console.log("linepoints", linepoints);
              // console.log("idlines", idlines);
              linepoints.forEach((points) => {
                // console.log('points', points)
                /**bisa di comment */
                var currentDataline = {
                  idline: points[0].idline,
                  name: "-",
                  linecolor: points[0].linecolor,
                  points: points,
                };
                this.allPointsLine.push(points)
                App.drawLineMap(currentDataline);
                /**end bisa di comment */
                Graph.buildLine(idlines.shift(), points);
              });
            },
            (err) => {
              new CoreInfo(err).show();
            }
          );
        },
        (err) => {
          new CoreInfo(err).show();
        }
      );
  }

  static async drawLine(line) {
    // console.log(line);

    if (line.points.length == 0) {
      new CoreInfo("This line has no route.").show();
      return;
    }

    const lineSymbol = {
      path: "M -1,-1 0,-2 0,2 M 0,-2 1,-1",
      strokeOpacity: 0.5,
      scale: 2.5,
    };

    // Create array of points
    let path = [];
    let networkPath = [];

    // Clean all previously created markers
    // App.markers.forEach(marker => marker.setMap(null));
    line.points.at(0).idinterchange = "1";
    line.points.at(-1).idinterchange = "1";
    line.points.forEach((p) => {
      // console.log(p.isStop);
      let pos = new google.maps.LatLng(p.lat, p.lng);
      pos.idpoint = p.idpoint;
      pos.isStop = parseInt(p.stop);
      path.push(pos);

      // if (!parseInt(p.stop)) return;
      // Draw marker on Map
      if (!App.markers.has(p.idpoint)) {
        // if (parseInt(p.idinterchange) || parseInt(p.stop)) {
        //   var marker = new google.maps.Marker({
        //     position: new google.maps.LatLng(p.lat, p.lng),
        //     map: App.map,
        //     icon: parseInt(p.idinterchange) ? App.interchangeIcon : (parseInt(p.stop) ? App.stopIcon : App.pointIcon),
        //     idline: line.idline,
        //     idpoint: p.idpoint,
        //     isStop: parseInt(p.stop) ? true : false,
        //     title: line.idline + ":" + line.name
        //   });
        //   // Add marker to marker list
        //   App.markers.set(p.idpoint, marker);
        // }
      } else App.markers.get(p.idpoint).setMap(App.map);
    });

    let pp = null;
    line.path.forEach((p) => {
      let pos = new google.maps.LatLng(p.lat, p.lng);
      pos.idpoint = p.idpoint;
      pos.isStop = parseInt(p.stop);
      pos.distance = p.distance;
      networkPath.push(pos);

      let pv = pp != null ? p.sources.get(pp.idpoint) : null;

      if (parseInt(p.idinterchange) || parseInt(p.stop)) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(p.lat, p.lng),
          map: App.map,
          icon: parseInt(p.idinterchange)
            ? App.interchangeIcon
            : parseInt(p.stop)
            ? App.stopIcon
            : App.pointIcon,
          idline: line.idline,
          idpoint: p.idpoint,
          isStop: parseInt(p.stop) ? true : false,
          title:
            line.idline +
            ":" +
            line.name +
            " d:" +
            (pv != null ? pv.distance : 0) +
            " i:" +
            p.idinterchange +
            " id:" +
            p.idpoint,
        });
        // Add marker to marker list
        App.markers.set(p.idpoint, marker);
      }

      pp = p;
    });

    // Draw current polyline
    if (!App.polylines.has(line.idline)) {
      let poly = new google.maps.Polyline({
        path: path,
        strokeColor: line.linecolor,
        strokeOpacity: 0.5,
        strokeWeight: 5,
        idline: line.idline,
        // editable: true,
        // strokeOpacity: 0,
        // icons: [
        //   {
        //     icon: lineSymbol,
        //     offset: "0",
        //     repeat: "20px",
        //   },
        // ]
      });
      // poly.setMap(App.map);

      App.focusTo(poly);

      poly.getPath().addListener("set_at", (index, vertex) => {
        let p = poly.getPath().getAt(index);
        Object.entries(vertex).forEach(([key, val], index) => {
          if (typeof val != "function") p[key] = vertex[key];
        });
        if (p.isStop)
          App.markers
            .get(p.idpoint)
            .setPosition(new google.maps.LatLng(p.lat(), p.lng()));
      });
      poly.addListener("dblclick", (e) => {
        poly.setEditable(!poly.getEditable());
        e.stop();
      });
      poly.addListener("contextmenu", (e) => {
        if (poly.getEditable() && e.vertex) {
          if (!poly.getPath().getAt(e.vertex).isStop)
            poly.getPath().removeAt(e.vertex);
        } else if (!poly.getEditable()) {
          $("#mta-poly-context")
            .css("top", e.domEvent.clientY)
            .css("left", e.domEvent.clientX)
            .show();
          $("#btn-save-line").attr("data-id", poly.idline);
        }
      });

      App.polylines.set(line.idline, poly);
    } else {
      App.polylines.get(line.idline).setMap(App.map);
      App.focusTo(App.polylines.get(line.idline));
    }

    // Draw current network polyline
    if (App.networkPolylines.has(line.idline)) {
      App.networkPolylines.get(line.idline).setMap(null);
      App.networkPolylines.delete(line.idline);
    }

    if (!App.networkPolylines.has(line.idline)) {
      let poly = new google.maps.Polyline({
        path: networkPath,
        strokeColor: line.linecolor,
        // strokeOpacity: 0.5,
        // strokeWeight: 5,
        idline: line.idline,
        // editable: true,
        strokeOpacity: 0,
        icons: [
          {
            icon: lineSymbol,
            offset: "0",
            repeat: "20px",
          },
        ],
      });
      poly.setMap(App.map);
      App.networkPolylines.set(line.idline, poly);
    } else {
      App.networkPolylines.get(line.idline).setMap(App.map);
    }
  }

  static async drawLineMap(line) {
    // console.log(line);

    if (line.points.length == 0) {
      new CoreInfo("This line has no route.").show();
      return;
    }

    const { Point } = await google.maps.importLibrary("core");
    // const lineSymbol = {
    //   path: "M 0,-2 0,2",
    //   strokeOpacity: 1,
    //   scale: 3,
    // };
    const lineSymbol = {
      path: "M -1,-1 0,-2 0,2 M 0,-2 1,-1",
      strokeOpacity: 0.5,
      scale: 2.5,
    };

    App.pointIcon = {
      path: "M-4,0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0",
      fillColor: line.linecolor,
      fillOpacity: 0.5,
      anchor: new Point(0, 0),
      strokeWeight: 0,
    };
    App.stopIcon = {
      path: "M -6,-6 v 12 h 12 v -12 z",
      fillColor: "#FFFFFF",
      fillOpacity: 1,
      anchor: new Point(0, 0),
      strokeWeight: 3,
      strokeColor: line.linecolor,
    };

    // Create array of points
    let path = [];

    // Clean all previously created markers
    // App.markers.forEach(marker => marker.setMap(null));

    line.points.forEach((p) => {
      // console.log(p.idpoint);
      let pos = new google.maps.LatLng(p.lat, p.lng);
      pos.idpoint = p.idpoint;
      pos.isStop = parseInt(p.stop);
      path.push(pos);

      // if (!parseInt(p.stop)) return;
      // Draw marker on Map
      if (!App.markers.has(p.idpoint)) {
        if (parseInt(p.stop)) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(p.lat, p.lng),
            map: App.map,
            icon: parseInt(p.stop) ? App.stopIcon : App.pointIcon,
            idline: line.idline,
            idpoint: p.idpoint,
            isStop: parseInt(p.stop) ? true : false,
            title: `idline:${line.idline}, idpoints: ${p.idpoint}`,
          });
          // var markerAco = new google.maps.Marker({
          //   position: new google.maps.LatLng(p.lat, p.lng),
          //   map: App.mapAco,
          //   icon: parseInt(p.stop) ? App.stopIcon : App.pointIcon,
          //   idline: line.idline,
          //   idpoint: p.idpoint,
          //   isStop: parseInt(p.stop) ? true : false,
          //   title: line.idline + ":" + line.name
          // });
          // Add marker to marker list
          App.markers.set(p.idpoint, marker);
          // App.markers.set(p.idpoint, markerAco);
        }
      } else {
        App.markers.get(p.idpoint).setMap(App.map);
        // App.markers.get(p.idpoint).setMap(App.mapAco);
      }
    });

    // Draw current polyline
    if (!App.polylines.has(line.idline)) {
      let poly = new google.maps.Polyline({
        path: path,
        strokeColor: line.linecolor,
        // strokeOpacity: 0.5,
        strokeWeight: 5,
        idline: line.idline,
        // editable: true,
        strokeOpacity: 0,
        icons: [
          {
            icon: lineSymbol,
            offset: "0",
            repeat: "20px",
          },
        ],
      });
      let polyAco = new google.maps.Polyline({
        path: path,
        strokeColor: line.linecolor,
        strokeOpacity: 0.5,
        strokeWeight: 5,
        idline: line.idline,
        // editable: true,
        // strokeOpacity: 0,
        // icons: [
        //   {
        //     icon: lineSymbol,
        //     offset: "0",
        //     repeat: "20px",
        //   },
        // ]
      });
      poly.setMap(App.map);
      // polyAco.setMap(App.mapAco);

      App.focusTo(poly);
      App.focusTo(polyAco);

      poly.getPath().addListener("set_at", (index, vertex) => {
        let p = poly.getPath().getAt(index);
        Object.entries(vertex).forEach(([key, val], index) => {
          if (typeof val != "function") p[key] = vertex[key];
        });
        if (p.isStop)
          App.markers
            .get(p.idpoint)
            .setPosition(new google.maps.LatLng(p.lat(), p.lng()));
        // console.log(p, vertex);
      });
      poly.addListener("dblclick", (e) => {
        poly.setEditable(!poly.getEditable());
        e.stop();
      });
      poly.addListener("contextmenu", (e) => {
        if (poly.getEditable() && e.vertex) {
          // console.warn(poly.getPath().getAt(e.vertex));
          if (!poly.getPath().getAt(e.vertex).isStop)
            poly.getPath().removeAt(e.vertex);
        } else if (!poly.getEditable()) {
          $("#mta-poly-context")
            .css("top", e.domEvent.clientY)
            .css("left", e.domEvent.clientX)
            .show();
          $("#btn-save-line").attr("data-id", poly.idline);
        }
      });

      App.polylines.set(line.idline, poly);
    } else {
      App.polylines.get(line.idline).setMap(App.map);
      // App.polylines.get(line.idline).setMap(App.mapAco);
      App.focusTo(App.polylines.get(line.idline));
    }
  }

  static focusTo(poly) {
    var bounds = new google.maps.LatLngBounds();
    var points = poly.getPath().getArray();
    for (var n = 0; n < points.length; n++) bounds.extend(points[n]);
    if (points.length > 0) App.map.fitBounds(bounds);
  }

  static buildNavigationSteps(destination, pathSteps) {
    let color = null;
    let idline = null;
    let path = [];
    pathSteps.push(destination);
    App.steps = [];
    App.stepPolylines.forEach((polyline, k) => {
      polyline.setMap(null);
      App.stepPolylines.delete(k);
    });
    App.markers.forEach((marker, key) => {
      marker.setMap(null);
      App.markers.delete(key);
    });
    for (let i = 0; i < pathSteps.length; i++) {
      let step = pathSteps[i]; // console.log(step);
      if (idline == null) {
        color = step.linecolor;
        idline = step.idline;
        path.push({
          idpoint: step.idpoint,
          lat: parseFloat(step.lat),
          lng: parseFloat(step.lng),
        });
        App.steps.push({
          type: "walk",
          from: {
            lat: App.startMarker.position.lat(),
            lng: App.startMarker.position.lng(),
          },
          to: { lat: parseFloat(step.lat), lng: parseFloat(step.lng) },
        });
        continue;
      } else {
        if (step.idline == idline) {
          path.push({
            idpoint: step.idpoint,
            lat: parseFloat(step.lat),
            lng: parseFloat(step.lng),
          });
          continue;
        } else {
          let prevStep = App.steps[App.steps.length - 1];
          if (prevStep.type == "line") {
            App.steps.push({
              type: "walk",
              from: prevStep.to,
              to: path[0],
            });
          }
          let line = Graph.lines.get(idline);
          let p = [];
          let draw = false;
          line.points.forEach((point) => {
            if (point.idpoint == path[0].idpoint) draw = true;
            if (draw) {
              p.push({
                lat: parseFloat(point.lat),
                lng: parseFloat(point.lng),
              });
            }
            if (point.idpoint == path[path.length - 1].idpoint) draw = false;
          });
          App.steps.push({
            type: "line",
            idline: idline,
            strokeColor: color,
            from: path[0],
            to: path[path.length - 1],
            distance: Graph.pathDistance(p),
          });

          color = step.linecolor;
          idline = step.idline;
          path = [];
          path.push({
            idpoint: step.idpoint,
            lat: parseFloat(step.lat),
            lng: parseFloat(step.lng),
          });
        }
      }
    }
    if (path.length) {
      let prevStep = App.steps[App.steps.length - 1];
      if (prevStep.type == "line") {
        App.steps.push({
          type: "walk",
          from: prevStep.to,
          to: path[0],
        });
      }
      let line = Graph.lines.get(idline);
      let p = [];
      let draw = false;
      line.points.forEach((point) => {
        if (point.idpoint == path[0].idpoint) draw = true;
        if (draw) {
          p.push({
            lat: parseFloat(point.lat),
            lng: parseFloat(point.lng),
          });
        }
        if (point.idpoint == path[path.length - 1].idpoint) draw = false;
      });
      App.steps.push({
        type: "line",
        idline: idline,
        strokeColor: color,
        from: path[0],
        to: path[path.length - 1],
        distance: Graph.pathDistance(p),
      });
      prevStep = App.steps[App.steps.length - 1];
      if (prevStep.type == "line") {
        App.steps.push({
          type: "walk",
          from: App.steps[App.steps.length - 1].to,
          to: {
            lat: App.endMarker.position.lat(),
            lng: App.endMarker.position.lng(),
          },
        });
      }
    }
    return App.steps;
  }

  static buildNavigationStepsAco(destination, bestPath){
    let color = null;
    let idline = null;
    let path = [];
    pathSteps.push(destination);
    App.steps = [];
    App.stepPolylines.forEach((polyline, k) => {
      polyline.setMap(null);
      App.stepPolylines.delete(k);
    });
  }

  static drawWalkingPath(walkPath) {
    let walkPoly = new google.maps.Polyline({
      path: walkPath,
      strokeColor: "#777",
      strokeOpacity: 0,
      strokeWeight: 5,
      icons: [
        {
          icon: App.lineSymbol,
          offset: "0",
          repeat: "13px",
        },
      ],
      map: App.map,
    });
    return walkPoly;
  }

  static drawNavigationPath(steps) {
    // console.log(steps);

    App.highResStepPolylines.forEach((polyline) => polyline.setMap(null));
    App.highResStepPolylines = [];

    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      switch (step.type) {
        case "walk":
          let walkPoly = App.drawWalkingPath([step.from, step.to]);
          App.highResStepPolylines.push(walkPoly);
          break;
        case "line":
          if (step.from.idpoint === step.to.idpoint) break;
          let strokeColor = step.strokeColor;
          let idline = step.idline;
          let line = Graph.lines.get(idline);
          let path = [];
          let draw = false;
          line.points.forEach((point) => {
            if (point.idpoint == step.from.idpoint) draw = true;
            if (draw) {
              path.push({
                lat: parseFloat(point.lat),
                lng: parseFloat(point.lng),
              });
            }
            if (point.idpoint == step.to.idpoint) draw = false;
          });
          var startMarker = new google.maps.Marker({
            position: new google.maps.LatLng(step.from.lat, step.from.lng),
            map: App.map,
            icon: App.interchangeIcon,
            idline: idline,
            idpoint: step.from.idpoint,
            title: "id:" + step.from.idpoint,
          });
          var endMarker = new google.maps.Marker({
            position: new google.maps.LatLng(step.to.lat, step.to.lng),
            map: App.map,
            icon: App.interchangeIcon,
            idline: idline,
            idpoint: step.to.idpoint,
            title: "id:" + step.to.idpoint,
          });
          // console.log(startMarker, endMarker);
          App.markers.set(step.from.idpoint, startMarker);
          App.markers.set(step.to.idpoint, endMarker);
          let highResPoly = new google.maps.Polyline({
            path: path,
            strokeColor: strokeColor,
            strokeOpacity: 0.5,
            strokeWeight: 5,
            idline: idline,
            map: App.map,
          });
          App.highResStepPolylines.push(highResPoly);
          break;
      }
    }
  }

  static displayNavigationPath(steps) {
    // steps
    let content = "";
    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      switch (step.type) {
        case "walk":
          let d = Graph.distance(step.from, step.to);
          content += `<div class="p-3 border-start border-5">`;
          content += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="12"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z"/></svg>`;
          content += `<span class="ms-3">Walk ${parseInt(
            d
          )} meters</span></div>`;
          break;
        case "line":
          let line = Graph.lines.get(step.idline);
          // console.log(step, line);
          let towards =
            line.direction === "O"
              ? line.name[line.name.length - 1]
              : line.name[0];
          content += `<div class="p-3 border-start border-5" style="border-color:${line.linecolor} !important">`;
          content += `<i class="bi bi-bus-front-fill me-3"></i>`;
          content += `Ride ${line.name} towards ${towards} <br>`;
          content += `${step.distance} m`;
          content += `</div>`;
          break;
      }
    }
    $("#mta-navigation .navigation-content").html(content);
    new CoreWindow("#mta-navigation", { draggable: true }).show();
  }
}

class Graph {
  static lines = new Map();
  static interchanges = new Map();
  static points = new Map();
  static pathPoints = new Map();
  static oneMeterInDegree = 0.00000898448;

  static buildLine(idline, points) {
    let line = Graph.lines.get(idline);
    line.points = points;
    line.path = Graph.createPath(points);
    for (let i = 0; i < line.points.length; i++)
      Graph.points.set(line.points[i].idpoint, line.points[i]);
    for (let i = 0; i < line.path.length; i++)
      Graph.pathPoints.set(line.path[i].idpoint, line.path[i]);
  }

  static buildInterconnections() {
    Graph.interchanges.forEach((ic) => {
      let pics = [];
      ic.forEach((pic) => pics.push(Graph.pathPoints.get(pic)));
      pics.forEach((picSource) => {
        pics.forEach((picDestination) => {
          if (picSource == undefined || picDestination == undefined) return;
          if (picSource.idpoint === picDestination.idpoint) return;
          picSource.destinations.set(picDestination.idpoint, {
            cost: 4000,
            distance:
              Math.sqrt(
                Math.pow(
                  parseFloat(picSource.lat) - parseFloat(picDestination.lat),
                  2
                ) +
                  Math.pow(
                    parseFloat(picSource.lng) - parseFloat(picDestination.lng),
                    2
                  )
              ) / Graph.oneMeterInDegree,
          });
          picDestination.sources.set(picSource.idpoint, {
            cost: 4000,
            distance:
              Math.sqrt(
                Math.pow(
                  parseFloat(picSource.lat) - parseFloat(picDestination.lat),
                  2
                ) +
                  Math.pow(
                    parseFloat(picSource.lng) - parseFloat(picDestination.lng),
                    2
                  )
              ) / Graph.oneMeterInDegree,
          });
        });
      });
    });
  }

  static createPath(points) {
    let path = [],
      prevPoint = null;
    let distance = 0;
    // console.log('createPath and point obect', points)
    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      if (prevPoint == null) {
        point.destinations = new Map();
        point.sources = new Map();
        point.cost = {
          distance: Number.MAX_VALUE,
          cost: Number.MAX_VALUE,
        };
        point.cheapestPath = [];
        path.push(point);
        prevPoint = point;
        continue;
      }
      distance += Graph.distance(point, prevPoint) / Graph.oneMeterInDegree;
      if (point.idinterchange || i == points.length - 1 || point.isStop) {
        point.cost = {
          distance: Number.MAX_VALUE,
          cost: Number.MAX_VALUE,
        };
        point.destinations = new Map();
        point.sources = new Map();
        point.sources.set(path[path.length - 1].idpoint, {
          cost: 0,
          distance: distance,
        });
        point.cheapestPath = [];
        let pvPoint = path[path.length - 1];
        pvPoint.destinations.set(point.idpoint, {
          cost: 0,
          distance: distance,
        });
        path.push(point);
        distance = 0;
      }
      prevPoint = point;
    }
    return path;
  }

  static distance(pointA, pointB) {
    return (
      Math.sqrt(
        Math.pow(pointA.lat - pointB.lat, 2) +
          Math.pow((pointA.lng ?? pointA.long) - (pointB.lng ?? pointB.long), 2)
      ) / Graph.oneMeterInDegree
    );
  }

  static pathDistance(path) {
    let d = 0;
    let pp = null;
    path.forEach((p) => {
      if (pp == null) {
        pp = p;
        return;
      }
      d += Graph.distance(pp, p);
      pp = p;
    });
    return d;
  }

  static getNearestPoint(point) {
    let distance = Number.MAX_VALUE;
    let nearestPoint = null;
    Graph.points.forEach((p, k) => {
      let d = Graph.distance(p, point);
      if (d < distance) {
        distance = d;
        nearestPoint = p;
      }
    });
    return nearestPoint;
  }
}

class Dijkstra {
  static visited = new Set();
  static unvisited = new Set();

  static getCheapestPath(source) {
    memoryCollect[indexContent].push(performance.memory.usedJSHeapSize);
    Dijkstra.visited = new Set();
    Dijkstra.unvisited = new Set();
    source.cost = {
      cost: 0,
      distance: 0,
    };
    // console.log("source", source);
    Dijkstra.unvisited.add(source);
    // console.log("unvisited", Dijkstra.unvisited.size);
    // console.log("pathPoints", Graph.pathPoints);
    while (Dijkstra.unvisited.size > 0) {
      let current = Dijkstra.getMinimumCostPoint(Dijkstra.unvisited);
      memoryCollect[indexContent].push(performance.memory.usedJSHeapSize);
      pointCollectDj[indexContent] += 1;
      // console.log("current", current);
      current.destinations.forEach((dest, key) => {
        let nextPoint = Graph.pathPoints.get(key);
        // console.log('dest', dest);
        // console.log('key', key);
        // console.log("nextPoint", nextPoint);
        if (nextPoint == undefined) {
          // console.log("undefined");
          console.log(key, current, dest, Graph.pathPoints);
        }
        if (!Dijkstra.visited.has(nextPoint)) {
          pointCollectDj[indexContent] += 1
          // console.log("calculate min price");
          Dijkstra.calculateMinPrice(nextPoint, dest, current);
          Dijkstra.unvisited.add(nextPoint);
          memoryCollect[indexContent].push(performance.memory.usedJSHeapSize);
        }
      });
      Dijkstra.unvisited.delete(current);
      memoryCollect[indexContent].push(performance.memory.usedJSHeapSize);
      Dijkstra.visited.add(current);
      memoryCollect[indexContent].push(performance.memory.usedJSHeapSize);
    }
  }

  static getMinimumCostPoint(unvisited, by = "COST") {
    let minimumCost = {
      cost: Number.MAX_VALUE,
      distance: Number.MAX_VALUE,
    };
    let lowestPoint = null;
    switch (by) {
      case "COST":
        unvisited.forEach((point) => {
          if (point.cost.cost < minimumCost.cost) {
            minimumCost = point.cost;
            lowestPoint = point;
          }
        });
        return lowestPoint;
        break;
    }
  }

  static calculateMinPrice(evPoint, edgeCost, currentPoint) {
    let sourceCost = currentPoint.cost;
    // console.warn(evPoint, edgeCost, currentPoint);
    // console.error(sourceCost.cost, edgeCost.cost, evPoint.cost.cost);
    if (sourceCost.cost + edgeCost.cost < evPoint.cost.cost) {
      evPoint.cost.cost = sourceCost.cost + edgeCost.cost;
      evPoint.cheapestPath = [];
      currentPoint.cheapestPath.forEach((p) => {
        evPoint.cheapestPath.push(p);
      });
      evPoint.cheapestPath.push(currentPoint);
    }
  }
}

$(async () => {
  App.initMap();
  const { Point } = await google.maps.importLibrary("core");
  // App.pointIcon = {
  //   path: "M-4,0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0",
  //   fillColor: line.linecolor,
  //   fillOpacity: .5,
  //   anchor: new Point(0,0),
  //   strokeWeight: 0,
  // }
  // App.stopIcon = {
  //   path: "M -6,-6 v 12 h 12 v -12 z",
  //   fillColor: '#FFFFFF',
  //   fillOpacity: 1,
  //   anchor: new Point(0,0),
  //   strokeWeight: 3,
  //   strokeColor: line.linecolor
  // }
  var waktuMulai = performance.now();
  App.interchangeIcon = {
    path: "M-6,0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0",
    fillColor: "#FFFFFF",
    fillOpacity: 1,
    anchor: new google.maps.Point(0, 0),
    strokeWeight: 4,
    strokeColor: "#000",
    strokeOpacity: 0.5,
    // scale: 1
  };
  App.lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 3,
  };
  App.getLines();
  // var waktuSelesai = performance.now();
  // var waktu = waktuSelesai - waktuMulai
  // console.log('waktu',waktu)
  dataCollect[indexContent] = [];
  memoryCollect[indexContent] = []
  memoryCollectAco[indexContent] = []
  $("#mta-nav .btn-dijkstra").on("click", (e) => {
    try {
        gc();
      } catch(e) {
        
      }

    pointCollectDj[indexContent] = 0;
    pointCollectAco[indexContent] = 0;
    jumlahTitikPersemut[indexContent] = [];
    pointDuplicateCollectAco[indexContent] = 0;
    // console.log("start bro");
    var waktuMulai = performance.now();
    var startMemoryUsage = performance.memory.usedJSHeapSize;

    if (App.startMarker == null || App.endMarker == null) {
      new CoreInfo(
        "Please select start and stop location, by putting markers on a map."
      ).show();
      return;
    }

    let source = Graph.getNearestPoint({
      lat: App.startMarker.position.lat(),
      lng: App.startMarker.position.lng(),
    });
    let destination = Graph.getNearestPoint({
      lat: App.endMarker.position.lat(),
      lng: App.endMarker.position.lng(),
    });

    // include source and destination point as stops
    source.isStop = true;
    destination.isStop = true;
    destination.cost = {
      cost: Number.MAX_VALUE,
      distance: Number.MAX_VALUE,
    };
    // re-create Graph with source and destination points included
    // console.log(Graph.lines);
    Graph.lines.forEach((line) => {
      // console.log("recreate graph line :", line);
      line.path = Graph.createPath(line.points);
      // console.log("Created graph line :", line);
    });
    // // include source and destinations in path analysis
    Graph.pathPoints.set(source.idpoint, source);
    Graph.pathPoints.set(destination.idpoint, destination);
    Graph.buildInterconnections();

    // App.drawLine(Graph.lines.get(source.idline));
    // App.drawLine(Graph.lines.get(destination.idline));
    // console.log("start marker", [
    //   {
    //     lat: App.startMarker.position.lat(),
    //     lng: App.startMarker.position.lng(),
    //   },
    // ]);
    // console.log("end marker", [
    //   {
    //     lat: App.endMarker.position.lat(),
    //     lng: App.endMarker.position.lng(),
    //   },
    // ]);
    // console.log("S:", source);
    // console.log("D:", destination);
    // var sourceAco = source

    Dijkstra.getCheapestPath(source);
    // console.log(
    //   "Graph.pathPoints.get(destination.idpoint)",
    //   Graph.pathPoints.get(destination.idpoint)
    // );
    // console.log(
    //   "graph path points cheapetstPath ",
    //   Graph.pathPoints.get(destination.idpoint).cheapestPath
    // );
    let steps = App.buildNavigationSteps(
      destination,
      Graph.pathPoints.get(destination.idpoint).cheapestPath
    );
    console.log("steps:", steps);
    var stepsDistance = 0;
    $.each(steps, function (index, value) { 
       stepsDistance += Graph.distance(value.from, value.to)
    });
    
    // console.log('stepDistance', stepsDistance)
    /** jangan lupa di uncomment */
    // remove source and destination points from Graph
    // if it is not a point in an interchange.
    // delete source.isStop;
    // delete destination.isStop;
    // if (!parseInt(source.idinterchange) > 0)
    //   Graph.pathPoints.delete(source.idpoint);
    // if (!parseInt(destination.idinterchange) > 0)
    //   Graph.pathPoints.delete(destination.idpoint);

    // App.drawNavigationPath(steps);
    // App.displayNavigationPath(steps);
    var endMemoryUsage = Math.max(...memoryCollect[indexContent]);
    var waktuSelesai = performance.now();
    
    var lamaWaktu = waktuSelesai - waktuMulai;
    memoryCollect[indexContent].push(endMemoryUsage);
    var rateMemory = memoryCollect[indexContent].reduce((a, b) => a + b, 0) / memoryCollect[indexContent].length
    
    /**ACO */
    // Example usage with the provided data and settings
    // console.log("start ACO");
    
    var waktuMulaiAco = performance.now();
    var startMemoryUsageAco = performance.memory.usedJSHeapSize;
    // console.log('Graph.pathPoints', Graph.pathPoints)
    // return console.log(Graph.pathPoints.get(source.idpoint))
    /**
     * combine all path
     */
    const combinedArray = [].concat(...App.allPointsLine);
    const antsMap = {};
    const ants =  combinedArray.map(data => {
      const ant = new Ant(
        data.idpoint,
        data.idline,
        data.idinterchange,
        data.destinations ?? [],
        data.lat,
        data.lng,
        data.stop,
        data.sequence
      );
      antsMap[data.idpoint] = ant;
      return ant;
    });
    // console.log(ants)
    // console.log(antsMap)
    const startLat = App.startMarker.position.lat()
    const startLong = App.startMarker.position.lng()
    const endLat = App.endMarker.position.lat()
    const endLong = App.endMarker.position.lng()

    // Settings for the ACO algorithm
    const iterations = 30;
    const evaporationRate = 0.5;
    const depositAmount = 1;

    // return console.log(destination.destinations, Graph.pathPoints.get(destination.idpoint))
    const antColony = new AntColony(
      antsMap,
      startSource = source,
      endSource = destination,
      startLat,
      startLong,
      endLat,
      endLong,
      iterations,
      evaporationRate,
      depositAmount,
      resultDijkstra = Graph.pathPoints.get(destination.idpoint).cheapestPath
      // antsMap
    );

    const bestPath = antColony.run();

    var waktuSelesaiAco = performance.now();
    var endMemoryUsageAco = performance.memory.usedJSHeapSize;
    var rateMemoryAco = memoryCollectAco[indexContent].reduce((a, b) => a + b, 0) / memoryCollectAco[indexContent].length
    var lamaWaktuAco = waktuSelesaiAco - waktuMulaiAco;

    // /**end ACO */
    dataCollect[indexContent].push({
      Dijkstra: {
        jumlahTitik : steps.length,
        titikDilalui: pointCollectDj[indexContent],
        jarak: stepsDistance,
        waktuKomputasi: lamaWaktu,
        memoryStart: startMemoryUsage,
        memoryEnd: endMemoryUsage,
        rateMemory: rateMemory,
        // cost: '',
        // listLIne: []
        // usedJSHeapSize: endMemoryUsage.usedJSHeapSize - startMemoryUsage.usedJSHeapSize,
        // totalJSHeapSize: endMemoryUsage.totalJSHeapSize - startMemoryUsage.totalJSHeapSize,
        // jsHeapSizeLimit: endMemoryUsage.jsHeapSizeLimit - startMemoryUsage.jsHeapSizeLimit,
        // usedJSHeapSize: endMemoryUsage.usedJSHeapSize - startMemoryUsage.usedJSHeapSize,
        // jarakTanpaTitik: Graph.distance(bestPath[0][0],bestPath[0][bestPath[0].length-1]),
        // detail: steps,
      },
      ACO:{
        jumlahTitik: steps.length,
        titikDilalui: pointCollectAco[indexContent],
        jumlahTitikPersemut: jumlahTitikPersemut[indexContent],
        titikDuplicate : pointDuplicateCollectAco[indexContent],
        jarak: stepsDistance,
        waktuKomputasi: lamaWaktuAco,
        memoryStart: startMemoryUsageAco,
        memoryEnd: endMemoryUsageAco,
        rateMemory: rateMemoryAco,
        // usedJSHeapSize: endMemoryUsageAco.usedJSHeapSize - startMemoryUsageAco.usedJSHeapSize,
        // totalJSHeapSize: endMemoryUsageAco.totalJSHeapSize - startMemoryUsageAco.totalJSHeapSize,
        // jsHeapSizeLimit: endMemoryUsageAco.jsHeapSizeLimit - startMemoryUsageAco.jsHeapSizeLimit,
        // usedJSHeapSize: endMemoryUsageAco.usedJSHeapSize - startMemoryUsageAco.usedJSHeapSize,
        // jarakTanpaTitik: Graph.distance(bestPath[0][0],bestPath[0][bestPath[0].length-1]),
        // detail: steps,
      }
    })

    console.log(dataCollect)
    // let stepsAco = App.buildNavigationSteps(
    //   destination,
    //   Graph.pathPoints.get(destination.idpoint).cheapestPath
    // );
    // App.drawNavigationPath(stepsAco);
    try {
        gc();
      } catch(e) {
        
      }
  });

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  function getRandomLat(){
    return getRandomNumber(-8.0229654946782, -7.9427835950051);
  }
  function getRandomLong(){
    return getRandomNumber(112.61007785797, 112.65068113804);
  }
  $('#btn-generateRandom').on('click', function(){
    let dataLatLong = [
      {
        
          start:{
            lat:-7.96089970678129, //percobaan1
            lng: 112.65063788741827 //percobaan1

            // -7.923781372946134, 112.59687267243862 //#4
            // -7.924002534850689, 112.59818628430367 //#5
            // -7.933064093377771, 112.60232325643301 //#6
            // -7.924927030174133, 112.59815711528063 //#7
            // -8.025119469371067, 112.63855822384357 //#8
            // -8.02362051932453, 112.63657841831446 //#9
            // -7.946479402541825, 112.64345694333315 //#10
            
            // lat: -7.991416543162467,
            // lng: 112.6282960930214
            // lat: -7.9414208198425, 
            // lng: 112.64131486416
            // lat: getRandomLat(),
            // lng: getRandomLong()
          },
          end:{
            lat:-7.971795618780245, //percobaan1
            lng: 112.60223139077425 //percobaan1
            // -7,939320862129, 112,62403171509504 //#3
            // -7.933345686545384, 112.65913411974907 //#4
            // -7.925024327872972, 112.6005120947957 //#5
            // -7.933064093377771, 112.60232325643301 //#6
            // -8.025599198616797, 112.63960495591164 //#7
            // -7.933705315275011, 112.933705315275011 //#8
            // -7.924376118879024, 112.5972481817007 //#9
            // -7.981845234119922, 112.6245017722249 //#10



            // lat: -7.9759322351900614,
            // lng: 112.64599230261102
            // lat: -7.9441038621459,
            // lng: 112.6199503988
            // lat: getRandomLat(),
            // lng: getRandomLong()
          },
      },
      {
        start:{
          lat:-7.967760031247459,
          lng: 112.63250514864922 //#2
        },
        end:{
          lat:-7.957399273351381,
          lng: 112.64377009123564 //#2
        }
      },
      {
        start:{
          lat: -7.953136088907187,  //#3
          lng: 112.61433485895395 //#3
        },
        end:{
          lat:-7.939320862129,
          lng: 112.62403171509504 //#3
        }
      },
      {
        start:{
          lat:-7.923781372946134,
          lng: 112.59687267243862 //#4
        },
        end:{
          lat:-7.933345686545384,
          lng: 112.65913411974907 //#4
        }
      },
      {
        start:{
          lat:-7.924002534850689,
          lng: 112.59818628430367 //#5
        },
        end:{
          lat:-7.925024327872972,
          lng: 112.6005120947957 //#5
        }
      },
      {
        start:{
          lat:-7.933064093377771,
          lng: 112.60232325643301 //#6
        },
        end:{
          lat:-7.957399273351381,
          lng: 112.60232325643301 //#6
        }
      }
      // {
      //   start:{
      //     lat:-7.924927030174133,
      //     lng: 112.59815711528063 //#7
      //   },
      //   end:{
      //     lat:-8.025599198616797,
      //     lng: 112.63960495591164 //#7
      //   }
      // },
      // {
      //   start:{
      //     lat:-8.025119469371067,
      //     lng: 112.63855822384357 //#8
      //   },
      //   end:{
      //     lat:-7.933705315275011,
      //     lng: 112.933705315275011 //#8
      //   }
      // },
      // {
      //   start:{
      //     lat:-8.02362051932453,
      //     lng: 112.63657841831446 //#9
      //   },
      //   end:{
      //     lat:-7.924376118879024,
      //     lng: 112.5972481817007 //#9
      //   }
      // },
      // {
      //   start:{
      //     lat:-7.946479402541825,
      //     lng: 112.64345694333315 //#10
      //   },
      //   end:{
      //     lat:-7.981845234119922,
      //     lng: 112.6245017722249 //#10
      //   }
      // }
    ];

    $.each(dataLatLong, function (index, value) {  
      App.getLines();
      App.startMarker = new google.maps.Marker({
            map: App.map,
            position: value.start,
            draggable: true,
          });
      App.endMarker = new google.maps.Marker({
                map: App.map,
                position: value.end,
                draggable: true,
              });
      for (let index = 0; index < 30; index++) {
        $('#btn-clear-map').trigger('click')
        $('.btn-dijkstra').trigger('click')
        // indexTry++;
      }
      indexContent++;
      dataCollect[indexContent] = [];
      memoryCollect[indexContent] = [];
      memoryCollectAco[indexContent] = [];
    });
    // console.log(dataLatLong, App.startMarker, App.endMarker);
  })

  $("#btn-clear-map").on("click", () => {
    App.polylines.forEach((poly) => poly.setMap(null));
    App.markers.forEach((marker) => marker.setMap(null));
    App.markers.clear();
    App.polylines.clear();
  });

  /**
   * ACOO
   */
  function hasDuplicates(array) {
  const valueSet = new Set();
  for (const value of array) {
    if (valueSet.has(value)) {
      // console.log('duplicate', value)
      // return true; // Duplicate found
    }
    valueSet.add(value);
  }
  return false; // No duplicates found
}
  class Ant {
    constructor(idpoint, idline, idinterchange, nextInterchange = [], lat, long, stop, sequence) {
      this.idpoint = idpoint,
      this.idline = idline,
      this.idinterchange = idinterchange,
      this.nextInterchange = nextInterchange,
      this.lat = lat,
      this.long = long,
      this.stop = stop,
      this.sequence = sequence,
      this.visited = false,
      this.prevPath = []
    }

    visit() {
      this.visited = true;
    }

    isVisited() {
      return this.visited;
    }

  //   calculateMinPrice(evPoint, edgeCost, currentPoint) {
  //   let sourceCost = currentPoint.cost;
  //   // console.warn(evPoint, edgeCost, currentPoint);
  //   // console.error(sourceCost.cost, edgeCost.cost, evPoint.cost.cost);
  //   if (sourceCost.cost + edgeCost.cost < evPoint.cost.cost) {
  //     evPoint.cost.cost = sourceCost.cost + edgeCost.cost;
  //     evPoint.cheapestPath = [];
  //     currentPoint.cheapestPath.forEach((p) => {
  //       evPoint.cheapestPath.push(p);
  //     });
  //     evPoint.cheapestPath.push(currentPoint);
  //   }
  // }

    distanceTo(otherAnt) {
      const latDiff = this.lat - otherAnt.lat;
      const longDiff = this.long - otherAnt.long;
      return Math.sqrt((latDiff * latDiff) + (longDiff * longDiff)) /0.00000898448;
    }
  }

  class AntColony {
    constructor(
        ants,
        startSource,
        endSource,
        startLat,
        startLong,
        endLat,
        endLong,
        iterations,
        evaporationRate,
        depositAmount,
        resultDijkstra
        // antsMap
      ) {
        this.ants = ants;
        this.startSource = startSource;
        this.endSource = endSource;
        this.startLat = startLat;
        this.startLong = startLong;
        this.endLat = endLat;
        this.endLong = endLong;
        this.iterations = iterations;
        this.evaporationRate = evaporationRate;
        this.depositAmount = depositAmount;
        this.resultDijkstra = resultDijkstra;
        this.bestPathDijkstra = [];
        this.prevPathAnt = [];

        this.indexMove = 0;
        this.antsPath = {};
        this.pheromoneLevels = {}; // Pheromone levels on edges
        this.initializePheromoneLevels();
        // this.antsMap = antsMap
        this.currentIteration = 0
        this.endLoop = 0;
    }

    // idPointDijkstra(){
    //   return this.resultDijkstra.map(item=>item.idpoint);
    // }

    initializePheromoneLevels() {
        // Initialize pheromone levels on edges to a small positive value
        // You would need to implement this based on your specific graph
        // For simplicity, let's assume a simple representation
        // console.log(this.ants)
        $.each(this.ants, function (key, ant) { 
          // this.pheromoneLevels[ant.idpoint] = [];
          $.each(this.ants, function (index, otherAnt) { 
             if (ant !== otherAnt) {
                  this.pheromoneLevels[ant.idpoint][otherAnt.idpoint] = 0.01;
              }
          });
        });
        
    }

    run() {
        // Implementation of ACO algorithm
        // console.log(this.pheromoneLevels.size)
        memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
        for (let i = 0; i < this.iterations; i++) {
          // console.log('loop------', i)
          this.bestPathDijkstra = [];
          this.prevPathAnt[this.currentIteration] = [];
          this.indexMove = 1;
          // var firstAnt = this.ants.find(ant => ant.idpoint === this.startSource.idpoint);
          var firstAnt = this.ants[this.startSource.idpoint];
          var pathAnt = this.moveAntIteration(firstAnt, i)
          this.resetVisitAnt()
          this.currentIteration += 1;
        }
    }

    moveAntIteration(ant, index = 0){
      memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
      this.indexMove = 0;
      this.endLoop = 0;
      // this.selectNextNode3(ant, ant)
      // outerLoop:
      // ant.visit();
      this.prevPathAnt[this.currentIteration][this.indexMove] = [];
      this.prevPathAnt[this.currentIteration][this.indexMove].push(ant)
      ant.nextInterchange.forEach((value, key) => {
        var currentAnt = this.findAnt(key)
        memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
        if (!jumlahTitikPersemut[indexContent][index]) {
          jumlahTitikPersemut[indexContent][index] = [];
        }
        // console.log('masuk current antnya-' + index);
        jumlahTitikPersemut[indexContent][index].push(currentAnt);
        var nextNode = this.selectNextNode2(currentAnt, index)
        memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
        if(nextNode == false){
          return
        }
        this.indexMove += 1;
        memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
        this.prevPathAnt[this.currentIteration][this.indexMove] = [];
        memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
      })


    }


    //versi2
    selectNextNode2(ant, index){
      memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
      // console.log(this.endLoop, ant.idpoint, this.endSource.idpoint)
      if(this.endLoop == 1){
        return;
      }
      pointCollectAco[indexContent] += 1
      
      this.prevPathAnt[this.currentIteration][this.indexMove].push(ant);
      memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
      if(ant.idpoint == this.endSource.idpoint){
        this.endLoop = 1;
        memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
        return;
      }
      if(ant.visit == true)
        pointDuplicateCollectAco[indexContent] += 1
      ant.visit();
      memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
      // innerLoop:
      //random array
      const nextInterchangeKeys = Array.from(ant.nextInterchange.keys()); // Get keys as an array
      this.shuffleArray(nextInterchangeKeys); // Shuffle the keys
      nextInterchangeKeys.forEach(key => {
        var currentAnt = this.findAnt(key);

        if (!jumlahTitikPersemut[indexContent][index]) {
          jumlahTitikPersemut[indexContent][index] = [];
        }
        // console.log('masuk current antnya-' + index);
        jumlahTitikPersemut[indexContent][index].push(currentAnt);
        memoryCollectAco[indexContent].push(performance.memory.usedJSHeapSize);
        if (currentAnt.visited == false) {
          this.selectNextNode2(currentAnt, index);
        }
      });

    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

    findAnt(idPoint){
      return this.ants[idPoint];
    }


    updatePheromoneLevels() {
        // Update pheromone levels based on ant paths and evaporation
        // ...
        // Modify and implement the pheromone update logic as per your needs
        // ...
        let objectKey, theAnts;
        Object.keys(this.pheromoneLevels).forEach(antId => {
            Object.keys(this.pheromoneLevels[antId]).forEach(otherAntId => {
                this.pheromoneLevels[antId][otherAntId] *= (1 - this.evaporationRate);
                // console.log('this.pheromoneLevels', this.pheromoneLevels)
            });
        });

        // Deposit pheromone on edges of ants' paths
        // $.each(this.prevPathAnt, function (indexInArray, valueOfElement) { 
           
        // });
        this.ants.forEach(ant => {
            // For simplicity, let's assume ant.path is an array of visited nodes
            for (let i = 1; i < ant.prevPath.length; i++) {
                const fromNode = ant.prevPath[i - 1];
                const toNode = ant.prevPath[i];
                this.pheromoneLevels[fromNode.id][toNode.id] += this.depositAmount;
                // console.log('this.pheromoneLevels', this.pheromoneLevels)
            }
        });
        // console.log(objectKey, theAnts)
        return [objectKey, theAnts]
    }

    resetVisitAnt(){
      // this.ants.forEach(ant => {
      //   ant.visited = false;
      // });
      $.each(this.ants, function (key, ant) { 
         ant.visited = false;
      });
    }
}

});
