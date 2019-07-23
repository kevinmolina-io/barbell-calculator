// /**********************************************************/
// /********************** UI Controller *********************/
// /**********************************************************/

var UIController = (function() {
  var DOMstrings = {
    inputTotalWeight: "#total-weight",
    inputBarbellWeight: "#barbell-weight",
    calcBtn: ".calc-btn",
    plate55: "#plate-55",
    plate45: "#plate-45",
    plate35: "#plate-35",
    plate25: "#plate-25",
    plate10: "#plate-10",
    plate5: "#plate-5",
    plateTwoHalf: "#plate-2half"
  };

  /********************* APIs **************************/
  return {
    getInput: function() {
      return {
        totalWeight: document.querySelector(DOMstrings.inputBarbellWeight)
          .value,
        barbellWeight: document.querySelector(DOMstrings.inputBarbellWeight)
          .value
      };
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

$("button.plate-btn").click(function() {
  $button = $(this);
  if ($button.hasClass("plate-btn-selected")) {
    $button.removeClass("plate-btn-selected");
    $button.addClass("plate-btn");
  } else {
    $button.addClass("plate-btn-selected");
    $button.removeClass("plate-btn");
  }
});
