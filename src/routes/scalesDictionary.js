export let standardTuning = [{letter: "E", octave: 4}, {letter: "B", octave: 3}, {letter: "G", octave: 3}, {letter: "D", octave: 3}, {letter: "A", octave: 2}, {letter: "E", octave: 2}];
export let scaleDictionary = new Map();

let defaultNoteColor = "defaultNoteColor";
let rootColor = "rootColor";
let blueNote = "blue";
let CColor = "CColor";
let CAColor = "CAColor";
let AColor = "AColor";
let AGColor = "AGColor";
let GColor = "GColor";
let GEColor = "GEColor";
let EColor = "EColor";
let EDColor = "EDColor";
let DColor = "DColor";
let DCColor = "DCColor";

let baseForCagedInCMajor = [{string: standardTuning[0], notes: [{fret: 0, cssClass: DCColor}, {fret: 3, cssClass: AColor}, {fret: 8, cssClass: GEColor}]},
                        {string: standardTuning[1], notes: [{fret: 1, cssClass: DCColor}, {fret: 5, cssClass: AGColor}, {fret: 8, cssClass: EColor}]},
                        {string: standardTuning[2], notes: [{fret: 0, cssClass: DCColor}, {fret: 5, cssClass: AGColor}, {fret: 9, cssClass: EColor}]},
                        {string: standardTuning[3], notes: [{fret: 2, cssClass: CColor}, {fret: 5, cssClass: AGColor}, {fret: 10, cssClass: EDColor}]},
                        {string: standardTuning[4], notes: [{fret: 3, cssClass: CAColor}, {fret: 7, cssClass: GColor}, {fret: 10, cssClass: EColor}]},
                        {string: standardTuning[5], notes: [{fret: 8, cssClass: GEColor}]}];
let baseForArpeggioInCMajor = fillIn6thString([{ string: standardTuning[0], notes: [{fret: 0}, {fret: 3}, {fret: 8, cssClass: rootColor}]},
                        {string: standardTuning[1], notes: [{fret: 1, cssClass: rootColor}, {fret: 5}, {fret: 8}]},
                        {string: standardTuning[2], notes: [{fret: 0}, {fret: 5, cssClass: rootColor}, {fret: 9}]},
                        {string: standardTuning[3], notes: [{fret: 2}, {fret: 5}, {fret: 10, cssClass: rootColor}]},
                        {string: standardTuning[4], notes: [{fret: 3, cssClass: rootColor}, {fret: 7}, {fret: 10}]}]);
let baseForPentatonicInCMajor = fillIn6thString([{string: standardTuning[0], notes: [{fret: 0}, {fret: 3}, {fret: 5}, {fret: 8, cssClass: rootColor}, {fret: 10}]},
                            {string: standardTuning[1], notes: [{fret: 1, cssClass: rootColor}, {fret: 3}, {fret: 5}, {fret: 8}, {fret: 10}]},
                            {string: standardTuning[2], notes: [{fret: 0}, {fret: 2}, {fret: 5, cssClass: rootColor}, {fret: 7}, {fret: 9}]},
                            {string: standardTuning[3], notes: [{fret: 0}, {fret: 2}, {fret: 5}, {fret: 7}, {fret: 10, cssClass: rootColor}]},
                            {string: standardTuning[4], notes: [{fret: 0}, {fret: 3, cssClass: rootColor}, {fret: 5}, {fret: 7}, {fret: 10}]}]);
let baseForBluesInCMajor = fillIn6thString([{string: standardTuning[0], notes: [{fret: 0}, {fret: 3}, {fret: 5}, {fret: 8, cssClass: rootColor}, {fret: 10}, {fret: 11, cssClass: blueNote}]},
                        {string: standardTuning[1], notes: [{fret: 1, cssClass: rootColor}, {fret: 3}, {fret: 4, cssClass: blueNote}, {fret: 5}, {fret: 8}, {fret: 10}]},
                        {string: standardTuning[2], notes: [{fret: 0}, {fret: 2}, {fret: 5, cssClass: rootColor}, {fret: 7}, {fret: 8, cssClass: blueNote}, {fret: 9}]},
                        {string: standardTuning[3], notes: [{fret: 0}, {fret: 1, cssClass: blueNote}, {fret: 2}, {fret: 5}, {fret: 7}, {fret: 10, cssClass: rootColor}]},
                        {string: standardTuning[4], notes: [{fret: 0}, {fret: 3, cssClass: rootColor}, {fret: 5}, {fret: 6, cssClass: blueNote}, {fret: 7}, {fret: 10}]}]);
let baseForScaleCMajor = fillIn6thString([{string: standardTuning[0], notes: [{fret: 0}, {fret: 1}, {fret: 3}, {fret: 5}, {fret: 7}, {fret: 8, cssClass: rootColor}, {fret: 10}]},
                    {string: standardTuning[1], notes: [{fret: 0}, {fret: 1, cssClass: rootColor}, {fret: 3}, {fret: 5}, {fret: 6}, {fret: 8}, {fret: 10}]},
                    {string: standardTuning[2], notes: [{fret: 0}, {fret: 2}, {fret: 4}, {fret: 5, cssClass: rootColor}, {fret: 7}, {fret: 9}, {fret: 10}]},
                    {string: standardTuning[3], notes: [{fret: 0}, {fret: 2}, {fret: 3}, {fret: 5}, {fret: 7}, {fret: 9}, {fret: 10, cssClass: rootColor}]},
                    {string: standardTuning[4], notes: [{fret: 0}, {fret: 2}, {fret: 3, cssClass: rootColor}, {fret: 5}, {fret: 7}, {fret: 8}, {fret: 10}]}]);

let baseForCagedInAMinor = [{string: standardTuning[0], notes: [{fret: 0, cssClass: CAColor}, {fret: 5, cssClass: GEColor}, {fret: 8, cssClass: DColor}]},
                            {string: standardTuning[1], notes: [{fret: 1, cssClass: AColor}, {fret: 5, cssClass: GEColor}, {fret: 10, cssClass: DCColor}]},
                            {string: standardTuning[2], notes: [{fret: 2, cssClass: AGColor}, {fret: 5, cssClass: EColor}, {fret: 9, cssClass: DCColor}]},
                            {string: standardTuning[3], notes: [{fret: 2, cssClass: AGColor}, {fret: 7, cssClass: EDColor}, {fret: 10, cssClass: CColor}]},
                            {string: standardTuning[4], notes: [{fret: 0, cssClass: CAColor}, {fret: 3, cssClass: GColor}, {fret: 7, cssClass: EColor}]},
                            {string: standardTuning[5], notes: [{fret: 5, cssClass: GEColor}]}];
let baseForArpeggioInAMinor = fillIn6thString([{string: standardTuning[0], notes: [{fret: 0}, {fret: 5, cssClass: rootColor}, {fret: 8}]},
                    {string: standardTuning[1], notes: [{fret: 1}, {fret: 5}, {fret: 10, cssClass: rootColor}]},
                    {string: standardTuning[2], notes: [{fret: 2, cssClass: rootColor}, {fret: 5}, {fret: 9}]},
                    {string: standardTuning[3], notes: [{fret: 2}, {fret: 7, cssClass: rootColor}, {fret: 10}]},
                    {string: standardTuning[4], notes: [{fret: 0, cssClass: rootColor}, {fret: 3}, {fret: 7}]}]);
let baseForPentatonicInAMinor = fillIn6thString([{string: standardTuning[0], notes: [{fret: 0}, {fret: 3}, {fret: 5, cssClass: rootColor}, {fret: 8}, {fret: 10}]},
                            {string: standardTuning[1], notes: [{fret: 1}, {fret: 3}, {fret: 5}, {fret: 8}, {fret: 10, cssClass: rootColor}]},
                            {string: standardTuning[2], notes: [{fret: 0}, {fret: 2, cssClass: rootColor}, {fret: 5}, {fret: 7}, {fret: 9}]},
                            {string: standardTuning[3], notes: [{fret: 0}, {fret: 2}, {fret: 5}, {fret: 7, cssClass: rootColor}, {fret: 10}]},
                            {string: standardTuning[4], notes: [{fret: 0, cssClass: rootColor}, {fret: 3}, {fret: 5}, {fret: 7}, {fret: 10}]}]);
let baseForBluesInAMinor = fillIn6thString([{string: standardTuning[0], notes: [{fret: 0}, {fret: 3}, {fret: 5, cssClass: rootColor}, {fret: 8}, {fret: 10}, {fret: 11, cssClass: blueNote}]},
                        {string: standardTuning[1], notes: [{fret: 1}, {fret: 3}, {fret: 4, cssClass: blueNote}, {fret: 5}, {fret: 8}, {fret: 10, cssClass: rootColor}]},
                        {string: standardTuning[2], notes: [{fret: 0}, {fret: 2, cssClass: rootColor}, {fret: 5}, {fret: 7}, {fret: 8, cssClass: blueNote}, {fret: 9}]},
                        {string: standardTuning[3], notes: [{fret: 0}, {fret: 1, cssClass: blueNote}, {fret: 2}, {fret: 5}, {fret: 7, cssClass: rootColor}, {fret: 10}]},
                        {string: standardTuning[4], notes: [{fret: 0, cssClass: rootColor}, {fret: 3}, {fret: 5}, {fret: 6, cssClass: blueNote}, {fret: 7}, {fret: 10}]}]);
let baseForScaleAMinor = fillIn6thString([{string: standardTuning[0], notes: [{fret: 0}, {fret: 1}, {fret: 3}, {fret: 5, cssClass: rootColor}, {fret: 7}, {fret: 8}, {fret: 10}]},
                    {string: standardTuning[1], notes: [{fret: 0}, {fret: 1}, {fret: 3}, {fret: 5}, {fret: 6}, {fret: 8}, {fret: 10, cssClass: rootColor}]},
                    {string: standardTuning[2], notes: [{fret: 0}, {fret: 2, cssClass: rootColor}, {fret: 4}, {fret: 5}, {fret: 7}, {fret: 9}, {fret: 10}]},
                    {string: standardTuning[3], notes: [{fret: 0}, {fret: 2}, {fret: 3}, {fret: 5}, {fret: 7, cssClass: rootColor}, {fret: 9}, {fret: 10}]},
                    {string: standardTuning[4], notes: [{fret: 0, cssClass: rootColor}, {fret: 2}, {fret: 3}, {fret: 5}, {fret: 7}, {fret: 8}, {fret: 10}]}]);

let majorDictionary = new Map();
majorDictionary.set("C", createDictionaryFromCMajorBases());
majorDictionary.set("D", createDictionaryFromCMajorBases(2));
majorDictionary.set("E", createDictionaryFromCMajorBases(4));
majorDictionary.set("F", createDictionaryFromCMajorBases(5));
majorDictionary.set("G", createDictionaryFromCMajorBases(7));
majorDictionary.set("A", createDictionaryFromCMajorBases(9));
majorDictionary.set("B", createDictionaryFromCMajorBases(11));
scaleDictionary.set(true, majorDictionary);
let minorDictionary = new Map();
minorDictionary.set("A", createDictionaryFromAminorBases());
minorDictionary.set("B", createDictionaryFromAminorBases(2));
minorDictionary.set("C", createDictionaryFromAminorBases(3));
minorDictionary.set("D", createDictionaryFromAminorBases(5));
minorDictionary.set("E", createDictionaryFromAminorBases(7));
minorDictionary.set("F", createDictionaryFromAminorBases(8));
minorDictionary.set("G", createDictionaryFromAminorBases(10));
scaleDictionary.set(false, minorDictionary);



function createDictionaryFromCMajorBases(numberOfFretsToMoveBase = 0) {
    let oneKeyDictionary = new Map();
    oneKeyDictionary.set("caged", fillInMissingData(moveBaseForward(baseForCagedInCMajor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("arpeggio", fillInMissingData(moveBaseForward(baseForArpeggioInCMajor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("pentatonic", fillInMissingData(moveBaseForward(baseForPentatonicInCMajor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("blues", fillInMissingData(moveBaseForward(baseForBluesInCMajor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("scale", fillInMissingData(moveBaseForward(baseForScaleCMajor, numberOfFretsToMoveBase)));
    return oneKeyDictionary;
}

function createDictionaryFromAminorBases(numberOfFretsToMoveBase = 0) {
    let oneKeyDictionary = new Map();
    oneKeyDictionary.set("caged", fillInMissingData(moveBaseForward(baseForCagedInAMinor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("arpeggio", fillInMissingData(moveBaseForward(baseForArpeggioInAMinor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("pentatonic", fillInMissingData(moveBaseForward(baseForPentatonicInAMinor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("blues", fillInMissingData(moveBaseForward(baseForBluesInAMinor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("scale", fillInMissingData(moveBaseForward(baseForScaleAMinor, numberOfFretsToMoveBase)));
    return oneKeyDictionary;
}

// fill in undefined CSS and fill in frets beyond 11
function fillInMissingData(base) {
    let scale = JSON.parse(JSON.stringify(base));
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
                let newNote = {...notefound};
                newNote.fret = notefound.fret + 12;
                currentScaleNotes.push(newNote);
            }
        }
    }
    return scale;
}

function fillIn6thString(base) {
    let newBase = JSON.parse(JSON.stringify(base));
    let newStringNote = {...newBase[0]}
    newStringNote.string = standardTuning[5];
    newBase.push(newStringNote);
    return newBase;
}

function moveBaseForward(base, numberOfFrets) {
    let newBase = JSON.parse(JSON.stringify(base));
    newBase.forEach(stringNotes => {
        stringNotes.notes.forEach(note => {
            note.fret = (note.fret + numberOfFrets) % 12;
        });
    });
    return newBase;
}


// notes and intervals for the interval table at the bottom
majorDictionary.get("C").set("notes", ["C", "D", "E", "F", "G", "A", "B"]);
majorDictionary.get("C").set("blues_notes", ["C", "D", "Eb", "E", "F", "G", "A", "B"]);
majorDictionary.get("D").set("notes", ["D", "E", "F#", "G", "A", "B", "C#"]);
majorDictionary.get("D").set("blues_notes", ["D", "E", "F", "F#", "G", "A", "B", "C#"]);
majorDictionary.get("E").set("notes", ["E", "F#", "G#", "A", "B", "C#", "D#"]);
majorDictionary.get("E").set("blues_notes", ["E", "F#", "G", "G#", "A", "B", "C#", "D#"]);
majorDictionary.get("F").set("notes", ["F", "G", "A", "Bb", "C", "D", "E"]);
majorDictionary.get("F").set("blues_notes", ["F", "G", "Ab", "A", "Bb", "C", "D", "E"]);
majorDictionary.get("G").set("notes", ["G", "A", "B", "C", "D", "E", "F#"]);
majorDictionary.get("G").set("blues_notes", ["G", "A", "Bb", "B", "C", "D", "E", "F#"]);
majorDictionary.get("A").set("notes", ["A", "B", "C#", "D", "E", "F#", "G#"]);
majorDictionary.get("A").set("blues_notes", ["A", "B", "C", "C#", "D", "E", "F#", "G#"]);
majorDictionary.get("B").set("notes", ["B", "C#", "D#", "E", "F#", "G#", "A#"]);
majorDictionary.get("B").set("blues_notes", ["B", "C#", "D", "D#", "E", "F#", "G#", "A#"]);

majorDictionary.set("arpeggio_intervals", ["1", "", "3", "", "5", "", ""]);
majorDictionary.set("pentatonic_intervals", ["1", "2", "3", "", "5", "6", ""]);
majorDictionary.set("blues_intervals", ["1", "2", "b3", "3", "", "5", "6", ""]);
majorDictionary.set("scale_intervals", ["1", "2", "3", "4", "5", "6", "7"]);


minorDictionary.get("C").set("notes", ["C", "D", "Eb", "F", "G", "Ab", "Bb"]);
minorDictionary.get("C").set("blues_notes", ["C", "D", "Eb", "F", "Gb", "G", "Ab", "Bb"]);
minorDictionary.get("D").set("notes", ["D", "E", "F", "G", "A", "Bb", "C"]);
minorDictionary.get("D").set("blues_notes", ["D", "E", "F", "G", "Ab", "A", "Bb", "C"]);
minorDictionary.get("E").set("notes", ["E", "F#", "G", "A", "B", "C", "D"]);
minorDictionary.get("E").set("blues_notes", ["E", "F#", "G", "A", "Bb", "B", "C", "D"]);
minorDictionary.get("F").set("notes", ["F", "G", "Ab", "Bb", "C", "Db", "Eb"]);
minorDictionary.get("F").set("blues_notes", ["F", "G", "Ab", "Bb", "Cb", "C", "Db", "Eb"]);
minorDictionary.get("G").set("notes", ["G", "A", "Bb", "C", "D", "Eb", "F"]);
minorDictionary.get("G").set("blues_notes", ["G", "A", "Bb", "C", "Db", "D", "Eb", "F"]);
minorDictionary.get("A").set("notes", ["A", "B", "C", "D", "E", "F", "G"]);
minorDictionary.get("A").set("blues_notes", ["A", "B", "C", "D", "Eb", "E", "F", "G"]);
minorDictionary.get("B").set("notes", ["B", "C#", "D", "E", "F#", "G", "A"]);
minorDictionary.get("B").set("blues_notes", ["B", "C#", "D", "E", "F", "F#", "G", "A"]);

minorDictionary.set("arpeggio_intervals", ["1", "", "b3", "", "5", "", ""]);
minorDictionary.set("pentatonic_intervals", ["1", "", "b3", "4", "5", "", "b7"]);
minorDictionary.set("blues_intervals", ["1", "", "b3", "4", "b5", "5", "", "b7"]);
minorDictionary.set("scale_intervals", ["1", "2", "b3", "4", "5", "b6", "b7"]);