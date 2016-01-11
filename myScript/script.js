$(document).ready(function() {

// $('.btn-group').hide(300);

   $( "#check1" ).change(function() {
      var state = $('#check1').prop('checked');

      if (state) {

        $(".scd").show();
      }
      else {
        $(".scd").hide();
      }

   }).change();

   


  $('.butn').on('click', function() {

  var place = $('.places').val();
  console.log(place);

  $.ajax({
      type: "GET",
      url: "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places where text='" + place + "') and u='c'&format=json", 
      dataType: 'json',
      crossDomain: true,
      success: function(msg){
        $('.fst').empty();
        $('.fst').append("<tr><td>Город</td><th>" + msg.query.results.channel[0].location.city + "</th></tr><br>");
        $('.fst').append("<tr><td>Дата</td><td>" + msg.query.results.channel[0].item.condition.date + "</td></tr><br>");
        $('.fst').append("<tr><td>Температура</td><td>" + msg.query.results.channel[0].item.condition.temp + "</td></tr><br>");
        $('.fst').append("<tr><td>Скорость ветра</td><td>" + msg.query.results.channel[0].wind.speed + " km/h" + "</td></tr><br>");
        $('.fst').append("<tr><td>Влажнсть</td><td>" + msg.query.results.channel[0].atmosphere.humidity + "%</td></tr><br>");
        $('.fst').append("<tr><td>Давление</td><td>" + msg.query.results.channel[0].atmosphere.pressure + " mb" + "</td></tr><br>");
        $('.fst').append("<tr><td>Описание</td><td>" + msg.query.results.channel[0].item.condition.text + "</td></tr>");

       $('.scd').empty();
       $('.scd').append("<tr><th>" + "date" + "</th><th>" + "weekday" + "</th><th>" + "high" + "</th><th>" + "low" + "</th><th>" + "text" + "</th></tr><br>");

        var lb = [];
        var dt1 = [];
        var dt2 = [];
       for (var i = 0; i <= 4; i++) {
          var date = msg.query.results.channel[0].item.forecast[i].date;
          lb[i] = msg.query.results.channel[0].item.forecast[i].date;

          var weekday = msg.query.results.channel[0].item.forecast[i].day;
          lb[i] = lb[i] + ", " + msg.query.results.channel[0].item.forecast[i].day;

          var high = msg.query.results.channel[0].item.forecast[i].high;
          dt1[i] = msg.query.results.channel[0].item.forecast[i].high;

          var low = msg.query.results.channel[0].item.forecast[i].low;
          dt2[i] = msg.query.results.channel[0].item.forecast[i].low;
          var text = msg.query.results.channel[0].item.forecast[i].text; 
         $('.scd').append("<tr><td>" + date + "</td><td>" + weekday + "</td><td>" + high + "</td><td>" + low + "</td><td>" + text + "</td></tr><br>");
       }

         // Get context with jQuery - using jQuery's .get() method.
        var ctx = $("#myChart").get(0).getContext("2d");
          // This will get the first returned node in the jQuery collection.          

         var data = {
              labels: lb,
              datasets: [
                  {
                      label: "My First dataset",
                      fillColor: "rgba(250,250,250,0.2)",
                      strokeColor: "rgba(151,187,205,1)",
                      pointColor: "rgba(151,187,205,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151,187,205,1)",
                      data: dt1
                  },
                  {
                      label: "My Second dataset",
                      fillColor: "rgba(250,250,250,0.2)",
                      strokeColor: "rgba(0,100,100,0.8)",
                      highlightFill: "rgba(0,100,100,0.75)",
                      highlightStroke: "rgba(0,100,100,1)",
                      data: dt2
                  }          
              ]
          };console.log(data.datasets[0]);

          var options = {
              ///Boolean - Whether grid lines are shown across the chart
              scaleShowGridLines : true,
          
              //String - Colour of the grid lines
              scaleGridLineColor : "rgba(0,0,0,.05)",
          
              //Number - Width of the grid lines
              scaleGridLineWidth : 1,
          
              //Boolean - Whether to show horizontal lines (except X axis)
              scaleShowHorizontalLines: true,
          
              //Boolean - Whether to show vertical lines (except Y axis)
              scaleShowVerticalLines: true,
          
              //Boolean - Whether the line is curved between points
              bezierCurve : true,
          
              //Number - Tension of the bezier curve between points
              bezierCurveTension : 0.4,
          
              //Boolean - Whether to show a dot for each point
              pointDot : true,
          
              //Number - Radius of each point dot in pixels
              pointDotRadius : 4,
          
              //Number - Pixel width of point dot stroke
              pointDotStrokeWidth : 1,
          
              //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
              pointHitDetectionRadius : 20,
          
              //Boolean - Whether to show a stroke for datasets
              datasetStroke : true,
          
              //Number - Pixel width of dataset stroke
              datasetStrokeWidth : 2,
          
              //Boolean - Whether to fill the dataset with a colour
              datasetFill : true,
          
              //String - A legend template
              legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
          
          };
          var myLineChart = new Chart(ctx).Line(data, options);
      },
      error: function(err) {
        console.log(err);
      }
   });

  });
$( "#check2" ).change(function() {
      var state1 = $('#check2').prop('checked');

      if (state1) {

        $("#myChart").show();
      }
      else {
        $("#myChart").hide();
      }

   }).change();
});