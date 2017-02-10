google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawStatsChart);
function drawStatsChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Boat name');
  data.addColumn('number', 'Amount of data');
  $.ajax({
    url: "http://localhost:3000/dashboard/speedAverage",
    method: "GET",
    dataType: "json",
    success: function (results) {
      data.addRows(results);
      var options = {
        title: 'Data sended activity'
      };
      var chart = new google.visualization.PieChart(document.getElementById('chartStats'));
      chart.draw(data, options);
    }
  });
}

$(window).resize(function () {
  drawStatsChart();
});

$(document).ready(function () {
  drawStatsChart();
  setInterval(headingAvg, 1000);
});
