/**
 * Office location — displayed address stays "Victoria, Dar es Salaam, Tanzania";
 * these coordinates back the map link/embed wherever that address appears.
 */
export const OFFICE_COORDS = { lat: -6.778588829389339, lng: 39.25212681627033 }

export const OFFICE_MAPS_URL =
  `https://www.google.com/maps/search/?api=1&query=${OFFICE_COORDS.lat},${OFFICE_COORDS.lng}`

export const OFFICE_MAPS_EMBED_URL =
  `https://www.google.com/maps?q=${OFFICE_COORDS.lat},${OFFICE_COORDS.lng}&z=16&output=embed`
