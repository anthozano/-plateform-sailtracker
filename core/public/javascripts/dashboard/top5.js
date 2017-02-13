function top5() {
  $.ajax({
    url: "http://localhost:3000/dashboard/top5",
    method: "GET",
    dataType: "json",
    success: function (results) {
      $("#top5tb").empty();
      for(var i = 0; i < results.length; i++) {
        $("#top5tb").append($("<tr>").append(
          $("<td>").html(results[i].no),
          $("<td>").html(results[i].boat),
          $("<td>").html(results[i].speed)
        ))
      }
    }
  });
}

$(document).ready(function () {
  top5();
  // setInterval(top5, 1000);
});
