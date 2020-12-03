export let standardTuning = [{letter: "E", octave: 4}, {letter: "B", octave: 3}, {letter: "G", octave: 3}, {letter: "D", octave: 3}, {letter: "A", octave: 2}, {letter: "E", octave: 2}];
export let scaleDictionary = new Map();

let rootColor = "blue";

let majorDic = new Map();
let minorDic = new Map();

let cMajorDic = new Map();
cMajorDic.set("caged", [{
                            string: standardTuning[0],
                            notes: [{fret: 0}, {fret: 8, cssClass: rootColor}, {fret: 12}]
                        },
                        {
                            string: standardTuning[1],
                            notes: [{fret: 1, cssClass: rootColor}, {fret: 5}, {fret: 13, cssClass: rootColor}]
                        },
                        {
                            string: standardTuning[2],
                            notes: [{fret: 0}, {fret: 5, cssClass: rootColor}, {fret: 9}, {fret: 12}]
                        },
                        {
                            string: standardTuning[3],
                            notes: [{fret: 2}, {fret: 5}, {fret: 10, cssClass: rootColor}, {fret: 14}]
                        },
                        {
                            string: standardTuning[4],
                            notes: [{fret: 3, cssClass: rootColor}, {fret: 7}, {fret: 10}, {fret: 15, cssClass: rootColor}]
                        },
                        {
                            string: standardTuning[5],
                            notes: [{fret: 8, cssClass: rootColor}]
                        }]
            );
cMajorDic.set("arpeggio", [{
                            string: standardTuning[0], 
                            notes: [{fret: 0}, {fret: 3}, {fret: 8, cssClass: rootColor}, {fret: 12}, {fret: 15}]
                        },
                        {
                            string: standardTuning[1], 
                            notes: [{fret: 1, cssClass: rootColor}, {fret: 5}, {fret: 8}, {fret: 13, cssClass: rootColor}]
                        },
                        {
                            string: standardTuning[2], 
                            notes: [{fret: 0}, {fret: 5, cssClass: rootColor}, {fret: 9}, {fret: 12}]
                        },
                        {
                            string: standardTuning[3], 
                            notes: [{fret: 2}, {fret: 5}, {fret: 10, cssClass: rootColor}, {fret: 14}]
                        },
                        {
                            string: standardTuning[4], 
                            notes: [{fret: 3, cssClass: rootColor}, {fret: 7}, {fret: 10}, {fret: 15, cssClass: rootColor}]
                        },
                        {
                            string: standardTuning[5], 
                            notes: [{fret: 0}, {fret: 3}, {fret: 8, cssClass: rootColor}, {fret: 12}, {fret: 15}]
                        }]
            );

majorDic.set("C", cMajorDic)          
scaleDictionary.set(true, majorDic);
scaleDictionary.set(false, minorDic);