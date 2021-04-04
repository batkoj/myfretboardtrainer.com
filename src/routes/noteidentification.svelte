<!-- <script lang="typescript"> -->
<script>
    import { onMount } from 'svelte';
    import Fretboard from '../components/Fretboard.svelte';
    import { getStringByNumber, allNoteLetters, wholeNoteLetters, noteCircles, intervals } from './util.js';
    import { standardTuning }  from './scalesDictionary.js';

    let options;
    let randomNoteLetter;
    let showSuccess = false;
    let successCounter = 0;
    let failureCounter = 0;
    let includeFlats = false;
    
    let stringsIncluded = standardTuning;


    onMount(async () => {
        let isChordMode = true;
        let isDisabled = true;
        
        let numFrets = 12;
        let dimensionsFunc = function ($fretboardContainer, $fretboardBody, settings) {
            let width = jQuery(window).width();
            let height;

            if (width <= 768) {
                height = settings.tuning.length * 26;
            } else {
                height = settings.tuning.length * 32;
            }

            return {
                height: height
            };
        };
        let root = "C";
        let animationSpeed = 400; // ms
        let noteMode = "letter"; // or "interval"
        let clickedNotesChangedFunc = () => {};

        options = {
            tuning: standardTuning,
            numFrets: numFrets,
            isChordMode: isChordMode,
            noteClickingDisabled: isDisabled,
            noteLetters: allNoteLetters,
            noteMode: noteMode,
            intervals: intervals,
            root: root,
            animationSpeed: animationSpeed,
            noteCircles: noteCircles,
            dimensionsFunc: dimensionsFunc,
            notesClickedCallback: clickedNotesChangedFunc
        };

    });
    
    
    function afterFretboardInit() {
        pickRandomNote();
        document.querySelectorAll(".note-display").forEach(x => x.style.visibility = "hidden");
    }
    
    function pickRandomNote() {
        let $fretboard = jQuery(".my-fretboard-js");
        let api = $fretboard.data("api");
        api.clearClickedNotes();
        
        let randomNote = includeFlats ? pickNote(api)[0] : pickNoteUntilWhole(api);

        api.setClickedNotes(randomNote);
    }

    function pickNote(api) {
        // let randomString = standardTuning[Math.floor(Math.random() * standardTuning.length)];
        let randomString = stringsIncluded[Math.floor(Math.random() * stringsIncluded.length)];
        let randomFret = Math.floor(Math.random() * 13);
        randomNoteLetter = api.getNoteByFretNumber(randomString, randomFret).letter;
        let randomNote = [{
            string: randomString, 
            notes: [{fret: randomFret}]
        }];
        return [randomNote, randomNoteLetter];
    }

    function pickNoteUntilWhole(api) {
        let [randomNote, randomNoteLetter] = pickNote(api);
        if (!wholeNoteLetters.some( x => x === randomNoteLetter)) {
             return pickNoteUntilWhole(api)
        }
        return randomNote;
    }
    
    function handleButtonClick(note) {
        let button = document.querySelector("#button" + note.note.replaceAll("#","").replaceAll("/",""));
        if (note.note === randomNoteLetter) {
            showSuccess = true;
            successCounter++;
            button.style.backgroundColor = "#79c779";
            pickRandomNote();
            setTimeout(function () {
                document.querySelectorAll("button[id^='button']").forEach(x => {
                    if (includeFlats && x.id.length < 8) { // whole note
                        x.style.backgroundColor = "#C7C7C7"
                    } else {
                        x.style.backgroundColor = "#efefef"
                    }
            });
                showSuccess = false;
            }, 500);
        } else {
            button.style.backgroundColor = "red";
            failureCounter++;
        }
    }

    function handleIncludedStringClick(stringNr) {
        stringNr = stringNr.stringNr;
        let correspondingString = getStringByNumber(stringNr);
        if (stringsIncluded.includes(correspondingString)) {
            if (stringsIncluded.length === 1) return;
            stringsIncluded = stringsIncluded.filter(x => x != correspondingString);
            document.querySelector("#stringButton" + stringNr).classList.remove("pressed");
        } else {
            stringsIncluded.push(correspondingString);
            document.querySelector("#stringButton" + stringNr).classList.add("pressed");
        }
    }

    $: successPercentage = (successCounter + failureCounter != 0) ? Math.floor(successCounter * 100 / (successCounter + failureCounter)) : 0;
</script>

<svelte:head>
    <title>Note identification</title>
</svelte:head>

<main>
    <h1>Note identification</h1>
    {#if options != undefined}
        <Fretboard options={options} on:fretboardInitialized={afterFretboardInit}/>
    {/if}
    
    <div style="visibility: {showSuccess ? 'visible' : 'hidden'}" id="success">
        CORRECT!
    </div>
    <span>{successCounter} / {failureCounter} ({successPercentage}%)</span>
    

    {#if includeFlats === true}
        <div class="allButtons">
            {#each allNoteLetters as note}
                <button id="button{note.replaceAll("#","").replaceAll("/","")}" class:wholeNote={!note.includes("/")} on:click={() => handleButtonClick({note})}>{note}</button>
            {/each}
        </div>
    {:else}
        <div class="wholeButtons">
            {#each wholeNoteLetters as note}
                <button id="button{note}" on:click={() => handleButtonClick({note})}>{note}</button>
            {/each}
        </div>
    {/if}
    

    <div>
        Include flats/sharps: <input class="includeFlats" type=checkbox bind:checked={includeFlats}>
    </div>
    <div class="stringSelection">
        <span class="includeStringsText">Include strings:</span>
        <div class="stringButtons">
            {#each [1, 2, 3, 4, 5, 6] as stringNr}
                <button class="pressed" id="stringButton{stringNr}" on:click={() => handleIncludedStringClick({stringNr})}>{stringNr}</button>
            {/each}
        </div>
    </div>
</main>

<style>
    #success {
        background-color: #79c779;
        color: white; 
        text-align: center;
    }

    .wholeButtons {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    @media screen and (min-width: 1400px) {
        .wholeButtons {
            padding: 0px 500px;
        }
    }

    .allButtons {
        display: flex;
        justify-content: center;
        margin: 20px 0px 0px 0px;
    }
    .allButtons button {
        margin: 10px 0.2%;
        max-width: 90px;
    }

    .includeFlats {
        margin-top: 50px;
        margin-left: 10px;
    }

    .wholeNote {
        background-color: #C7C7C7;
    }

    .stringSelection {
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .includeStringsText {
        width: 125px;
    }

    .stringButtons {
        margin-left: 10px;
        margin-top: 2px;
    }

    .stringButtons button {
        width: 22px;
        height: 25px;
        margin: 1px;
        padding: 0px;
    }

    .pressed {
        background-color: #969696;
    }
</style>