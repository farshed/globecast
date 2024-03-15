export async function fetchData() {
	if ('DecompressionStream' in window) {
		const url = '/stations.json.gz';
		const response = await fetch(url);
		if (!response.ok) {
			throw networkError();
		}

		const stream = new DecompressionStream('gzip');
		const decompressed = response.body?.pipeThrough(stream);
		const text = await new Response(decompressed).text();

		return JSON.parse(text);
	} else {
		const url = '/stations.json';
		const response = await fetch(url);
		if (!response.ok) {
			throw networkError();
		}
		const json = await response.json();
		return json;
	}
}

const networkError = () =>
	new Error('Failed to fetch necessary data. Please check your internet connection.');

export function formatAsGeoJSON(data: Array<any>) {
	return {
		type: 'FeatureCollection',
		features: data.map((item) => {
			const id = hash(`${item[0][0]}, ${item[0][1]}`);
			const [[title, country], geo, utcOffset, stations] = item;

			return {
				type: 'Feature',
				geometry: { type: 'Point', coordinates: item[1] },
				properties: {
					id,
					geo,
					title,
					country,
					utcOffset,
					stations: stations.map((station: Array<string>) => ({
						id: id + hash(station[0]),
						title: station[0],
						stream: station[1]
					}))
				}
			};
		})
	} as GeoJSON.FeatureCollection;
}

function hash(str: string) {
	let hash = 0;
	let chr;

	if (str.length === 0) return hash;
	for (let i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}
	return hash;
}

function generateHash(str: string): string {
	if (str.length === 0) return '0';

	let hash = 0;
	let char;

	for (let i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash &= hash;
	}

	return Math.abs(hash).toString(36);
}
