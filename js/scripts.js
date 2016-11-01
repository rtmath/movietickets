var tickets = [];

function Ticket(userAge, movie, time, price) {
  this.userAge = userAge;
  this.movie = movie;
  this.time = time;
  this.price = price;
}

function Movie(movieTitle, rating, times){
  this.movieTitle = movieTitle;
  this.rating = rating;
  this.times = times;
}

function formatTime(timeString) {
  var timeOfDay = " AM";
  var userTimeFormatted = timeString.split(":");
  if (parseInt(userTimeFormatted[0]) / 12 >= 1) {
    timeOfDay = " PM";
  }
  userTimeFormatted[0] = userTimeFormatted[0] % 12;
  userTimeFormatted = userTimeFormatted.slice(0, 2);
  return userTimeFormatted.join(":") + timeOfDay;
}

function getPrice(userAge, time) {
  var moviePrice = 12;
  if (14 > userAge || userAge > 59) {
    moviePrice -= 5;
  }
  if (parseInt(time) < 17) {
    moviePrice -= 3;
  }
  return moviePrice;
}

function displayConfirmation(ticket) {
  $(".movieTitle").text(ticket.movie);
  $(".movieTime").text(ticket.time);
  $(".ticketPrice").text(ticket.price);
  $(".confirmation").show();
  $("#movieTimes").hide();
}

var movieList = [];
var gAndPG = ["Trolls", "Kubo", "Storks"];
var pg13AndR = ["Fantastic Beasts and Where to Find Them", "Doctor Strange", "Inferno"];
var movieTimes = ["12:00:00", "13:10:00", "14:20:00", "15:30:00", "16:40:00", "17:50:00", "19:00:00", "20:10:00"];

gAndPG.forEach(function(movie) {
  movieList.push(new Movie(movie, "gAndPG", movieTimes))
})

function enterAge(userAge) {
  if (userAge > 13) {
    $(".pg13AndR").show();
    $(".gAndPG").show();
    $("#movieForm").show();
    $("#ageForm").hide();
  } else {
    $(".gAndPG").show();
    $("#movieForm").show();
    $("#ageForm").hide();
  }
}

$(function() {

  var movie = ""; // = $("#");
  var userAge = 1;
  var selectedMovie = "";

  gAndPG.forEach(function(movie) {
    $("#movieForm").prepend('<div class="form-check">' +
                        '<label class="form-check-label gAndPG">' +
                          '<input type="radio" class="form-check-input" value="' +
                          movie +
                          '" name="movies">' +
                          movie +
                        '</label>' +
                      '</div>')
  })
  pg13AndR.forEach(function(movie) {
    $("#movieForm").prepend('<div class="form-check pg13AndR">' +
                        '<label class="form-check-label">' +
                          '<input type="radio" class="form-check-input" name="movies">' +
                          movie +
                        '</label>' +
                      '</div>')
  })

  $("#ageForm").submit(function(event) {
    event.preventDefault();
    userAge = parseInt($("#userAge").val());
    enterAge(userAge);
  })

  $("#movieForm").submit(function(event) {
    event.preventDefault();
    $(".error").hide();
    selectedMovie = $('input[name="movies"]:checked', '#movieForm').val();
    if (selectedMovie) {
      var userTime = $("#hour").val();
      $(".userTime").text(formatTime(userTime));
      $("#movieTimes").show();
      $("#movieForm").hide();
      movieTimes.forEach(function(movieTime) {
        if (parseInt(userTime) < parseInt(movieTime)) {
          $("#movieTimeList").append('<option class=value="' + parseInt(movieTime) + '">' + formatTime(movieTime) + '</option');
        }
      });
    } else {
      $(".error").show();
    };
  });

  $("#movieTimes").submit(function(event) {
    event.preventDefault();
    var time = $("#movieTimeList option:selected").val();
    var newTicket = new Ticket(userAge, selectedMovie, time, getPrice(userAge, time));
    tickets.push(newTicket);
    displayConfirmation(tickets[0]);
  })
})
