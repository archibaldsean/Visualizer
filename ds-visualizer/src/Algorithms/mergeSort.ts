
export type MergeSortState = {
	array: number[];
	left: number;
	mid: number;
	right: number;
	activeIndices: number[]; // which indices to highlight, if desired
};

/**
 * mergeSortGenerator:
 * A recursive generator for Merge Sort that yields intermediate states.
 */
export function* mergeSortGenerator(
	arr: number[],
	left = 0,
	right = arr.length - 1
): Generator<MergeSortState> {
	if (left < right) {
		const mid = Math.floor((left + right) / 2);

		// Recursively sort the left half
		yield* mergeSortGenerator(arr, left, mid);
		// Recursively sort the right half
		yield* mergeSortGenerator(arr, mid + 1, right);

		// Merge the two halves
		yield* merge(arr, left, mid, right);
	} else {
		// For subarrays of length 1, optionally yield a "no-op" state
		yield {
			array: [...arr],
			left,
			mid: left,
			right,
			activeIndices: [],
		};
	}
}

/**
 * merge:
 * Merges two sorted subarrays of arr: arr[left..mid] and arr[mid+1..right].
 * Yields states each time it compares or writes to the array.
 */
function* merge(
	arr: number[],
	left: number,
	mid: number,
	right: number
): Generator<MergeSortState> {
	const temp: number[] = [];
	let i = left;
	let j = mid + 1;

	// Merge subarrays while both have elements
	while (i <= mid && j <= right) {
		// Highlight the two elements being compared
		yield {
			array: [...arr],
			left,
			mid,
			right,
			activeIndices: [i, j],
		};

		if (arr[i] <= arr[j]) {
			temp.push(arr[i]);
			i++;
		} else {
			temp.push(arr[j]);
			j++;
		}
	}

	// Copy any remaining elements in left subarray
	while (i <= mid) {
		yield {
			array: [...arr],
			left,
			mid,
			right,
			activeIndices: [i],
		};
		temp.push(arr[i]);
		i++;
	}

	// Copy any remaining elements in right subarray
	while (j <= right) {
		yield {
			array: [...arr],
			left,
			mid,
			right,
			activeIndices: [j],
		};
		temp.push(arr[j]);
		j++;
	}

	// Write merged elements back into arr
	for (let k = 0; k < temp.length; k++) {
		arr[left + k] = temp[k];

		// Yield after writing each element so we can animate the update
		yield {
			array: [...arr],
			left,
			mid,
			right,
			activeIndices: [left + k],
		};
	}
}
