function readJSON() {
  var file = document.querySelector("#inputJSON").files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    let result = JSON.parse(event.target.result);
    let firstItem = result[0];
    if (firstItem === undefined) {
      $("#alert_text").html(
        'JSON is not valid. <a href="https://pavel-kuligin.gitbook.io/chart/json-data#what-is-valid-json" target="_blank" class="red-link">Check examples</a>'
      );
      $(".alert").css("display", "flex");
      setTimeout(closeAlert, 5000);
    } else {
      $(".jsonLink").text(file.name);
      chartConfig.data.json.data = result;
      chartConfig.data.json.jsonName = file.name;
      chartConfig.data.json.jsonLink = null;
      var keys = Object.keys(firstItem),
        options = new Array(),
        htmlOptions = "";
      keys.forEach((key, i) => {
        var tempOption = { name: key, value: i, checked: false },
          options,
          push;
        tempOption;
        htmlOptions += '<option value="' + i + '">' + key + "</option>";
      });
      $("select[multiple]").multiselect("loadOptions", options);
      $("#jsonKeys").show();
      $("select[name=jsonHeader]").html(htmlOptions);
      $("#jsonHeader").show();
    }
    $("#inputJSON").val("");
  };
  if (file) {
    reader.readAsText(file);
  } else {
    alert("Warning");
  }
}
