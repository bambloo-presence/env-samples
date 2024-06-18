import type { FnOrVal, PresenceScript } from './@types/PresenceScript.d.ts'

const presence_script: PresenceScript = {
	urls: [
		/https\:\/\/.+\.youtube\.com\//
	],

	makers: {
		state: () => 'State',
		details: 'Details',

		assets: () => ({
			large_text: () => 'large_text',
			small_text: () => 'small_text',
			large_image: () => 'large_image',
			small_image: () => 'small_image'
		})
	}
}

function make_presence(ele: FnOrVal<unknown>): unknown {
	if (!ele || typeof ele !== 'object' || Array.isArray(ele))
		return ele

	const obj: Record<string, unknown> = {}

	for (const [key, val] of Object.entries(ele))
		obj[key] = typeof val === 'function'
			? make_presence(val())
			: val

	return obj
}

function run(script: PresenceScript) {
	// Valid URLs
	const valid_url =
		Array.isArray(script.urls)
			? script.urls.some(url => url.test(window.location.href))
			: script.urls.test(window.location.href)

	console.log(script.urls[0], window.location.href, valid_url)
	if (!valid_url) return

	// Make presence script
	const object = make_presence(script.makers)

	console.log(object)
}

run(presence_script)
