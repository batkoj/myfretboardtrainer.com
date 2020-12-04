export let standardTuning = [{letter: "E", octave: 4}, {letter: "B", octave: 3}, {letter: "G", octave: 3}, {letter: "D", octave: 3}, {letter: "A", octave: 2}, {letter: "E", octave: 2}];
export let scaleDictionary = new Map();

let defaultNoteColor = "defaultNoteColor";
let rootColor = "rootColor";
let blueNote = "blue";

let baseForCagedInCMajor = [{string: standardTuning[0], notes: [{fret: 0}, {fret: 8, cssClass: rootColor}]},
                        {string: standardTuning[1], notes: [{fret: 1, cssClass: rootColor}, {fret: 5}]},
                        {string: standardTuning[2], notes: [{fret: 0}, {fret: 5, cssClass: rootColor}, {fret: 9}]},
                        {string: standardTuning[3], notes: [{fret: 2}, {fret: 5}, {fret: 10, cssClass: rootColor}]},
                        {string: standardTuning[4], notes: [{fret: 3, cssClass: rootColor}, {fret: 7}, {fret: 10}]},
                        {string: standardTuning[5], notes: [{fret: 8, cssClass: rootColor}]}];
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

                    

let majorDictionary = new Map();
majorDictionary.set("C", createDictionaryFromCMajorBases());
majorDictionary.set("D", createDictionaryFromCMajorBases(2));
majorDictionary.set("E", createDictionaryFromCMajorBases(4));
majorDictionary.set("F", createDictionaryFromCMajorBases(5));
majorDictionary.set("G", createDictionaryFromCMajorBases(7));
majorDictionary.set("A", createDictionaryFromCMajorBases(9));
majorDictionary.set("B", createDictionaryFromCMajorBases(11));
scaleDictionary.set(true, majorDictionary);
let minorDic = new Map();
scaleDictionary.set(false, minorDic);



function createDictionaryFromCMajorBases(numberOfFretsToMoveBase = 0) {
    let oneKeyDictionary = new Map();
    oneKeyDictionary.set("caged", fillInMissingData(moveBaseForward(baseForCagedInCMajor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("arpeggio", fillInMissingData(moveBaseForward(baseForArpeggioInCMajor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("pentatonic", fillInMissingData(moveBaseForward(baseForPentatonicInCMajor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("blues", fillInMissingData(moveBaseForward(baseForBluesInCMajor, numberOfFretsToMoveBase)));
    oneKeyDictionary.set("scale", fillInMissingData(moveBaseForward(baseForScaleCMajor, numberOfFretsToMoveBase)));
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