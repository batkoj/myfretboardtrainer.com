
<script>
	import Footer from "./Footer.svelte";
	import GuessNoteOnSpecificString from "./GuessNoteOnSpecificString.svelte";
	import Menu from "./Menu.svelte";
</script>

<main>
	<h1 id="heading">MY FRETBOARD TRAINER</h1>
	<!-- <Menu/> -->
	<GuessNoteOnSpecificString/>
	<Footer/>
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
		font-size: 2em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>