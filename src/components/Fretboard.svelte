<script>
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    export let options;

    const dispatch = createEventDispatcher()

    console.log('Fretboard asd asd asda sda sd ');

    onMount(async () => {
        // $: {
            console.log('OPTIONS:', options)
            console.log(jQuery);

            var fretboard = jQuery(".my-fretboard-js");
            fretboard.fretboard(options);
            dispatch("fretboardInitialized");
        // }
    });

</script>

<main>
    <div in:fade="{{duration: 800}}" class="my-fretboard-js dark-theme"></div>
</main>