<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';

	// hack to get rid of the console warning
	export let segment: any;
	segment = !segment;
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		/* max-width: 1800px; */
		/* margin: 0 auto; */
	}

	.content {
		flex: 1 0 auto; /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. 
						   This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. 
						   The default is 0 1 auto*/
	}

	.footer {
		flex-shrink: 0; /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. 
						   This defines the ability for a flex item to shrink if necessary.*/
		padding: 20px;
	}
</style>


<div class="content">
	<!-- <Nav {segment}/> -->
	<Nav />
	<main>
		<slot></slot>
	</main>
</div>	

<div class="footer">
	<Footer />
</div>