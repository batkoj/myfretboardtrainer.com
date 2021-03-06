<script>
    import { onMount } from 'svelte';
    import Fretboard from '../components/Fretboard.svelte';
    import { standardTuning, scaleDictionary } from './scalesDictionary.js';
    import { allNoteLetters, noteCircles, intervals } from './util.js';

    let options;

    let major = true;
    let key = "C";
    let scale = "caged";
    let intervalsCheckbox = false;

    onMount(async () => {
        let isChordMode = true;
        let isDisabled = true;
        
        let numFrets = 15;
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
        let animationSpeed = 400; // ms

        let clickedNotesChangedFunc = function () {
        }

        options = {
            tuning: standardTuning,
            numFrets: numFrets,
            isChordMode: isChordMode,
            noteClickingDisabled: isDisabled,
            noteLetters: allNoteLetters,
            noteMode: getNoteModeFromBoolean(intervalsCheckbox),
            intervals: intervals,
            root: key,
            animationSpeed: animationSpeed,
            noteCircles: noteCircles,
            dimensionsFunc: dimensionsFunc,
            notesClickedCallback: clickedNotesChangedFunc
        };

    });
    
    
    let afterFretboardInit = () => {
        drawScale(major, key, scale);
    }

    $: {
        try {
            drawScale(major, key, scale);
        } catch (ignored) {
            // this fails for the first time(on page load) when jQuery is not loaded yet
            // console.log(ignored);
        }
    }

    function drawScale(major, key, scale) {
        let $fretboard = jQuery(".my-fretboard-js");
        let api = $fretboard.data("api");
        api.clearClickedNotes();

        api.setRoot(key);
        let notes = scaleDictionary.get(major).get(key).get(scale);
        api.setClickedNotes(notes);
    }

    $: {
        try {
            let $fretboard = jQuery(".my-fretboard-js");
            let api = $fretboard.data("api");
            api.setNoteMode(getNoteModeFromBoolean(intervalsCheckbox));
        } catch (ignored) {}
    }

    function getNoteModeFromBoolean(checked) {
        return checked ? "interval" : "letter";
    }

</script>

<svelte:head>
    <title>Scales</title>
</svelte:head>

<main>
    <h1>Scales</h1>
    <div class="buttonSection">
        <div class="majorMinor">
            <button id="majorButton" class:selected={major}  on:click={() => major = true}>Major</button>
            <button id="minorButton" class:selected={!major} on:click={() => major = false}>Minor</button>
        </div>
        <div class="keys">
            <button id="CButton" class:selected={key==="C"} on:click={() => key = "C"}>C</button>
            <button id="DButton" class:selected={key==="D"} on:click={() => key = "D"}>D</button>
            <button id="CButton" class:selected={key==="E"} on:click={() => key = "E"}>E</button>
            <button id="DButton" class:selected={key==="F"} on:click={() => key = "F"}>F</button>
            <button id="CButton" class:selected={key==="G"} on:click={() => key = "G"}>G</button>
            <button id="DButton" class:selected={key==="A"} on:click={() => key = "A"}>A</button>
            <button id="CButton" class:selected={key==="B"} on:click={() => key = "B"}>B</button>
        </div>
        <div class="scales">
            <button id="cagedButton"        class:selected={scale==="caged"}         on:click={() => scale = "caged"}>      CAGED</button>
            <button id="arpeggioButton"     class:selected={scale==="arpeggio"}      on:click={() => scale = "arpeggio"}>   Arpeggios</button>
            <button id="pentatonicButton"   class:selected={scale==="pentatonic"}    on:click={() => scale = "pentatonic"}> Pentatonic</button>
            <button id="blueScaleButton"    class:selected={scale==="blues"}         on:click={() => scale = "blues"}>      Blues</button>
            <button id="scale"              class:selected={scale==="scale"}         on:click={() => scale = "scale"}>      {#if major}Major scale{:else}Minor scale{/if}</button>
        </div>
    </div>
    {#if options != undefined}
        <Fretboard options={options} on:fretboardInitialized={afterFretboardInit}/>
    {/if}
    Show intervals <input class="intevalCheck" type=checkbox bind:checked={intervalsCheckbox}>
    {#if scale === 'caged'}
        <div class="cagedLetters">
            <span style="color:var(--CColor)">C</span>
            <span style="color:var(--AColor)">A</span>
            <span style="color:var(--GColor)">G</span>
            <span style="color:var(--EColor)">E</span>
            <span style="color:var(--DColor)">D</span>
        </div>
    {:else}
        {#if intervalsCheckbox}
            <div class="scaleTable">
                <table>
                    <tr style="font-size: 12px;">
                        {#each scaleDictionary.get(major).get(scale + "_intervals") as interval}
                            <td>{interval}</td>
                        {/each}
                    </tr>
                    <tr>
                        {#each scaleDictionary.get(major).get(key).get((scale==="blues"?"blues_":"") + "notes") as note}
                            <td>{note}</td>
                        {/each}
                    </tr>
                </table>
            </div>
        {/if}    
    {/if}
    
</main>


<style>
    .intevalCheck{
        margin-top: 50px;
    }
    .selected {
        background-color: #6bd6d6;
    }
    
    .buttonSection {
        display: flex;
        flex-direction: column;
        margin-bottom: 18px;
    }
    .majorMinor {
        display: flex;
        justify-content: center;
    }
    .majorMinor button {
        width: 50%;
    }
    @media (min-width: 767px) {
        .majorMinor button {
            width: 9%;
            height: 50px;
        }
        .scales button {
            width: 10%;
        }
    }
    .keys {
        display: flex;
        justify-content: center;
    }
    .keys button {
        height: 50px;
        width: 70px;
        margin: 5px;
    }

    .scales {
        display: flex;
        justify-content: center;
    }
    .scales button {
        height: 50px;
        margin: 5px;
    }

    .cagedLetters {
        font-weight: 900;
        font-size: 20px;
        margin-top: 20px;
    }

    .scaleTable {
        display: flex;
        justify-content: center;
        font-size: 15px;
        font-weight: 600;
        margin-top: 25px;
    }

    table, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    td {
        padding: 3px;
        width: 25px;
    }
</style>