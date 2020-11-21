<script>
    // import jQuery from 'jQuery';
    import { onMount } from 'svelte';
    import { blur, fade, fly } from 'svelte/transition';
	import Fretboard from '../components/Fretboard.svelte';

    

    let options;
    let randomString;
    // using object because {note:"A"} != {note:"A"} - for transitions
    let randomNote = {note:""};
    let showSuccess = false;
    let successCounter = 0;
    let failureCounter = 0;

    let allNoteLetters = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "Ab/G#", "A", "A#/Bb", "B"];
    let noteLettersToPickFrom = ["C", "D", "E", "F", "G", "A", "B"];

	onMount(async () => {
        // const jQuery = window.$;

        var isChordMode = true;
        var isDisabled = false;
        
        var standardTuning = [{
            letter: "E",
            octave: 4
        }, {
            letter: "B",
            octave: 3
        }, {
            letter: "G",
            octave: 3
        }, {
            letter: "D",
            octave: 3
        }, {
            letter: "A",
            octave: 2
        }, {
            letter: "E",
            octave: 2
        }];
        var numFrets = 12;
        var dimensionsFunc = function ($fretboardContainer, $fretboardBody, settings) {
            var width = jQuery(window).width();
            var height;

            if (width <= 768) {
                height = settings.tuning.length * 26;
            } else {
                height = settings.tuning.length * 32;
            }

            return {
                height: height
            };
        };
        var noteCircles = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
        var intervals = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"];
        var root = "C";
        var animationSpeed = 400; // ms
        var noteMode = "letter"; // or "interval"



        var clickedNotesChangedFunc = function () {
            var $fretboard = jQuery(".my-fretboard-js");
            var api = $fretboard.data("api");
            var clickedNotes = api.getClickedNotes();
            var clickedNoteLetters = clickedNotes.map(function (e) {
                return e.notes[0].letter;
            });

            let first = clickedNotes[0];
            if (first != null) {
                var clickedString = first.string;
                if (clickedNoteLetters[0] === randomNote.note && randomString === getStringNumber(clickedString)) {
                    showSuccess = true;
                    successCounter++;
                    afterFretboardInit();

                    setTimeout(function () {
                        api.clearClickedNotes();
                        showSuccess = false;
                    }, 1000);

                } else {
                    failureCounter++;
                    setTimeout(function () {
                        api.clearClickedNotes();
                    }, 400);
                }
            }
        }

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
    

    
    const afterFretboardInit = () => {
        highlightRandomString();
        pickRandomNote();
    }

    let highlightRandomString = () => {
        jQuery(".string").css("background-color", "white");
        randomString = Math.floor(Math.random() * 6) + 1;
        jQuery("#string" + randomString).css("background-color", "#00d5ff");
    }

    let pickRandomNote = () => {
        randomNote.note = noteLettersToPickFrom[Math.floor(Math.random() * noteLettersToPickFrom.length)];
    }
   

    let getStringNumber = (string) => {
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
</script>

<main>
    <h1>Note selection</h1>
    <div>Select note on the highlighted string:</div>
    {#key randomNote}
        <div class="randomNote" in:fly={{x: 400}}>{randomNote.note}</div>
    {/key}
    <!-- <Fretboard options={options} on:fretboardInitialized={afterFretboardInit}/> -->
    {#if options != undefined}
        <Fretboard options={options} on:fretboardInitialized={afterFretboardInit}/>
    {/if}


    <!-- {#if showSuccess}
        <div out:blur="{{amount: 10}}" id="success">
            CORRECT!
        </div>
    {:else}
        <div>&nbsp;</div>
    {/if} -->
    <div style="visibility: {showSuccess ? 'visible' : 'hidden'}" id="success">
        CORRECT!
    </div>
    <div>{successCounter} / {failureCounter}</div>
</main>

<style>
    .randomNote {
        color: #1e8094;
        font-size: 1.5em;
    }

    #success {
        background-color: #79c779;
        color: white; 
        text-align: center;
    }
</style>