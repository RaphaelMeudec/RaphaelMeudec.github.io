// Function to calculate distance using Haversine formula
function haversineDistance(coords1, coords2) {
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    const R = 6371; // Radius of the Earth in kilometers

    const lat1 = coords1["position lat"];
    const lon1 = coords1["position long"];
    const lat2 = coords2["position lat"];
    const lon2 = coords2["position long"];

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
}

// Format distance as meters into kms
function formatToKm(meters) {
	return (meters / 1000).toFixed(2) + "km";
}

// Return the index of the argmin of the array
function argmin(arr) {
    if (arr.length === 0) {
        return -1; // Return -1 if the array is empty
    }

    let minIndex = 0;
    let minValue = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < minValue) {
            minValue = arr[i];
            minIndex = i;
        }
    }

    return minIndex;
}

// Get the closest point from the record to the current position
function getClosestPointIndexOnRecord(coords, record) {
	const distances = record.map((recordCoords) => haversineDistance(coords, recordCoords));
	const index = argmin(distances);

	console.log(index, record[index]);

	return index;
}

// Function to transform a csv as string into a Javascript array
function csvToArr(stringVal, splitter) {
  const [keys, ...rest] = stringVal
    .trim()
    .split("\n")
    .map((item) => item.split(splitter));

  const formedArr = rest.map((item) => {
    const object = {};
    keys.forEach((key, index) => (object[key] = item.at(index)));
    return object;
  });

  return formedArr;
}
