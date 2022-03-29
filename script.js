// Sound
function playSoundPick() {
    var sound = document.getElementById("audiopick");
    sound.play();
  }
function playSoundClear() {
    var sound = document.getElementById("audioclear");
    sound.play();
  }
function playSoundWrong() {
    var sound = document.getElementById("audiowrong");
    sound.play();
  }
function playSoundLoad() {
    var sound = document.getElementById("audioload");
    sound.play();
  }
 // Get elements
 var el = function(element) {
    if (element.charAt(0) === "#") {
      return document.querySelector(element);
    }
    return document.querySelectorAll(element);
  };

  // Variables
  var viewer = el("#viewer"), 
    inhis = el("inhis"), 
    equals = el("#equals"), 
    nums = el(".num"), 
    ops = el(".ops"), 
    theNum = "", 
    oldNum = "", 
    ope,
    resultNum, 
    operator; 

  //Number
  var setNum = function() {
    if (resultNum) { 
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else { 
      theNum += this.getAttribute("data-num");
    }
    playSoundPick();
    viewer.innerHTML = theNum;
  };

  // Operator
  var moveNum = function() {
    playSoundPick();
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", "");
  };

  // Equals
  var displayNum = function() {
    playSoundLoad();

    // Convert str input to num
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Operation
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        ope = "+";
        document.getElementById("inhis").innerHTML = oldNum + " " + ope + " " + theNum ;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        ope = "-";
        document.getElementById("inhis").innerHTML = oldNum + " " + ope + " " + theNum ;
        break;

      case "times":
        resultNum = oldNum * theNum;
        ope = "*";
        document.getElementById("inhis").innerHTML = oldNum + " " + ope + " " + theNum ;
        break;

      case "divided by":
        resultNum = oldNum / theNum;
        ope = "/";
        document.getElementById("inhis").innerHTML = oldNum + " " + ope + " " + theNum ;
        break;

        // Equal pressed without operator
      default:
        resultNum = theNum;
        document.getElementById("inhis").innerHTML = theNum ;
        ope = " ";
        oldNum = 0;
    }

    // If NaN
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        resultNum = "Ada yang salah!";
        document.getElementById("inhis").innerHTML = "---" ;
        playSoundWrong();
      } else {
        resultNum = "Tak Terhingga";
      }
    }

    // Display
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);
    

    // Reset
    oldNum = 0;
    theNum = resultNum;

  };

  // Clear button
  var clearAll = function() {
    playSoundClear();
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
    document.getElementById("inhis").innerHTML = 0 ;
  };

  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  equals.onclick = displayNum;
  
  el("#clear").onclick = clearAll;
