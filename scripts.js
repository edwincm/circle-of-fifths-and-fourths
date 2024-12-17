// Data for the Circle of Fifths
const circleOfFifths = [
    { key: "C", relativeMinor: "Am", diminished: "Bdim" },
    { key: "G", relativeMinor: "Em", diminished: "F#dim" },
    { key: "D", relativeMinor: "Bm", diminished: "C#dim" },
    { key: "A", relativeMinor: "F#m", diminished: "G#dim" },
    { key: "E", relativeMinor: "C#m", diminished: "D#dim" },
    { key: "B", relativeMinor: "G#m", diminished: "A#dim" },
    { key: "F#", relativeMinor: "D#m", diminished: "Fdim" },
    { key: "Db", relativeMinor: "Bbm", diminished: "Cdim" },
    { key: "Ab", relativeMinor: "Fm", diminished: "Gdim" },
    { key: "Eb", relativeMinor: "Cm", diminished: "Ddim" },
    { key: "Bb", relativeMinor: "Gm", diminished: "Adim" },
    { key: "F", relativeMinor: "Dm", diminished: "Edim" }
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
const notes = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

function getScale(root, mode) {
    const rootIndex = notes.indexOf(root);
    return modes[mode].map(interval => notes[(rootIndex + interval) % 12]);
}

function getChords(scale) {
    const qualities = ["", "m", "m", "", "", "m", "dim"];
    return scale.map((note, i) => `${note}${qualities[i]}`);
}

// D3 Visualization
const g = d3.select("#circle");
const maj_width = 400;
const maj_height = 400;
const maj_radius = 100;

const maj = g.append("g").attr("transform", `translate(${maj_width / 2}, ${maj_height / 2})`);

const angleSlice = (2 * Math.PI) / circleOfFifths.length;

circleOfFifths.forEach((keyData, i) => {
    const angle = i * angleSlice - Math.PI / 2;
    const x = maj_radius * Math.cos(angle);
    const y = maj_radius * Math.sin(angle);

    maj.append("text")
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

// D3 Visualization
const minor = d3.select("#circle");
const min_width = 500;
const min_height = 500;
const min_radius = 200;

const min = g.append("g").attr("transform", `translate(${min_width / 2}, ${min_height / 2})`);

circleOfFifths.forEach((keyData, i) => {
    const angle = i * angleSlice - Math.PI / 2;
    const m = min_radius * Math.cos(angle);
    const n = min_radius * Math.sin(angle);

    maj.append("text")
        .attr("x", m)
        .attr("y", n)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "14px")
        .attr("fill", "black")
        .attr("cursor", "pointer")
        .text(keyData.relativeMinor);
        // .on("click", () => updateKey(keyData.relativeMinor));
});

// D3 Visualization
const diminished = d3.select("#circle");
const dim_width = 300;
const dim_height = 300;
const dim_radius = 1500;

const dim = g.append("g").attr("transform", `translate(${dim_width / 2}, ${dim_height / 2})`);

circleOfFifths.forEach((keyData, i) => {
    const angle = i * angleSlice - Math.PI / 2;
    const p = dim_radius * Math.cos(angle);
    const q = dim_radius * Math.sin(angle);

    maj.append("text")
        .attr("x", p)
        .attr("y", q)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "14px")
        .attr("fill", "black")
        .attr("cursor", "pointer")
        .text(keyData.diminished);
        // .on("click", () => updateKey(keyData.key));
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
