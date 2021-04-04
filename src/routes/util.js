import { standardTuning }  from './scalesDictionary.js';

export let allNoteLetters = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
export let wholeNoteLetters = ["C", "D", "E", "F", "G", "A", "B"];
export let noteCircles = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
export let intervals = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"];

export let getStringNumber = (string) => {
    if (string.letter === 'E') {
        if (string.octave === 2) {
            return 6;
        } else {
            return 1;
        }
    } else if (string.letter === 'B') {
        return 2;
    } else if (string.letter === 'G') {
        return 3;
    } else if (string.letter === 'D') {
        return 4;
    } else if (string.letter === 'A') {
        return 5;
    }
}

export let getStringByNumber = (num) => {
    return standardTuning[num-1];
}




