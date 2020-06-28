
var map = L.map('mapid').setView([40.45, -3.7], 10);

// tiles - https://leaflet-extras.github.io/leaflet-providers/preview/
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



var workIcon = L.icon({
    iconUrl: 'images/work.png',
    shadowUrl: null,

    iconSize:     [20, 20], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var educationIcon = L.icon({
    iconUrl: 'images/education.png',
    shadowUrl: null,

    iconSize:     [20, 20], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Work: Management solutions
var marker_MS= L.marker([40.449955,  -3.692976], { icon: workIcon }).addTo(map);
var logoMS = '<img src="images/logo_MS.jpg" height="80px" width="150px"/>';

marker_MS.bindPopup("<center> <strong> Management Solutions </strong><center>" + "</br>"
	+ "Data Scientist"  + "</br>"+ "10/17 - Currently"  + "</br>" + logoMS);
marker_MS.on('mouseover', function (e) {
		this.openPopup();
});
marker_MS.on('mouseout', function (e) {
		this.closePopup();
});


// Education: UCM
var marker_UCM = L.marker([40.451008,  -3.726712], { icon: educationIcon }).addTo(map);
var logoUCM = '<img src="images/logo_UCM.png" height="125px" width="140px"/>';

marker_UCM.bindPopup("<center> <strong> Universidad Complutense </strong><center>" + "</br>"
	+ "Grado en Física"  + "</br>"+ "09/12 - 06/16"  + "</br>"+ "</br>" + logoUCM);
marker_UCM.on('mouseover', function (e) {
		this.openPopup();
});
marker_UCM.on('mouseout', function (e) {
		this.closePopup();
});
// Education: IFT - UAM
var marker_UAM = L.marker([40.549795, -3.687286], { icon: educationIcon }).addTo(map);
var logoUAM = '<img src="images/logo_IFT.jpg" height="80px" width="240px"/>';

marker_UAM.bindPopup("<center> <strong> Instituto de Física Teórica - UAM  </strong><center>" + "</br>"
	+ "Máster en Física Teórica"  + "</br>"+ "09/16 - 09/17"  + "</br>"+ "</br>" + logoUAM);
marker_UAM.on('mouseover', function (e) {
		this.openPopup();
});
marker_UAM.on('mouseout', function (e) {
		this.closePopup();
});

// Education: U-TAD
var marker_UTAD = L.marker([40.538836, -3.893387], { icon: educationIcon }).addTo(map);
var logoUTAD = '<img src="images/logo_UTAD.jpg" height=85px" width="150px"/>';

marker_UTAD.bindPopup("<center> <strong> U-TAD  </strong><center>" + "</br>"
	+ "Máster en Big Data & Data Science"  + "</br>"+ "09/19 - 07/20"  + "</br>"+ "</br>" + logoUTAD);
marker_UTAD.on('mouseover', function (e) {
		this.openPopup();
});
marker_UTAD.on('mouseout', function (e) {
		this.closePopup();
});

// Education: ICADE Comillas
var marker_ICADE = L.marker([40.429663, -3.711358], { icon: educationIcon }).addTo(map);
var logoICADE = '<img src="images/logo_ICADE.png" height=55px" width="205px"/>';

marker_ICADE.bindPopup("<center> <strong> ICADE  </strong><center>" + "</br>"
	+ "Máster en Consultoria de Negocio"  + "</br>"+ "10/17 - 07/19"  + "</br>"+ "</br>" + logoICADE);
marker_ICADE.on('mouseover', function (e) {
		this.openPopup();
});
marker_ICADE.on('mouseout', function (e) {
		this.closePopup();
});
