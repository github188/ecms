(function () {
  for (var i= 0;i < 9;i++) {
    var clone = $("#data_list table tbody tr:eq(0)").clone();
    $("#data_list table tbody").append(clone);
  }

  $("#starttime").focus(function() {
    laydate({
      elem: "#starttime",
      format: "YYYY-MM-DD",
      festival: true,
      max: $("#endtime").val(),
      istime: false
    });
  });
  $("#endtime").focus(function() {
    laydate({
      elem: "#endtime",
      format: "YYYY-MM-DD",
      festival: true,
      min: $("#starttime").val(),
      istime: false
    });
  });

  $("#stime").focus(function() {
    laydate({
      elem: "#stime",
      format: "YYYY-MM-DD",
      festival: true,
      max: $("#etime").val(),
      istime: false
    });
  });
  $("#etime").focus(function() {
    laydate({
      elem: "#etime",
      format: "YYYY-MM-DD",
      festival: true,
      min: $("#stime").val(),
      istime: false
    });
  });
})();