export let standardTuning = [{letter: "E", octave: 4}, {letter: "B", octave: 3}, {letter: "G", octave: 3}, {letter: "D", octave: 3}, {letter: "A", octave: 2}, {letter: "E", octave: 2}];
export let scaleDictionary = new Map();

let defaultNoteColor = "defaultNoteColor";
let rootColor = "rootColor";
let blueNote = "blue";

let cMajorDic = new Map();
cMajorDic.set("caged", [{string: standardTuning[0], notes: [{fret: 0}, {fret: 8, cssClass: rootColor}]},
                        {string: standardTuning[1], notes: [{fret: 1, cssClass: rootColor}, {fret: 5}]},
                        {string: standardTuning[2], notes: [{fret: 0}, {fret: 5, cssClass: rootColor}, {fret: 9}]},
                        {string: standardTuning[3], notes: [{fret: 2}, {fret: 5}, {fret: 10, cssClass: rootColor}]},
                        {string: standardTuning[4], notes: [{fret: 3, cssClass: rootColor}, {fret: 7}, {fret: 10}]},
                        {string: standardTuning[5], notes: [{fret: 8, cssClass: rootColor}]}]);
cMajorDic.set("arpeggio", [{ string: standardTuning[0], notes: [{fret: 0}, {fret: 3}, {fret: 8, cssClass: rootColor}]},
                        {string: standardTuning[1], notes: [{fret: 1, cssClass: rootColor}, {fret: 5}, {fret: 8}]},
                        {string: standardTuning[2], notes: [{fret: 0}, {fret: 5, cssClass: rootColor}, {fret: 9}]},
                        {string: standardTuning[3], notes: [{fret: 2}, {fret: 5}, {fret: 10, cssClass: rootColor}]},
                        {string: standardTuning[4], notes: [{fret: 3, cssClass: rootColor}, {fret: 7}, {fret: 10}]}]);
cMajorDic.set("pentatonic", [{string: standardTuning[0], notes: [{fret: 0}, {fret: 3}, {fret: 5}, {fret: 8, cssClass: rootColor}, {fret: 10}]},
                        {string: standardTuning[1], notes: [{fret: 1, cssClass: rootColor}, {fret: 3}, {fret: 5}, {fret: 8}, {fret: 10}]},
                        {string: standardTuning[2], notes: [{fret: 0}, {fret: 2}, {fret: 5, cssClass: rootColor}, {fret: 7}, {fret: 9}]},
                        {string: standardTuning[3], notes: [{fret: 0}, {fret: 2}, {fret: 5}, {fret: 7}, {fret: 10, cssClass: rootColor}]},
                        {string: standardTuning[4], notes: [{fret: 0}, {fret: 3, cssClass: rootColor}, {fret: 5}, {fret: 7}, {fret: 10}]}]);
cMajorDic.set("blues", [{string: standardTuning[0], notes: [{fret: 0}, {fret: 3}, {fret: 5}, {fret: 8, cssClass: rootColor}, {fret: 10}, {fret: 11, cssClass: blueNote}]},
                        {string: standardTuning[1], notes: [{fret: 1, cssClass: rootColor}, {fret: 3}, {fret: 4, cssClass: blueNote}, {fret: 5}, {fret: 8}, {fret: 10}]},
                        {string: standardTuning[2], notes: [{fret: 0}, {fret: 2}, {fret: 5, cssClass: rootColor}, {fret: 7}, {fret: 8, cssClass: blueNote}, {fret: 9}]},
                        {string: standardTuning[3], notes: [{fret: 0}, {fret: 1, cssClass: blueNote}, {fret: 2}, {fret: 5}, {fret: 7}, {fret: 10, cssClass: rootColor}]},
                        {string: standardTuning[4], notes: [{fret: 0}, {fret: 3, cssClass: rootColor}, {fret: 5}, {fret: 6, cssClass: blueNote}, {fret: 7}, {fret: 10}]}]);
cMajorDic.set("scale", [{string: standardTuning[0], notes: [{fret: 0}, {fret: 1}, {fret: 3}, {fret: 5}, {fret: 7}, {fret: 8, cssClass: rootColor}, {fret: 10}]},
                        {string: standardTuning[1], notes: [{fret: 0}, {fret: 1, cssClass: rootColor}, {fret: 3}, {fret: 5}, {fret: 6}, {fret: 8}, {fret: 10}]},
                        {string: standardTuning[2], notes: [{fret: 0}, {fret: 2}, {fret: 4}, {fret: 5, cssClass: rootColor}, {fret: 7}, {fret: 9}, {fret: 10}]},
                        {string: standardTuning[3], notes: [{fret: 0}, {fret: 2}, {fret: 3}, {fret: 5}, {fret: 7}, {fret: 9}, {fret: 10, cssClass: rootColor}]},
                        {string: standardTuning[4], notes: [{fret: 0}, {fret: 2}, {fret: 3, cssClass: rootColor}, {fret: 5}, {fret: 7}, {fret: 8}, {fret: 10}]}]);


fillInMissingData(cMajorDic.get("caged"));
fillInMissingData(fillIn6thString(cMajorDic.get("arpeggio")));
fillInMissingData(fillIn6thString(cMajorDic.get("pentatonic")));
fillInMissingData(fillIn6thString(cMajorDic.get("blues")));
fillInMissingData(fillIn6thString(cMajorDic.get("scale")));

let majorDic = new Map();
majorDic.set("C", cMajorDic);
majorDic.set("D", moveScaleForward(cMajorDic,2));
scaleDictionary.set(true, majorDic);
let minorDic = new Map();
scaleDictionary.set(false, minorDic);




// fill in undefined CSS and fill in frets beyond 11
function fillInMissingData(scale) {
    // if cssClass is undefined on the note -> fill it with default note color
    scale.forEach(stringNotes => {
        stringNotes.notes.forEach(note => {
            if (note.cssClass === undefined) {
                note.cssClass = defaultNoteColor;
            }});
        });

    for (let fret = 0; fret < 4; fret++) { // first 4 frets
        for (let string = 0; string < 6; string++) { // 6 string
            let currentScaleNotes = scale[string].notes;
            let notefound = currentScaleNotes.find(note => note.fret === fret);
            if (notefound) {
                // console.log(`Fret ${fret} String ${string} Note found: ${JSON.stringify(notefound)}`);
                let newNote = {...notefound};
                newNote.fret = notefound.fret + 12;
                currentScaleNotes.push(newNote);
            }
        }
    }
}

function fillIn6thString(scale) {
    let newStringNote = {...scale[0]}
    newStringNote.string = standardTuning[5];
    scale.push(newStringNote);
    return scale;
}

function moveScaleForward(scale, numberOfFrets) {
    console.log(scale);
    // let newScale = scale.forEach(stringNotes => JSON.parse(JSON.stringify(stringNotes)));
    // console.log(Array.from(scale));
    // let newScale = new Map(Array.from(scale).map(([key, value]) => ({ key, value })));
    // var newScale = Array.from(scale.values(), value => value);
    // console.log(newScale);

    // scale.forEach(sc => {
    //     sc.forEach(stringNotes => {
    //         stringNotes.notes.forEach(note => {
    //             // note.fret = note.fret + numberOfFrets;
    //         });
    //     });
    // });
    // console.log(scale);
    return scale;
}