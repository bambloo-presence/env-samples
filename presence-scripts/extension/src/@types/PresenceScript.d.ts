import { Presence, PresenceAssets, PresenceTimestamps } from './Presence.d.ts'

export type FnOrVal<T> = T | (() => T?)

type ObjFnOrVal<T> = FnOrVar<{
	[P in keyof T]?: FnOrVal<T[P]>
}>

type PresenceMaker = ObjFnOrVal<Presence> & {
	timestamps?: ObjFnOrVal<PresenceTimestamps>
	assets?:     ObjFnOrVal<PresenceAssets>
}

export interface PresenceScript {
	urls: Regex[] | Regex
	makers: PresenceMaker
}
