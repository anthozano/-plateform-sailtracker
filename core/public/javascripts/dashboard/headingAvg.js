function headingAvg() {
  $.ajax({
    url: "http://localhost:3000/dashboard/headingAverage",
    method: "GET",
    dataType: "json",
    success: function (result) {
      $('#headingDisplay').html(result);
    }
  });
}

$(document).ready(function () {
  headingAvg();
  // setInterval(headingAvg, 1000);
});
