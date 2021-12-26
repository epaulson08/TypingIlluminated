export class Marker {
  constructor() {}

  correct($element: JQuery<HTMLElement>): JQuery<HTMLElement> {
    $element.addClass("right");
    $element.removeClass("highlighted");
    $element.removeClass("wrong");
    $element.removeClass("after-wrong");
    return $element;
  }

  incorrect($element: JQuery<HTMLElement>): JQuery<HTMLElement> {
    $element.removeClass("right");
    $element.removeClass("highlighted");
    $element.addClass("wrong");
    $element.removeClass("after-wrong");
    return $element;
  }

  highlighted($element: JQuery<HTMLElement>) {
    $element.removeClass("right");
    $element.addClass("highlighted");
    $element.removeClass("wrong");
    $element.removeClass("after-wrong");
  }

  afterMistake($element: JQuery<HTMLElement>) {
    $element.removeClass("right");
    $element.removeClass("highlighted");
    $element.removeClass("wrong");
    $element.addClass("after-wrong");
  }

  pristine($element: JQuery<HTMLElement>) {
    $element.removeClass("right");
    $element.removeClass("highlighted");
    $element.removeClass("wrong");
    $element.removeClass("after-wrong");
  }
}
