import { Content } from "./Content";

export class Page {
  content: Content;
  $firstTypeableCharacter;

  constructor(content: Content) {
    this.content = content;

    $("h1.title").text(content.title);
    $("h2.author").text(content.author);

    // `content.text` will remain the original string
    // `toPresent` will be a copy that is changed to
    // html
    let toPresent = content.text;

    // add span wrapper to every character
    toPresent = this.spanify(toPresent);

    // add <br />'s for newlines
    toPresent = toPresent.replace(/\n/g, "<br />");
    $("#cont").html(toPresent);

    // initialize highlighter
    this.$firstTypeableCharacter = $("#cont > span:first-child");
    this.$firstTypeableCharacter.addClass("highlighted");
  }

  private spanify(str: string): string {

    let toReturn = str.split("");
    for (let i = 0; i < toReturn.length; i++) {
      toReturn.splice(i, 1, `<span>${toReturn[i]}</span>`);
    }
    // change back from array to string
    return toReturn.join("");
  }
}
