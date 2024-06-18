<script lang='ts'>
	let input: HTMLInputElement
	let res = ''

	const send = (text?: string) =>
		chrome.runtime.sendMessage(text ?? input.value)
		.then(e => res = e)
</script>

<main>
	<input bind:this={input} />
	<span>{res}</span>

	<button on:click={() => send()}>Send text</button>
	<button on:click={() => send('connect')}>Connect</button>
	<button on:click={() => send('disconnect')}>Disconnect</button>
</main>
