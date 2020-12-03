<script>
	import { onMount } from "svelte";

	onMount(async () => {
		jQuery('.menu-item > a').on('click', function(e) {
			jQuery('.sub-menu').css('display', 'none');
		});
		jQuery('.menu-item').hover(function() {
			jQuery('.sub-menu').css('display', '');
		});
	});	
</script>

<nav class="menu">
	<!-- <div class="logo">asdasd</div> -->
	<ol>
		<li class="menu-item"><a href="/home">Home</a></li>
		<li class="menu-item">
			<a href="/exercises">Exercises</a>
			<ol class="sub-menu">
				<li class="menu-item"><a href="/noteselection">Note selection</a></li>
				<li class="menu-item"><a href="/noteidentification">Note identification</a></li>
				<li class="menu-item"><a href="/selectallnotes">Select the note's locations</a></li>
			</ol>
		</li>
		<!-- <li class="menu-item"><a href="#0">About</a></li> -->
		<li class="menu-item"><a href="/scales">Scales</a></li>
		<li class="menu-item"><a href="/contact">Contact</a></li>
	</ol>
</nav>


<style>

	:root {
		--dark: #171616;
		--light:  #fff;
		--onhover: #698a8f;
	}

	/* .logo {
		color: var(--light);
	} */

	.menu {
		/* display: flex; */
		/* justify-content: space-evenly; */

		background: var(--dark);
		height: 4rem;

		font-size: 16px;
		font-family: "Fira Mono", monospace;
	}
	.menu ol {
		list-style-type: none;
		margin: 0 auto;
		padding: 0;
	}
	.menu > ol {
		max-width: 1000px;
		padding: 0 2rem;
		display: flex;
	}
	.menu > ol > .menu-item {
		flex: 1;
		padding: 0.75rem 0;
	}
	.menu > ol > .menu-item:after {
		content: "";
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		bottom: 5px;
		left: calc(50% - 2px);
		background: var(--onhover);
		will-change: transform;
		transform: scale(0);
		transition: transform 0.2s ease;
	}
	.menu > ol > .menu-item:hover:after {
		transform: scale(1);
	}
	.menu-item {
		position: relative;
		line-height: 2.5rem;
		text-align: center;
	}
	.menu-item a {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: block;
		color: var(--light);
	}
	.sub-menu .menu-item {
		padding: 0.75rem 0;
		background: var(--dark);
		opacity: 0;
		transform-origin: bottom;
		animation: enter 0.2s ease forwards;
	}
	.sub-menu .menu-item:nth-child(1) {
		animation-duration: 0.2s;
		animation-delay: 0s;
	}
	.sub-menu .menu-item:nth-child(2) {
		animation-duration: 0.3s;
		animation-delay: 0.1s;
	}
	.sub-menu .menu-item:nth-child(3) {
		animation-duration: 0.4s;
		animation-delay: 0.2s;
	}
	.sub-menu .menu-item:hover {
		background: var(--onhover);;
	}
	.sub-menu .menu-item a {
		padding: 0 0.75rem;
	}
	/* @media screen and (max-width: 600px) {
		.sub-menu .menu-item {
			background: #c06c84;
		}
	}
	@media screen and (max-width: 600px) {
		.menu {
			position: relative;
			z-index: 999999;
		}
		.menu:after {
			content: "";
			position: absolute;
			top: calc(50% - 2px);
			right: 1rem;
			width: 30px;
			height: 4px;
			background: #fff;
			box-shadow: 0 10px #fff, 0 -10px #fff;
		}
		.menu > ol {
			display: none;
			background: #0a0708;
			flex-direction: column;
			justify-content: center;
			height: 100vh;
			animation: fade 0.2s ease-out;
		}
		.menu > ol > .menu-item {
			flex: 0;
			opacity: 0;
			animation: enter 0.3s ease-out forwards;
		}
		.menu > ol > .menu-item:nth-child(1) {
			animation-delay: 0s;
		}
		.menu > ol > .menu-item:nth-child(2) {
			animation-delay: 0.1s;
		}
		.menu > ol > .menu-item:nth-child(3) {
			animation-delay: 0.2s;
		}
		.menu > ol > .menu-item:nth-child(4) {
			animation-delay: 0.3s;
		}
		.menu > ol > .menu-item:nth-child(5) {
			animation-delay: 0.4s;
		}
		.menu > ol > .menu-item + .menu-item {
			margin-top: 0.75rem;
		}
		.menu > ol > .menu-item:after {
			left: auto;
			right: 1rem;
			bottom: calc(50% - 2px);
		}
		.menu > ol > .menu-item:hover {
			z-index: 999999;
		}
		.menu:hover > ol {
			display: flex;
		}
		.menu:hover:after {
			box-shadow: none;
		}
	} */

	.sub-menu {
		position: absolute;
		width: 100%;
		top: 100%;
		left: 0;
		display: none;
		z-index: 999999;
	}

	@media (hover: hover) {
		.menu-item:hover > .sub-menu {
			display: block;
		}
	}
	/* .menu-item:hover > .sub-menu {
		display: block;
	} */
	/* @media screen and (max-width: 600px) {
		.sub-menu {
			width: 100vw;
			left: -2rem;
			top: 50%;
			transform: translateY(-50%);
		}
	} */

	* {
		box-sizing: border-box;
	}
	*:before,
	*:after {
		box-sizing: inherit;
	}

	a {
		text-decoration: none;
	}

	@keyframes enter {
		from {
			opacity: 0;
			transform: scaleY(0.98) translateY(10px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>