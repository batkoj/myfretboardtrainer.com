<script>
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    export let options;

    const dispatch = createEventDispatcher()

    onMount(async () => {
    // $: {
        // console.log('OPTIONS:', options)

        var fretboard = jQuery(".my-fretboard-js");
        fretboard.fretboard(options);
        dispatch("fretboardInitialized");
    // }
    });

</script>

<main>
    <div class="my-fretboard-js dark-theme"></div>
</main>