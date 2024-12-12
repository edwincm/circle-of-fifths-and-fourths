// Data for the Circle of Fifths
const circleOfFifths = [
    { key: "C", relativeMinor: "Am" },
    { key: "G", relativeMinor: "Em" },
    { key: "D", relativeMinor: "Bm" },
    { key: "A", relativeMinor: "F#m" },
    { key: "E", relativeMinor: "C#m" },
    { key: "B", relativeMinor: "G#m" },
    { key: "F#", relativeMinor: "D#m" },
    { key: "Db", relativeMinor: "Bbm" },
    { key: "Ab", relativeMinor: "Fm" },
    { key: "Eb", relativeMinor: "Cm" },
    { key: "Bb", relativeMinor: "Gm" },
    { key: "F", relativeMinor: "Dm" }
];

// Modes and their intervals
const modes = {
    ionian: [0, 2, 4, 5, 7, 9, 11],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    phrygian: [0, 1, 3, 5, 7, 8, 10],
    lydian: [0, 2, 4, 6, 7, 9, 11],
    mixolydian: [0, 2, 4, 5, 7, 9, 10],
    aeolian: [0, 2, 3, 5, 7, 8, 10],
    locrian: [0, 1, 3, 5, 6, 8, 10]
};

// Scales and chords
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function getScale(root, mode) {
    const rootIndex = notes.indexOf(root);
    return modes[mode].map(interval => notes[(rootIndex + interval) % 12]);
}

function getChords(scale) {
    const qualities = ["", "m", "m", "", "", "m", "dim"];
    return scale.map((note, i) => `${note}${qualities[i]}`);
}

// D3 Visualization
const svg = d3.select("#circle");
const width = 600;
const height = 600;
const radius = 250;

const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

const angleSlice = (2 * Math.PI) / circleOfFifths.length;

circleOfFifths.forEach((keyData, i) => {
    const angle = i * angleSlice - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    g.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "14px")
        .attr("fill", "black")
        .attr("cursor", "pointer")
        .text(keyData.key)
        .on("click", () => updateKey(keyData.key));
});

// Update selected key
function updateKey(key) {
    const mode = document.getElementById("modes").value;
    const scale = getScale(key, mode);
    const chords = getChords(scale);

    document.getElementById("selected-key").textContent = `Selected Key: ${key} ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
    document.getElementById("scale").textContent = scale.join(", ");
    document.getElementById("chords").textContent = chords.join(", ");
}

// Initial render
updateKey("C");

// Mode selection event
document.getElementById("modes").addEventListener("change", () => {
    const key = document.getElementById("selected-key").textContent.split(":")[1].split(" ")[1];
    updateKey(key);
});
