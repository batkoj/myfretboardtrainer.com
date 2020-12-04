<svelte:head>
    <title>Home</title>
</svelte:head>

<h1>Welcome</h1>

<p>Please select a training excercise:</p>

<div class="links">
    <a href="/noteselection">Note selection</a>
    <a href="/noteidentification">Note identification</a>
    <a href="/selectallnotes">Select the note's locations</a>
</div>

<br/>
<p>Or explore scales:</p>

<div class="links">
    <a href="/scales">Scales</a>
</div>

<style>
    .links {
        display: flex;
        flex-direction: column;
        font-size: 23px;
    }
</style>