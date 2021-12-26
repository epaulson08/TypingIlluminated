import { Page } from "./Page";

export class State {
  offset;
  isShowingReturn;
  isAfterMistake;
  mistakeOffset;
  $highlighter;
  cont;

  constructor(page: Page) {
    // offset from start of `cont`
    this.offset = 0;

    // will show a return symbol once the user types
    // to the end of a line, then hide it again when they
    // hit enter
    this.isShowingReturn = false;

    // flag to track if user has not yet corrected
    // an incorrectly typed key
    this.isAfterMistake = false;

    // store the offset of the incorrectly typed key
    this.mistakeOffset = 0;

    // make HTML from content; $highlighter is a span
    // element wrapping the first typeable character
    this.$highlighter = page.$firstTypeableCharacter;
    this.cont = page.content.text;
  }

  toString() {
    return `offset: ${this.offset}
isShowingReturn: ${this.isShowingReturn}
isAfterMistake: ${this.isAfterMistake}
mistakeOffset: ${this.mistakeOffset}
$highlighter: ${this.$highlighter.text()}
cont: ${this.cont}`;
  }
}
