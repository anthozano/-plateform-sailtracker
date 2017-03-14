google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Boat');
  data.addColumn('number', 'Average speed');

  $.ajax({
    url: "https://localhost:3000/dashboard/speedAverage",
    method: "GET",
    dataType: "json",
    success: function (results) {
      Row = results;
      data.addRows(results);
      var options = {
        title: 'Speed average per boat',
        animation: {
          duration: 1000,
          easing: 'out'
        },
        hAxis: {
          title: 'Boat'
        },
        vAxis: {
          title: 'Speed (kts)',
          minValue: 0
        }
      };
      var chart = new google.visualization.ColumnChart(document.getElementById('chartSpeed'));
      chart.draw(data, options);
    }
  })
}

$(window).resize(function () {
  drawBasic();
});

// $(document).ready(function () {
//   setInterval(drawBasic, 1000);
// });
