$(document).ready(() => {
  /* Declarations */

  // character highlighter
  let $current;

  // initialize content text
  const content = secondComing;
  const cont = content.text;

  // offset from start of `cont`. will increment when
  // user types a correct key
  let offset = 0;

  // will show a return symbol once the user types
  // to the end of a line, then hide it again when they
  // hit enter
  let showingReturn = false;

  // meta-characters to ignore when determining if
  // a correct key was pressed
  const metas = ["Meta", "Shift", "Tab", "Alt", "CapsLock", "ArrowUp", "ArrowRight", "ArrowLeft", "ArrowDown", "Insert", "PageUp", "PageDown", "Home", "End", "Insert", "NumLock", "Escape"];

  // flag to track if user has not yet corrected
  // an incorrectly typed key
  let afterWrong = false;

  // store the offset of the incorrectly typed key
  let mistakeOffset = 0;

  // make HTML from content
  setUpPage(content);

  /* Business Logic */
  // TODO: handle "Delete" key
  // Handle backspace from first character (highlighter disappears)

  $(document).on("keydown", (e) => {
    // prevent browser default of Space causing down-scroll,
    // but do not lock up other metacharacters
    if (e.code === "Space") {
      e.preventDefault();
    }

    const typedCorrect =
      e.key === cont[offset] || (cont[offset] === "\n" && e.key === "Enter");

    const backspace = e.key === "Backspace";

    if (metas.includes(e.key)) {
      // ignore meta-characters
      return;
    } else if (backspace) {
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
        $current.removeClass("right")
        $current = $current.prev("span");
        $current.removeClass("right");
        $current.addClass("highlighted");
      }
    } else if (afterWrong) {
      offset++;
      $current = $current.next("span");
      $current.addClass("after-wrong");
    } else if (typedCorrect) {
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

  function setUpPage(content) {

    function spanify(str) {
      let toReturn = [...str];
      for (let i = 0; i < toReturn.length; i++) {
        toReturn.splice(i, 1, `<span>${toReturn[i]}</span>`);
      }
      return toReturn;
    }

    // generate initial content
    $("h1.title").text(content.title);
    $("h2.author").text(content.author);

    // `content.text` will remain the original string
    // `toPresent` will be a copy that is changed to
    // html
    let toPresent = content.text;

    // add span wrapper to every character
    toPresent = spanify(toPresent);

    // change back from array to string
    toPresent = toPresent.join("");

    // add <br />'s for newlines
    toPresent = toPresent.replace(/\n/g, "<br />");
    $("#cont").html(toPresent);

    // initialize highlighter
    $current = $("#cont > span:first-child");
    $current.addClass("highlighted");
  }
});
