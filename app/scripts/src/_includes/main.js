app = {};

app.key = "666fuckHorse";

app.url = "http://api.bandsintown.com/artists/Counterparts/events.json?api_version=2.0&app_id=" + app.key;



app.getData = function(){
	$.ajax({
		url: app.url,
		method: 'GET',
		dataType: 'jsonp',
		success: function(data){
			console.log('hey');
			for (var i = 0; i < 6; i++) {
				app.displayTour(data[i]);	
				console.log(data[i]);
			};
			console.log('sup');			
		}
	})
};

app.displayTour = function(info){
	//grabbing date
	var tempData = {};

	var firstSpace = info.formatted_datetime.indexOf(" ", 0);
	var firstCom = info.formatted_datetime.indexOf(",", 0);
	var secondCom = info.formatted_datetime.indexOf(",", firstSpace);
	var date = info.formatted_datetime.slice(firstSpace, secondCom);

	var titleFirstSpace = (info.title.indexOf("@", 0)) + 2;

	var titleIn = (info.title.indexOf("in", titleFirstSpace)) - 1;

	var venue = info.title.slice(titleFirstSpace, titleIn);

	tempData.date = date;
	tempData.location = info.formatted_location;
	tempData.venue = venue;
	tempData.link = info.facebook_rsvp_url;

	var temp = _.template('<div class="tourTop"><span class="date"><%- date %></span><span class="venue"><%- venue %></span><span class="location"><%- location %></span><span class="rsvp"><a href="<%- link %>">RSVP</a></span></div>');
	var html = temp(tempData);
	$('.dateWrap').append(html);
};	

$(function() {
	app.getData();
});

