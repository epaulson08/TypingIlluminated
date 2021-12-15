$(document).ready(() => {
  const title = "The Second Coming";
  const author = "William Butler Yeats";
  // var cont is defined in separate script

  function spanify(str) {
    let toReturn = [...str];
    for (let i = 0; i < toReturn.length; i++) {
      toReturn.splice(i, 1, `<span>${toReturn[i]}</span>`);
    }
    return toReturn;
  }

  // generate initial content
  $("h1.title").text(title);
  $("h2.author").text(author);

  // `cont` will remain the original string
  // `toPresent` will be a copy that is changed to
  // html
  let toPresent = cont;

  // add span wrapper to every character
  toPresent = spanify(toPresent);
  // back from array to string
  toPresent = toPresent.join("");

  // add <br />'s for newlines
  toPresent = toPresent.replace(/\n/g, "<br />");
  $("#cont").html(toPresent);

  // create highlighter and initialize to first character
  let $current = $("#cont > span:first-child");
  $current.addClass("highlighted");

  /* business logic and keydown listener */

  // offset from start of `cont`. will increment when
  // user types a correct key
  let offset = 0;

  // will show a return symbol once the user types
  // to the end of a line, then hide it again when they
  // hit enter
  let showingReturn = false;

  // meta-characters to ignore when determining if
  // a correct key was pressed
  const metas = ["Meta", "Shift", "Tab"];

  // flag to track if user has not yet corrected
  // an incorrectly typed key
  let afterWrong = false;

  // store the offset of the incorrectly typed key
  let mistakeOffset = -1;

  $(document).on("keydown", (e) => {
    // prevent browser default of Space causing down-scroll,
    // but do not lock up other metacharacters
    if (e.code === "Space") {
      e.preventDefault();
    }
    
    let typedCorrect =
      e.key === cont[offset] || (cont[offset] === "\n" && e.key === "Enter");

    if (metas.includes(e.key)) {
      // ignore meta-characters
      return;
    } else if (afterWrong) {
      if (e.key === "Backspace") {
        offset--;
        $current.removeClass("after-wrong");
        $current = $current.prev("span");
        if (mistakeOffset === offset) {
          afterWrong = false;
          $current.removeClass("wrong");
          $current.addClass("highlighted");
        } else {

        }
      } else {
        offset++;
        $current = $current.next("span");
        $current.addClass("after-wrong");
      }
    } else if (typedCorrect) {
      console.log("there");
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
      // user typed correct character
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
