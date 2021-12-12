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

  // add <br />'s for newlines;
  // 23CE is return character to cue user
  toPresent = toPresent.replace(/\n/g, "&#x23CE;<br />");
  $("#cont").html(toPresent);

  // create highlighter and initialize to first character
  let $current = $("#cont > span:first-child");
  // $current.css("background-color", "yellow");
  $current.addClass("highlighted");

  // listen for keydowns
  let offset = 0;
  $(document).on("keydown", (e) => {
    console.log("typed: " + e.key);
    console.log("expected: " + cont[offset]);
    // user typed correct key
    if (
      e.key === cont[offset] ||
      (cont[offset] === "\n" && e.key === "Enter")
    ) {
      offset++;
      $current.removeClass("highlighted");
      $current = $current.next("span");
      $current.addClass("highlighted");
      // $current.css("background-color", "yellow");
    }

    // user typed incorrect key
    else {
      console.log("wrong");
    }
  });
});
