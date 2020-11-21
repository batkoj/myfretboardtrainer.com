<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';

	// export let segment: string;
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		/* max-width: 1800px; */
		/* margin: 0 auto; */
	}
	/* main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	} */
</style>


<!-- <h1>My Fretboard Trainer</h1> -->
<!-- <Nav {segment}/> -->
<Nav />

<main>
	<slot></slot>
</main>

<Footer/>