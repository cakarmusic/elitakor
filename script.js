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

  let [, root, accidental, suffix] = match;
  let note = root + (accidental || "");
  let index = notes.indexOf(note);
  if (index === -1) return chord;

  let newIndex = (index + step + notes.length) % notes.length;
  return notes[newIndex] + suffix;
}

function render() {
  const lines = rawSong.split("\n");
  let output = "";

  lines.forEach(line => {
    let chordLine = "";
    let lyricLine = "";
    let i = 0;

    while (i < line.length) {
      if (line[i] === "[") {
        let end = line.indexOf("]", i);
        let chord = line.substring(i + 1, end);
        let tChord = transposeChord(chord, transposeValue);

        chordLine += tChord;
        lyricLine += " ".repeat(tChord.length);
        i = end + 1;
      } else {
        chordLine += " ";
        lyricLine += line[i];
        i++;
      }
    }

    output += chordLine + "\n" + lyricLine + "\n";
  });

  document.getElementById("song").textContent = output;
}

function transpose(step) {
  transposeValue += step;
  render();
}

render();
