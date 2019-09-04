//GLOBAL VARIABLES
var USER;
var CLASSES;

//Init Firebase
var firebaseConfig = {
	apiKey: "AIzaSyA8anfeOBTQsCqDJyfQatna9Kyzf0xKs88",
	authDomain: "mystudybuddy-6f500.firebaseapp.com",
	databaseURL: "https://mystudybuddy-6f500.firebaseio.com",
	projectId: "mystudybuddy",
	storageBucket: "mystudybuddy.appspot.com",
	messagingSenderId: "748744576391",
	appId: "1:748744576391:web:22efccf84e6637b4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//-------------------------GEOLOATION-----------------------------//
// Set User Location to the Database
function set_user_location(c) {
	var url = "https://us-central1-mystudybuddy.cloudfunctions.net/addUserLoc?loc="+c+"&id="+USER.id;
	$.ajax({
		url: url,
		type: "GET"
	});
	console.log("Added User: "+USER.id+" loc: "+c);
}

//Get List of User Positions from Database
function getUserPositions() {
	console.log("Getting User Positions...")
	var url = "https://us-central1-mystudybuddy.cloudfunctions.net/getUserLocs";
	$.ajax({
		url: url,
		type: "GET",
		success: function(msg) {
			console.log(msg);
		}
	});
}

//-----------------------MAP VIEW------------------------------//
function view_map() {
	console.log("Map");
	$("#MainView").empty();
	$("#MainView").css({'background':'white','padding-left':'0px'});
	//Create Map
	var map = new google.maps.Map(document.getElementById("MainView"),{
		center:{lat:39.9566,lng:-75.1899},
		zoom:16.5,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		streetViewControl:true,styles:[{
			featureType: "administrative",
			stylers: [
			{visibility: "off"}]},{
			featureType: "poi",
			stylers: [
			{visibility: "off"}]},{
			featureType: "transit",
			stylers: [
			{visibility: "off"}]}
		]}
	);
	//Current Location
	if (navigator.geolocation) {
		//Gets the Geolocation of the user
		navigator.geolocation.getCurrentPosition(function(e) {
		//Sets variable "pos" to the current Geolocation
		var pos = {lat: e.coords.latitude,lng: e.coords.longitude};
		//Convert the "pos" to the LatLng positioning type
		var curLoc = new google.maps.LatLng(pos)
		set_user_location(curLoc);
		//Sets the "pos" variable to a map marker "curLoc"
		new google.maps.Marker({map:map,position:curLoc,title:"Location",icon:{path:google.maps.SymbolPath.CIRCLE,scale:5,strokeColor:"#FF0000",strokeWeight:5}});
		});
	}
	var heatMapData = [
		{location: new google.maps.LatLng(39.955,-75.188), weight: 2},
		new google.maps.LatLng(39.955,-75.187),
		new google.maps.LatLng(39.956,-75.189),
		{location: new google.maps.LatLng(39.954,-75.186), weight: 5},
		new google.maps.LatLng(39.955,-75,190),
		{location: new google.maps.LatLng(39.9565,-75.195), weight: 7}
	]
	var heatmap = new google.maps.visualization.HeatmapLayer({
		data: heatMapData
	});
	heatmap.setMap(map);
	getUserPositions();
}

function openSyllabus(val) {
	console.log(val);
	if ($("#class_content").length == 0) {
		$("#MainView").append('<div id="class_content"></div>');
		$("#class_content").html('<object style="height: 60vh;width:100%;" data="'+val+'_Syll.htm"/>');
	} else {
		$("#class_content").html('<object style="height: 60vh;width:100%;" data="'+val+'_Syll.htm"/>');
	}
}

function openCourseDocs(val) {
	console.log(val);
	if ($("#class_content").length == 0) {
		$("#MainView").append('<div id="class_content"></div>');
		$("#class_content").html('<object style="height: 60vh;width:100%;" data="'+val+'_Web.htm"/>');
		$('#class_content').on('click', 'a', function(e) {
			e.preventDefault();
			console.log($(this).attr('href'));
		});
	} else {
		$("#class_content").html('<object style="height: 60vh;width:100%;" data="'+val+'_Web.htm"/>');
	}
}

function openAssign(val) {
	console.log(val);
	if ($("#class_content").length == 0) {
		$("#MainView").append('<div id="class_content"></div>');
		$("#class_content").html('<object style="height: 60vh;width:100%;" data="'+val+'_Syll.htm"/>');
	} else {
		$("#class_content").html('<object style="height: 60vh;width:100%;" data="'+val+'_Syll.htm"/>');
	}
}

function openWebsite(val) {
	console.log(val);
	if ($("#class_content").length == 0) {
		$("#MainView").append('<div id="class_content"></div>');
		$("#class_content").html('<object style="height: 60vh;width:100%;" data="'+val+'_Web.htm"/>');
	} else {
		$("#class_content").html('<object style="height: 60vh;width:100%;" data="'+val+'_Web.htm"/>');
	}
}

//----------------------CLASS VIEW---------------------------//
function view_classes() {
	console.log("Classes");
	$("#MainView").empty();
	$("#MainView").css({'background':'var(--powder)','padding-left':'10px'});
	$("#MainView").append('<h2>Select a Class</h2>');
	$("#MainView").append('<select id="class_sel"></select>');
	//get_classes(); //Get Classes from DB
	var class_arr = [
		{val : 1, text: 'CS 260'},
		{val : 2, text: 'MATH 200'},
		{val : 3, text: 'MATH 221'},
		{val : 4, text: 'STAT 201'},
		{val : 5, text: 'COM 230'},
		{val : 6, text: 'CS 275'}
	];
	var sel = $('#class_sel');
	$(class_arr).each(function() {
		sel.append('<option value="'+this.val+'">'+this.text+'</option>');
	});
	var val;
	val = $("#class_sel").val();
	$("#MainView").append("<br><br>");
	var button_arr = [
		{text : 'Syllabus', link : 'openSyllabus("'+val+'")'},
		{text : 'Course Docs', link : 'openCourseDocs("'+val+'")'},
		{text : 'Assignments', link : 'openAssign("'+val+'")'},
		{text : 'Website', link : 'openWebsite("'+val+'")'}
	];
	$(button_arr).each(function() {
		$("#MainView").append($("<button>").attr({'onclick':this.link,'class':'class_btn'}).text(this.text));
	});
}

//--------------------HOMEWORK VIEW--------------------------//
function view_homework() {
	console.log("Homework");
	$("#MainView").empty();
	$("#MainView").css({'background':'var(--powder)','padding-left':'10px'});
	$("#MainView").html("<h1>Homework</h1>");
	$("#MainView").append('<h2>Select a Class</h2>');
	$("#MainView").append('<select id="class_sel"></select>');
	//get_classes(); //Get Classes from DB
	var class_arr = [
		{val : 1, text: 'CS 260'},
		{val : 2, text: 'MATH 200'},
		{val : 3, text: 'MATH 221'},
		{val : 4, text: 'STAT 201'},
		{val : 5, text: 'COM 230'},
		{val : 6, text: 'CS 275'}
	];
	var sel = $('#class_sel');
	$(class_arr).each(function() {
		sel.append('<option value="'+this.val+'">'+this.text+'</option>');
	});
	$("#MainView").append('<div id="homework_content"></div>');
	$("#MainView").append('<div id="view_content"><div>');
	var hc = $("#homework_content");
	var vc  =$("#view_content");
	hc.html("<h1>Looks like this class doesn't have any homework!</h1>");
	sel.on('change',function() {
		if (sel.val() == 1) {
			hc.html("<h1>Looks like this class doesn't have any homework!</h1>");
		} else if (sel.val() == 2) {
			hc.html("<h1>Looks like this class doesn't have any homework!</h1>");
		} else if (sel.val() == 3) {
			hc.empty();
			hc.append('<h4><a href="W1HW.pdf">HW1</a></h4>');
			hc.append('<h4><a href="W2HW.pdf">HW2</a></h4>');
			hc.append('<h4><a href="W3HW.pdf">HW3</a></h4>');
			hc.append('<h4><a href="">HW4</a></h4>');
			hc.append('<h4><a href="">HW5</a></h4>');
			hc.append('<h4><a href="">HW6</a></h4>');
			hc.append('<h4><a href="">HW7</a></h4>');
			hc.append('<h4><a href="">HW8</a></h4>');
			hc.append('<h4><a href="">HW9</a></h4>');
			hc.append('<h4><a href="">HW10</a></h4>');
		} else if (self.val() == 4) {

		}
	})
	
}

//----------------------MODALS--------------------------------//
function open_modal() {
    $("#user_modal").css({"display":"block"});
    console.log("Add User Clicked");
}
function close_modal() {
    $("#user_modal").css({"display":"none"});
}
function view_user() {
    $("#current_user_modal").css({"display":"block"});
    console.log("Log In User Clicked");
}
function close_current_modal() {
    $("#current_user_modal").css({"display":"none"});
}

//----------------------ADD USER-----------------------------//
function add_user() {
	console.log("New User...");
	
	var email = document.getElementById("email").value;
	var firstName = document.getElementById("firstName").value;
	var id = document.getElementById("id").value;
	var lastName = document.getElementById("lastName").value;
	var password = document.getElementById("password").value;
	var username = document.getElementById("username").value;
	
	var URL = "https://us-central1-mystudybuddy.cloudfunctions.net/addUser?" + "email=" + email + "&firstName=" + firstName +
		"&id=" + id + "&lastName=" + lastName + "&password=" + password + "&username=" + username;
	
	$.ajax({
		type: "GET",
		url: URL,
		contentType: "application/json; charset=utf-8",
		data: "{}",
		dataType: "html",
		success: function(msg) {
			close_modal();
		},
		error: function(xhr, ajaxOptions, thrownError) {
			//$("#content").html("<p>Error fetching " + URL + "</p>");
		}
	});
}

//----------------------GET CURRENT USER----------------------------//
function setUserGlobal(u) {
	USER = u;
	console.log(USER);
}

function get_user() {
	console.log("Get User...");
	
	//must keep track of username, firstName, lastName, id
	var URL = "https://us-central1-mystudybuddy.cloudfunctions.net/getUser?" + "username=" + $("#username").val() + "&password=" + $("#password").val();
	$.ajax({
		type: "GET",
		url: URL,
		/*
		contentType: "application/json; charset=utf-8",
		data: "{}",
		dataType: "jsonp",
		*/
		success: function(msg) {
			setUserGlobal(msg);
			close_current_modal();
			$("#view_user_btn").html("Hello, "+msg.firstName);
		},
		error: function(xhr, ajaxOptions, thrownError) {
			//$("#content").html("<p>Error fetching " + URL + "</p>");
		}
	});
	//console.log(USER.id);
	//return USER;
}

//----------------------GET CLASSES------------------------//
function setClassesGlobal(c) {
	CLASSES = c;
}

function get_classes() {
	console.log("Get Classes...");
	var CLASSES;
	var id;
	if (USER) {
		id = USER.id;
	} else {
		id = null;
	}
	
	var URL = "https://us-central1-mystudybuddy.cloudfunctions.net/getClasses?" + "id=" + id;
	$.ajax({
		type: "GET",
		url: URL,
		/*
		contentType: "application/json; charset=utf-8",
		data: "{}",
		dataType: "jsonp",
		*/
		success: function(msg) {
			setClassesGlobal(msg);
		},
		error: function(xhr, ajaxOptions, thrownError) {
			//$("#content").html("<p>Error fetching " + URL + "</p>");
		}
	});
	return CLASSES;
}

