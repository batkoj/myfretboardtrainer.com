<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
	import Fretboard from '../components/Fretboard.svelte';

	let standardTuning = [{letter: "E", octave: 4}, {letter: "B", octave: 3}, {letter: "G", octave: 3}, {letter: "D", octave: 3}, {letter: "A", octave: 2}, {letter: "E", octave: 2}];

    let options;
	
	let randomFret = Math.floor(Math.random() * 11);
	let randomString = standardTuning[Math.floor(Math.random() * standardTuning.length)];
	let randomNote = [{
		string: randomString, 
		notes: [{fret: randomFret}]
	}];

    let showSuccess = false;
    let successCounter = 0;
    let failureCounter = 0;

    let allNoteLetters = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "Ab/G#", "A", "A#/Bb", "B"];
    let wholeNoteLetters = ["C", "D", "E", "F", "G", "A", "B"];

	onMount(async () => {
        var isChordMode = true;
        var isDisabled = true;
        
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
		var clickedNotesChangedFunc = () => {};

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
		let $fretboard = jQuery(".my-fretboard-js");
		let api = $fretboard.data("api");
        api.clearClickedNotes();
		api.setClickedNotes(randomNote);
		document.querySelectorAll(".note-display").forEach(x => x.style.visibility = "hidden");
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
	
    <div>Select:</div>

    <div style="visibility: {showSuccess ? 'visible' : 'hidden'}" id="success">
        CORRECT!
    </div>
    <span>{successCounter} / {failureCounter} ({successPercentage}%)</span>
</main>

<style>
    #success {
        background-color: #79c779;
        color: white; 
        text-align: center;
    }
</style>