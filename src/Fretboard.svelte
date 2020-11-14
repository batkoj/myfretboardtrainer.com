<script>
    import jQuery from 'jquery';
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    export let options;

    const dispatch = createEventDispatcher()

    $: {
        var fretboard = jQuery(".my-fretboard-js");
        fretboard.fretboard(options);
        dispatch("fretboardInitialized");
    }

</script>

<main>
    <div in:fade="{{duration: 0}}" class="my-fretboard-js dark-theme"></div>
</main>