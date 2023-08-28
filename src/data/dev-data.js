const mapOptions = {
  // center: [13.84829, 100.569342],
  // zoom: 1,
  region: {
    latitude: 13.84829,
    longitude: 100.569342,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0221,
  },
  showsUserLocation: true,
};

const locations = [
  {
    latitude: 13.84829,
    longitude: 100.569342,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    locationName: "first",
    id: 1,
  },
  {
    latitude: 13.84929,
    longitude: 100.569442,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    locationName: "second",
    id: 2,
  },
  {
    latitude: 13.84729,
    longitude: 100.569242,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    locationName: "third",
    id: 3,
  },
];

const tag = [
  "aa151aa", "bb484bb", "c65cc4c", "ddd6546d", "ee54ee",
   "ff54ff", "ggg454g", "hh54hh", "III454I"
]

module.exports = { mapOptions, locations, tag};
