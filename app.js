let plates = [];
let plateCount = [];

var getButtonValue = function($button) {
  var label = $button.text();
  $button.text("");
  var buttonValue = $button.val();
  $button.text(label);
  return buttonValue;
};

var arrayRemove = function(arr, value) {
  return arr.filter(function(ele) {
    return ele != value;
  });
};

$("button.plate-btn").click(function() {
  $button = $(this);
  let plateVal = "";
  if ($button.hasClass("plate-btn-selected")) {
    $button.removeClass("plate-btn-selected");
    $button.addClass("plate-btn");
    plateVal = parseFloat($button.text());
    plates = arrayRemove(plates, plateVal);
    console.log(plates);
  } else {
    $button.addClass("plate-btn-selected");
    $button.removeClass("plate-btn");
    plateVal = parseFloat($button.text());
    plates.push(plateVal);
    console.log(plates);
  }
});

var constructPlateCountArray = function() {
  for (var i = 0; i < plates.length(); i++) {
    plateCount.push(0);
  }
};

// console.log(plates);

var calcPlates = function() {
  plates = plates.sort();
  plates = plates.reverse();
  let totalWeight = parseFloat(document.getElementById("total-weight").value);
  const BARBELL_WEIGHT = parseFloat(
    document.getElementById("barbell-weight").value
  );
};

function getCube() {
  let number = parseInt(document.getElementById("total-weight").value);
  alert(number * number * number);
}
