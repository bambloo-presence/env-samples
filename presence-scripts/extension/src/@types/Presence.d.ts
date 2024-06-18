export interface PresenceButton {
	label: string
	url:   string
}

export interface PresenceAssets {
	large_image?: string
	large_text?:  string
	small_image?: string
	small_text?:  string
}

export interface PresenceTimestamps {
	start?: integer
	end?:   integer
}

export interface Presence {
	state?:      string
	details?:    string

	timestamps?: PresenceTimestamps
	assets?: PresenceAssets
	buttons?: PresenceButton[]
}
