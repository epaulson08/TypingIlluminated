import { timers } from "jquery";
import { Content } from "./models/Content";
import { Marker } from "./models/Marker";
import { Page } from "./models/Page";
import { State } from "./models/State";
import { Timer } from "./models/Timer";

$(document).ready(() => {
  /* Declarations */
  const txt: Content = new Content();
  const page: Page = new Page(txt);
  let state: State = new State(page);
  let mark: Marker = new Marker();
  let timerStarted: boolean = false;
  let timer: Timer;

  $(document).on("keydown", (e) => {
    if (!timerStarted) {
      timer = new Timer();
      timer.start();
      state.addTimer(timer);
      timerStarted = true;
    }

    // prevent browser default of Space causing down-scroll,
    // but do not lock up other metacharacters
    if (e.code === "Space") {
      e.preventDefault();
    }

    /* Core Business Logic */
    state = update(state, e.key, mark);
  });
});

// TODOs:
// Handle "Delete" key
// Handle backspace from first character (highlighter disappears)
// Handle behavior on last character (e.g. when typed incorrectly)
// Fix backspace after return character behavior

function update(state: State, key: string, mark: Marker) {
  // ignore meta-characters
  if (_isMetaCharacter(key)) {
    return state;
  }

  // unpack `state` for readability
  let cont = state.cont;
  let offset = state.offset;
  let mistakeOffset = state.mistakeOffset;
  let isAfterMistake = state.isAfterMistake;
  let isShowingReturn = state.isShowingReturn;
  let $highlighter = state.$highlighter;
  let timer = state.timer;

  if (_isBackspace(key)) {
    offset--;
    mark.pristine($highlighter);
    $highlighter = $highlighter.prev("span");
    if (mistakeOffset === offset) {
      isAfterMistake = false;
      mark.highlighted($highlighter);
    }
  } else if (isAfterMistake) {
    offset++;
    $highlighter = $highlighter.next("span");
    mark.afterMistake($highlighter);
  } else if (_typedCorrect(key, cont, offset)) {
    // for newlines, add return character to cue user to hit enter;
    // remove the symbol when they type the next character
    if (isShowingReturn) {
      $highlighter.html("<span><br /></span>");
      isShowingReturn = false;
    }
    // check for upcoming newline
    if (!isShowingReturn && cont[offset + 1] === "\n") {
      $highlighter.next().html("<span>&#x23CE;<br /></span>");
      isShowingReturn = true;
    }
    if (_isLastCharacter(cont, offset)) {
      $("#complete").text("Finished!");
      mark.correct($highlighter);
      timer.stop();
      _animateVictory();
      return state;
    }
    offset++;
    mark.correct($highlighter);
    $highlighter = $highlighter.next("span");
    mark.highlighted($highlighter);
  } else if (!_typedCorrect(key, cont, offset)) {
    mistakeOffset = offset;
    mark.incorrect($highlighter);
    isAfterMistake = true;
    $highlighter = $highlighter.next("span");
    mark.afterMistake($highlighter);
    offset++;
  } else {
    console.error("This should be unreachable\nstate=" + state.toString());
  }

  // repack `state` and return
  state.cont = cont;
  state.offset = offset;
  state.mistakeOffset = mistakeOffset;
  state.isAfterMistake = isAfterMistake;
  state.isShowingReturn = isShowingReturn;
  state.$highlighter = $highlighter;
  state.timer = timer;

  return state;
}

/* Helper Methods */

// Presentation logic
function _animateVictory() {
  console.log("This will do something soon");
}

// Business logic
function _typedCorrect(key: string, cont: string, offset: number) {
  return key === cont[offset] || (cont[offset] === "\n" && key === "Enter");
}

function _isBackspace(key: string) {
  return key === "Backspace";
}

function _isLastCharacter(cont: string, offset: number) {
  return offset === cont.length - 1;
}

function _isMetaCharacter(key: string) {
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
