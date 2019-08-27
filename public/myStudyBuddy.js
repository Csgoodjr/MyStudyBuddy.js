function view_map() {
    console.log("Map");
    //GoogleMapsApiKey=AIzaSyCK2qX2torgp4UGseh4RnkYkxrsHweyRf0
}

function view_classes() {
    console.log("Classes");
    $("#MainView").css({'background':'white'});
}

function view_homework() {
    console.log("Homework");
}

function view_projects() {
    console.log("Projects");
}

function view_chats() {
    console.log("Chats");
}

function add_user() {
	conscole.log("New User...");
	
	var email = document.getElementById("email").value;
	var firstName = document.getElementById("firstName").value;
	var id = document.getElementById("id").value;
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
