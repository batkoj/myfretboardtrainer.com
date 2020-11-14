
<script>
	import GuessNoteOnSpecificString from "./GuessNoteOnSpecificString.svelte";
</script>

<main>
	<h1 id="heading">MY FRETBOARD TRAINER</h1>
	<GuessNoteOnSpecificString/>
</main>

<style>

	main {
		text-align: center;
		padding: 1em;
		/* max-width: 240px; */
		/* margin: 0 auto; */
	}

	h1 {
		color: var(--primary);
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>