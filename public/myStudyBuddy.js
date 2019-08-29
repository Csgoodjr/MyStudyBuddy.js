var map;

function view_map() {
	console.log("Map");
	$("#MainView").empty();
	$("#MainView").css({'background':'red'});
	map = new google.maps.Map(document.getElementById('MainView'),{
		center: new google.maps.LatLng(-34.397, 150.644),
		zoom: 8
	});
}

function view_classes() {
	console.log("Classes");
	$("#MainView").empty();
	$("#MainView").css({'background':'red'});
	$("#MainView").html("<h1>Classes</h1>");
}

function view_homework() {
	console.log("Homework");
	$("#MainView").empty();
	$("#MainView").css({'background':'red'});
	$("#MainView").html("<h1>Homework</h1>");
}

function view_projects() {
	console.log("Projects");
	$("#MainView").empty();
	$("#MainView").css({'background':'red'});
	$("#MainView").html("<h1>Projects</h1>");
}

function view_chats() {
	console.log("Chats");
	$("#MainView").empty();
	$("#MainView").css({'background':'red'});
    $("#MainView").html("<h1>Chats</h1>");
}

function open_modal() {
    $("#user_modal").css({"display":"block"});
    console.log("Add User Clicked");
}

function close_modal() {
    $("#user_modal").css({"display":"none"});
}

function add_user() {
	console.log("New User...");
	
	var email = document.getElementById("email").value;
	var firstName = document.getElementById("firstName").value;
	var id = (Math.floor(Math.random()*10000));
	var lastName = document.getElementById("lastName").value;
	var password = document.getElementById("password").value;
	var username = document.getElementById("username").value;
	
	var URL = "http://localhost:8080/add?" + "email=" + email + "&firstName=" + firstName +
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
