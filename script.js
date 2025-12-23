const notes = ["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"];

let transposeValue = 0;

const rawSong = `
[Am]Gecenin nemimi düşmüş gözlerine
[Am]Ne olur [G]ıslak ıslak bakma [Am]öyle

[Am]Saçını dök [G]sineme derdini [Dm]söyle
[Am]Yeterki [C][G]ıslak ıslak bakma [Am]öyle
`;

function transposeChord(chord, step) {
  const match = chord.match(/^([A-G])(b|#)?(.*)$/);
  if (!match) return chord;

  let [_, root, accidental, suffix] = match;
  let note = root + (accidental || "");
  let index = notes.indexOf(note);

  if (index === -1) return chord;

  let newIndex = (index + step + notes.length) % notes.length;
  return notes[newIndex] + suffix;
}

function render() {
  let output = rawSong.replace(/\[([^\]]+)\]/g, (_, chord) => {
    return `<span class="chord">${transposeChord(chord, transposeValue)}</span>`;
  });

  document.getElementById("song").innerHTML = output;
  document.getElementById("key").innerText =
    transposeValue === 0 ? "Original" : (transposeValue > 0 ? "+"+transposeValue : transposeValue);
}

function transpose(step) {
  transposeValue += step;
  render();
}

render();
