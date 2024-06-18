/**
 * @typedef {Object} PresenceTimestamps
 * @property {?integer} start
 * @property {?integer} end
 */

/**
 * @typedef {Object} PresenceAssets
 * @property {?string} large_image
 * @property {?string} large_text
 * @property {?string} small_image
 * @property {?string} small_text
 */

/**
 * @typedef {Object} PresenceButton
 * @property {string} label
 * @property {string} url
 */

/**
 * @typedef {Object} Presence
 * @property {?string} state
 * @property {?string} details
 * @property {?PresenceTimestamps} timestamps
 * @property {?PresenceAssets} assets
 * @property {?PresenceButton[]} buttons
 */
