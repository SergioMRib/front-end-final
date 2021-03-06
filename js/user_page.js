var user_id = new URLSearchParams(window.location.search).get("id");
var url= "crisis.html";

var populate_header = function(){
    $.ajax({
        url: 'http://192.168.1.226:8080/herox/api/' + user_id,
        async: true,
        dataType: 'json',
        success: function (dataResponse) { 
			var user = dataResponse;
			console.log(dataResponse);

			// clean header html
			$("#header").html('');

			// populate header
            $("#header").html(
				'<div id="header_logo_container"><img class="logo" src="' + user.imageUrl + '"/></div>'
				+ '<div id="header_description_container"><h2 class="white-text"><strong>' + user.name + '</strong></h2>'
				+ '<h5 class="white-text">' + user.catchPhrase + '</h5></div><div id="header_menu_container">'
				+ '<button class="btn" id="history">My history</button></div>'
			);
			
			// clean hero html
			$(".hero_container").html('');

			// populate hero
			$(".hero_container").html(
				'</div><div id="hero_card_text"><h3 class="white-text"><strong>' + user.hero.name + '</strong></h3>'
				+ '<h4 class="white-text"><strong>Abilities > </strong>' + user.hero.powers + '</h4></div>'
			);
		
        },
        error: 
        function(response, status) {
            alert("Error: " + response);
        }
    });

}

var populate_missions = function() {
	$.ajax({
        url: 'http://192.168.1.226:8080/herox/api/missions',
        async: true,
        dataType: 'json',
        success: function (dataResponse) { 
			var missions = dataResponse;
			var missionButtons = "";
			console.log(dataResponse);

			$(".available_buttons_container").html("");

			for (i = 0; i < missions.length; i ++) {
				var mid = missions[i].id;
				missionButtons += ('<div class="mission_container"><p class="mission_text" id="mission' + mid + '_text">' + missions[i].title + '</p>'
					+ '<img src="' + missions[i].imgUrl + '" onclick="replace_page(' + mid + ')" class="mission" id="mission23_button"></img></div>')

			}

			$(missionButtons).appendTo($(".available_buttons_container"));
		
        },
        error: 
        function(response, status) {
            alert("Error: " + response);
        }
    });
}

var populate_ongoing_missions = function() {
	$.ajax({
        url: 'http://192.168.1.226:8080/herox/api/' + user_id + '/missions',
        async: true,
        dataType: 'json',
        success: function (dataResponse) { 
			var missions = dataResponse;
			var missionButtons = "";
			console.log(dataResponse);

			if (missions.length == 0) {
				$("#ongoing_missions").html("");
			}

			$(".ongoing_buttons_container").html("");

			for (i = 0; i < missions.length; i ++) {
				var mid = missions[i].id;
				missionButtons += ('<div class="mission_container"><p class="mission_text" id="mission' + mid + '_text">' + missions[i].title + '</p>'
					+ '<img src="' + missions[i].imgUrl + '" onclick="replace_page(' + mid + ')" class="mission" id="mission23_button"></img></div>')

			}

			$(missionButtons).appendTo($(".ongoing_buttons_container"));
		
        },
        error: 
        function(response, status) {
            alert("Error: " + response);
        }
    });
}

var replace_page = function(mid) {
	location.replace(url + "?mid=" + mid + "&id=" + user_id);
}

/* testing the whole user info request situation with a local mock user

var mock_populate = function() {
	var user = {
		imgUrl: "images/old_lady.jpeg",
		name: "Old Lady",
		catchphrase: "Suck my dick, son!"
	}

	// populate header
	$("#header").html(
		'<div id="header_logo_container"><img class="logo" src="' + user.imgUrl + '"/></div>'
		+ '<div id="header_description_container"><h2 class="white-text"><strong>' + user.name + '</strong></h2>'
		+ '<h5 class="white-text">' + user.catchphrase + '</h5></div><div id="header_menu_container">'
		+ '<button class="btn" id="history">My history</button></div>'
		)

}

$("#history").click(function() {
	mock_populate();
});
*/

populate_header();
populate_missions();
populate_ongoing_missions();