/**
 * @typedef {import('./presence.d.js').PresenceButton} PresenceButton
 */

/**
 * @typedef {Object} PresenceMakersTimestamps
 * @property {(function(): integer?)|integer?} start
 * @property {(function(): integer?)|integer?} end
 */

/**
 * @typedef {Object} PresenceMakersAssets
 * @property {(function(): string?)|string?} large_image
 * @property {(function(): string?)|string?} large_text
 * @property {(function(): string?)|string?} small_image
 * @property {(function(): string?)|string?} small_text
 */

/**
 * @typedef {Object} PresenceMakers
 * @property {(function(): string?)|string?} state
 * @property {(function(): string?)|string?} details
 * @property {(function(): PresenceMakersTimestamps?)|PresenceMakersTimestamps?} timestamps
 * @property {(function(): PresenceMakersAssets?)|PresenceMakersAssets?} assets
 * @property {(function(): PresenceButton?)[]|PresenceButton[]?} buttons
 */
