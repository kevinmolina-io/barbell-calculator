/***************** MODEL ******************/
/*****************************************/
let plates = [45, 35, 25, 10, 5, 2.5];
let plateCount = [];
document.getElementById("barbell-weight").defaultValue = 45;

/**************** CONTROLLER *************/
/*****************************************/

var arrayRemove = function(arr, value) {
  return arr.filter(function(ele) {
    return ele != value;
  });
};

$("button.plate").click(function() {
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

(function($) {
  $.fn.inputFilter = function(inputFilter) {
    return this.on(
      "input keydown keyup mousedown mouseup select contextmenu drop",
      function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
      }
    );
  };
})(jQuery);

// Install input filters.
$("#total-weight").inputFilter(function(value) {
  return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 2000); // Heaviest weight ever deadlifted belongs to Zydrunas Savickas at 1155 lbs.
});

$("#barbell-weight").inputFilter(function(value) {
  return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 2000); // Heaviest weight ever deadlifted belongs to Zydrunas Savickas at 1155 lbs.
});

var constructPlateCountArray = function() {
  for (var i = 0; i < plates.length; i++) {
    plateCount.push(0);
  }
};

var resetInputs = function() {
  document.getElementById("total-weight").value = "";
  document.getElementById("barbell-weight").defaultValue = 45;
  plateCount = [];
};

var clearView = function() {
  $("rect").remove(".plate-view");
  $("text").remove(".label-view");
};

var getUserInput = function() {
  let userInputs = [0, 0];
  // Gather user input
  let totalWeight = parseFloat(document.getElementById("total-weight").value); // total weight
  const BARBELL_WEIGHT = parseFloat(
    document.getElementById("barbell-weight").value
  ); // barbell weight
  userInputs[0] = totalWeight;
  userInputs[1] = BARBELL_WEIGHT;

  return userInputs;
};

var renderOutput = function() {
  let html, newHtml, label, newLabel;

  clearView();

  // Figure out the bound from where we're going to position the plates in the UI.
  let startingPoint = d3.select(".bound").attr("x");

  //Start creating the plates
  for (var i = 0; i < plates.length; i++) {
    while (plateCount[i] > 0) {
      startingPoint = startingPoint - 22;
      html = '<rect class="plate-view plate-%num%" x="%coordX%"></rect>';
      newHtml = html.replace("%num%", plates[i]);
      newHtml = newHtml.replace("%coordX%", startingPoint);
      document
        .querySelector(".output")
        .insertAdjacentHTML("beforeend", newHtml);
      label =
        '<text class="label-view label-%plate%" x="%lblX">' +
        plates[i] +
        "</text>";
      newLabel = label.replace("%plate%", plates[i]);
      newLabel = newLabel.replace("%lblX", startingPoint + 2);
      document
        .querySelector(".output")
        .insertAdjacentHTML("beforeend", newLabel);
      plateCount[i] -= 1;
    }
  }
};

var calcPlates = function() {
  // sort by descending order
  plates = plates.sort(function(a, b) {
    return b - a;
  });

  let tWeight = document.getElementById("total-weight").value;

  let bWeight = document.getElementById("barbell-weight").value;

  let weight = (tWeight - bWeight) / 2.0; // weight on each side

  constructPlateCountArray(); // [0, 0, 0, ... , plates.length]

  for (var i = 0; i < plates.length; i++) {
    while (weight >= plates[i]) {
      weight -= plates[i];
      plateCount[i] += 1;
    }
  }

  if (weight !== 0) {
    alert("Not Rackable with plate selection!");
    resetInputs();
  }

  console.log(plateCount);
  renderOutput();

  resetInputs();
};
