//Run On Load
$(function() {
	//Load Map to Start
	view_map();
	let user = get_user();
	if (user) {
		$("#view_user_btn").html("Hello, "+user);
	} else {
		$("#view_user_btn").html("Welcome! Click here to Log In");
	}
	$.ajax({
		url: "https://us-central1-mystudybuddy.cloudfunctions.net/test",
		type: "GET",
		success: function(msg) {
			console.log(msg);
		},
		error: function(err) {
			console.log(err);
		}
	})
	
});

//Messaging Service
function generateVAPIDKeys() {
	var curve = crypto.createECDH('prime256v1');
	curve.generateKeys();
  
	return {
	  publicKey: curve.getPublicKey(),
	  privateKey: curve.getPrivateKey(),
	};
  }
  
const messaging = firebase.messaging();

messaging.usePublicVapidKey(publicKey);

Notification.requestPermission().then((permission) => {
	if (permission === 'granted') {
		console.log("Notification permission granted");
	} else {
		console.log("Unable to get permission to notify");
	}
})

//Geolocation Algorithms
function get_current_location() {
	var geolocation = new ol.Geolocation();
	geolocation.setTracking(true); // here the browser may ask for confirmation
	return geolocation;
}

function set_user_location(current_geoloc) {
	var url = "https://localhost:8080/setGeoloc?loc="+current_geoloc;
	$.ajax({
		url:url
	})
}

//MAP VIEW
function view_map() {
	console.log("Map");
	$("#MainView").empty();
	$("#MainView").css({'background':'white','padding-left':'0px'});
	//Set Up Map
	var map = new ol.Map({
        target: 'MainView',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([-75.189255,39.955390]),
          zoom: 17
        })
	});
	//Current Location
	var geoloc = get_current_location();
	geoloc.on("change:position",function(){
		//Make Marker
		var pos = ol.proj.fromLonLat(geoloc.getPosition());
		var marker = new ol.Overlay({
			position: pos,
			positioning: 'center-center',
			element: document.getElementById('marker'),
			stopEvent: false
		});
		map.addOverlay(marker);
	});
	
	  
}

//CLASS VIEW
function view_classes() {
	console.log("Classes");
	$("#MainView").empty();
	$("#MainView").css({'background':'white','padding-left':'10px'});
	$("#MainView").html('<h1>Classes</h1><div id="class_scroll"><div>');
	var classlist = ['CS 260','MATH 200','MATH 221','STAT 201','COM 230','CS 275'];
	for (i=0;i<classlist.length;i++) {
		$("#class_scroll").append(classlist[i]+"<br>");
	}
}

//HOMEWORK VIEW
function view_homework() {
	console.log("Homework");
	$("#MainView").empty();
	$("#MainView").css({'background':'white','padding-left':'10px'});
	$("#MainView").html("<h1>Homework</h1>");
}

//PROJECTS VIEW
function view_projects() {
	console.log("Projects");
	$("#MainView").empty();
	$("#MainView").css({'background':'white','padding-left':'10px'});
	$("#MainView").html("<h1>Projects</h1>");
}

//CHATS VIEW
function view_chats() {
	console.log("Chats");
	$("#MainView").empty();
	$("#MainView").css({'background':'white','padding-left':'10px'});
    $("#MainView").html("<h1>Chats</h1>");
}

//Modals
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

//ADD USER
function add_user() {
	console.log("New User...");
	
	//check if email or username taken?
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
			//$("#content").html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError) {
			//$("#content").html("<p>Error fetching " + URL + "</p>");
		}
	});
}

//GET THE CURRENT USER
function get_user() {
	console.log("Get User...");
	var USER;
	//must keep track of username, firstName, lastName, id
	var URL = "https://us-central1-mystudybuddy.cloudfunctions.net/getUser?" + "username=" + $("#username").val() + "&password=" + $("#password").val();
	$.ajax({
		type: "GET",
		url: URL,
		contentType: "application/json; charset=utf-8",
		data: "{}",
		dataType: "jsonp",
		success: function(msg) {
			//$("#content").html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError) {
			//$("#content").html("<p>Error fetching " + URL + "</p>");
		}
	});
	return USER;
}


