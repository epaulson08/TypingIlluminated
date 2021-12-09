let title = "The Second Coming"
let author = "William Butler Yeats"
let cont = 
`Turning and turning in the widening gyre
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
function txtToHtml(txtString) {
    let output = document.createElement('div');
    output.id = 'poem';
    
    let formatted = txtString.split(/\n/);
    let brSpan = document.createElement('span');
    
    
    formatted.forEach(line => {
        let lineElem = document.createElement('span');
        let br = document.createElement('br');
        lineElem.append(line);
   
        output.appendChild(lineElem);
        output.appendChild(br);
    });
    
    console.log(output);
    return output;
}

function logKey(e) {
    console.log(e.code);
    if (e.code === 'KeyA') console.log("That matches 'A'");
    tester.id = 'typedThis';
}

document.addEventListener('keydown', logKey);

let mount = document.getElementById('mount');
let tester = document.getElementById('changeMe');

let titleElem = document.createElement('h1');
titleElem.append(title);
let authorElem = document.createElement('h2');
authorElem.append(author);
let contElem = document.createElement('p');
contElem.appendChild(txtToHtml(cont));

mount.appendChild(titleElem);
mount.appendChild(authorElem);
mount.appendChild(contElem);
