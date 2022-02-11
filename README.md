# Typing, Illuminated

## Concept
### Illumination
Medieval monks copied things word-for-word. This had significant monetary value before the printing press. (Printing press also discovered in China first?)

Certain modern authors have done the same thing.

Is it compulsive behavior or helpful to the artistic process?

### Typing
Hone the skills of the trade (ref to The Pragmatic Programmer).

## How to Run
- Clone repo
- Use a local web server to serve content from the project root directory. One way to do this is:
```bash
npx http-server
```
Or, install `http-server`:
```bash
npm install --global http-server
```
Then do
```bash
http-server
```
from the project root directory.

## Steps of the Solution
For this discussion, the text to be typed will be referred to as `cont`.

### Manipulate `cont`
* Take `cont` as plaintext (a string) and add line breaks, by adding `<br />` elements. This was accomplished with a regular expression: `cont = cont.replace(/\n/g, "<br />");`.

* Rather than hardcoding `cont` into the source coode, add a filereading mechanism to convert any plaintext file format (`.txt`, `.js`, `.java`, ...) into a string.

### Add business logic
* Add an event listener to capture the user's typing. Access the character they typed with the `key` attribute of a `keydown` event.

* Within this listener, check whether the key typed matches the highlighted character.

* Keep a count of correct and/or incorrect key entries.

* Add a timer. Measure words per minute (WPM) and accuracy.f

## Figuring it Out (Lessons Learned)
### Accessing the desired value of a keydown event
* `keypress`
* `keycode`
* `key`
* meta characters, capital letters vs shift key, etc.

### Traversing an element character-by-character
At the outset, I (naively) presumed there would be a way to traverse a `cont` element character by character and add a simple style rule like `background-color: yellow;` to highlight the current character.

It is trivial to traverse the characters of the string in JavaScript, but I quickly ran into the problem that the string is contained within a single HTML element.

It occurred to me to wrap each character in a `<span>` element, but this seemed hacky and it seemed inelegant that the resulting markup would look like [example]. I also wondered about the performance implications.

I went on some tangents: 
* Creating an overlay `<span>` that was meaningless for the actual logic of keeping track of the "current" character and comparing it to the user's key entries. This could work in principle, and could separate the concerns of checking for correct entries versus communicating to the user what the "current" character is. But should those really be separate concerns? 

I ran into an issue here with trying to position the overlay correctly. Using a monospaced font, one character should be equal to 8px. In practice, though, the browser rendering was slightly off and the discrepancy worsened with more keypresses. Additionally, it is hard to think of how this could work with a non-monospace font. And, I don't really trust all the different browsers out there to render this in the same way.

Back to wrapping each character in a `<span>`:
Doing some internet investigations, there were people advocating wrapping each character in a `span`. I remained skeptical, but I looked at a popular typing trainer site and indeed found the source looked like ```<span>H</span><span>e</span><span>l</span><span>l</span><span>o</span>

* Splitter.js library-- // TODO

### Vanilla JS versus jQuery
I first implemented the bare minimum functionality in vanilla JS. This was painful: ```[codeblock]```. jQuery turned it into: ```[codeblock]```.

## Future Ideas
* Read in `.rtf` or even `.docx`. Display them with native formatting instead of as plaintext.