function headingAvg() {
  $.ajax({
    url: "http://localhost:3000/dashboard/headingAverage",
    method: "GET",
    dataType: "json",
    success: function (result) {
      console.log(result)
      $('#headingDisplay').html(result);
    }
  });
}

$(document).ready(function () {
  headingAvg();
  setInterval(headingAvg, 1000);
});
