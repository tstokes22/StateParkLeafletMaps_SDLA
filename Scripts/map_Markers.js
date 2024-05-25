const stateParksLayer = L.layerGroup();
const wildLifeOffice = L.layerGroup();
var parkMakers = [];

var map = L.map("map", {
  center: [44.34552800621869, -100.27982184218317],
  zoom: 8,
  layers: stateParksLayer,
});

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 13,
  minZoom: 8,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

parkLocations.forEach(function (park) {
  var marker = L.marker(park.coordinates, {
    riseOnHover: true, // Enable rise on hover
    icon: L.icon({
      iconUrl: "Images/favIcon-32x32_15.png", // Path to your image file
      iconSize: [24, 24], // Size of the icon
    }),
  })
    .addTo(stateParksLayer)
    .bindPopup(
      "<b>" +
        park.name +
        "</b><br/>" +
        park.address +
        "<br/>" +
        park.phone +
        "<br/>" +
        park.email
    )
    .bindTooltip(park.name, {
      permanent: true,
      direction: "auto",
      opacity: 0.8,
      className: "custom-tooltip",
      offset: L.point(15, 0),
    });
  parkMakers.push(marker);
});

wildLifeOfficeLocations.forEach(function (office) {
  var marker = L.marker(office.coordinates, {
    riseOnHover: true, // Enable rise on hover
    icon: L.icon({
      iconUrl: "Images/favIcon-32x32_15.png", // Path to your image file
      iconSize: [24, 24], // Size of the icon
    }),
  })
    .addTo(wildLifeOffice)
    .bindPopup(
      "<b>" +
        office.name +
        "</b><br/>" +
        office.address +
        "<br/>" +
        office.phone +
        "<br/>"
    )
    .bindTooltip(office.name, {
      permanent: true,
      direction: "auto",
      opacity: 0.8,
      className: "custom-tooltip",
      offset: L.point(15, 0),
    });
});

function style(feature) {
  return {
    fillColor: "#c0c0c0",
    weight: 2,
    opacity: 1,
    color: "#808080",
    fillOpacity: 0.7,
  };
}

const geojson = L.geoJson(statesData, { style: style }).addTo(map);

const overlays = {
  "State Parks": stateParksLayer,
  "Wildlife Office": wildLifeOffice,
};

const layerControl = L.control.layers(overlays).addTo(map);
