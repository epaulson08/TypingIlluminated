$(document).ready(() => {
  /* Declarations */
  let state = {};

  // offset from start of `cont`
  // state.offset = 0;
  let offset = 0;

  // will show a return symbol once the user types
  // to the end of a line, then hide it again when they
  // hit enter
  let showingReturn = false;

  // flag to track if user has not yet corrected
  // an incorrectly typed key
  let afterWrong = false;

  // store the offset of the incorrectly typed key
  let mistakeOffset = 0;

  // make HTML from content; $current is a span
  // element wrapping the first typeable character
  let $current = setUpPage(secondComing);
  const cont = secondComing.text;

  /* Business Logic */
  // TODOs: 
  // Handle "Delete" key
  // Handle backspace from first character (highlighter disappears)
  // Handle behavior on last character (e.g. when typed incorrectly)
  // Fix backspace after return character behavior

  $(document).on("keydown", (e) => {
    let key = e.key;

    // prevent browser default of Space causing down-scroll,
    // but do not lock up other metacharacters
    if (key === " ") {
      e.preventDefault();
    }

    if (_isMetaCharacter(key)) {
      // ignore meta-characters
      return;
    } else if (_isLastCharacter(cont, offset)) {
      // last character of text plus empty buffer characters
      // TODO
    } else if (_isBackspace(key)) {
      offset--;
      if (afterWrong) {
        $current.removeClass("after-wrong");
        $current = $current.prev("span");
        if (mistakeOffset === offset) {
          afterWrong = false;
          $current.removeClass("wrong");
          $current.addClass("highlighted");
        }
      } else {
        $current.removeClass("highlighted");
        $current.removeClass("right");
        $current = $current.prev("span");
        $current.removeClass("right");
        $current.addClass("highlighted");
      }
    } else if (afterWrong) {
      offset++;
      $current = $current.next("span");
      $current.addClass("after-wrong");
    } else if (_typedCorrect(key, cont, offset)) {
      // for newlines, add return character to cue user to hit enter;
      // remove the symbol when they type the next character
      if (showingReturn) {
        $current.html("<span><br /></span>");
        showingReturn = false;
      }
      // check for upcoming newline
      if (!showingReturn && cont[offset + 1] === "\n") {
        $current.next().html("<span>&#x23CE;<br /></span>");
        showingReturn = true;
      }
      if (offset === cont.length - 1) {
        $("#complete").text("Finished!");
        $current.removeClass("highlighted");
        $current.addClass("right");
        _animate();
        return;
      }
      offset++;
      $current.removeClass("highlighted");
      $current.addClass("right");
      $current = $current.next("span");
      $current.addClass("highlighted");
    } else {
      // user typed incorrect character
      mistakeOffset = offset;
      $current.addClass("wrong");
      afterWrong = true;
      $current = $current.next("span");
      $current.addClass("after-wrong");
      offset++;
    }
  });
});

// Presentation logic
function setUpPage(content) {
  $("h1.title").text(content.title);
  $("h2.author").text(content.author);

  // `content.text` will remain the original string
  // `toPresent` will be a copy that is changed to
  // html
  let toPresent = content.text;

  // add span wrapper to every character
  toPresent = _spanify(toPresent);

  // add <br />'s for newlines
  toPresent = toPresent.replace(/\n/g, "<br />");
  $("#cont").html(toPresent);

  // initialize highlighter
  let $firstTypeableCharacter = $("#cont > span:first-child");
  $firstTypeableCharacter.addClass("highlighted");

  return $firstTypeableCharacter;
}

function _markCorrect($element) {}

function _markIncorrect($element) {}

function _markHighlighted($element) {}

function _markAfterIncorrect($element) {}

function _spanify(str) {
  let toReturn = [...str];
  for (let i = 0; i < toReturn.length; i++) {
    toReturn.splice(i, 1, `<span>${toReturn[i]}</span>`);
  }
  // change back from array to string
  return toReturn.join("");
}

function _animate() {
  console.log("This will do something soon");
}

// Business logic

function _typedCorrect(key, cont, offset) {
  return key === cont[offset] || (cont[offset] === "\n" && key === "Enter");
}

function _isBackspace(key) {
  return key === "Backspace";
}

function _isLastCharacter(cont, offset) {
  return offset === cont.length - 1;
}

function _isMetaCharacter(key) {
  // meta-characters to ignore
  const metas = [
    "Meta",
    "Shift",
    "Tab",
    "Alt",
    "CapsLock",
    "ArrowUp",
    "ArrowRight",
    "ArrowLeft",
    "ArrowDown",
    "Insert",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    "Insert",
    "NumLock",
    "Escape",
  ];
  return metas.includes(key);
}
