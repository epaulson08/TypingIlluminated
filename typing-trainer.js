$(document).ready(() => {
  const title = "The Second Coming";
  const author = "William Butler Yeats";
  let cont = `Turning and turning in the widening gyre
The falcon cannot hear the falconer;
Things fall apart; the centre cannot hold;
Mere anarchy is loosed upon the world,
The blood-dimmed tide is loosed, and everywhere
The ceremony of innocence is drowned;
The best lack all conviction, while the worst   
Are full of passionate intensity.

Surely some revelation is at hand;
Surely the Second Coming is at hand.
The Second Coming! Hardly are those words out
When a vast image out of Spiritus Mundi
Troubles my sight: somewhere in sands of the desert
A shape with lion body and the head of a man,
A gaze blank and pitiless as the sun,
Is moving its slow thighs, while all about it
Reel shadows of the indignant desert birds.
The darkness drops again; but now I know
That twenty centuries of stony sleep
Were vexed to nightmare by a rocking cradle,
And what rough beast, its hour come round at last,   
Slouches towards Bethlehem to be born?`;

  // add <br />'s to poem
  cont = cont.replace(/\n/g, "<br />");

  // generate initial content
  $("#mount").html(`<h1>${title}</h1><h2>${author}</h2><p>${cont}</p>`);

  // listen for keydowns
  $(document).on("keydown", (e) => {
    console.log(e.key);
  });
});
