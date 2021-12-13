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

  // listen for keydowns
  let offset = 0;
  let showingReturn = false;
  
  $(document).on("keydown", (e) => {
    console.log(e.key);
    let typedCorrect =
    e.key === cont[offset] || (cont[offset] === "\n" && e.key === "Enter");
    if (typedCorrect) {
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
      offset++;
      $current.removeClass("highlighted");
      $current = $current.next("span");
      $current.addClass("highlighted");
    }

    // user typed incorrect key
    else {
      // ignore meta-characters
      const metas = ["Meta", "Shift", "Tab"];
      if (!metas.includes(e.key)) {
      console.log("wrong");
      }
    }
  });
});
