import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useState } from 'react';
import Map, { Layer, MapLayerMouseEvent, MapRef, Source } from 'react-map-gl';
import { usePlayer } from '../context/player';

export default function Planet() {
	const { selectLocation, loading, geoJSONdata } = usePlayer();
	const [cursorStyle, setCursorStyle] = useState('');

	const mapRef = useCallback((map: MapRef) => {
		if (map) {
			map.on('mouseover', 'data-8spf3l', () => setCursorStyle('pointer'));
			map.on('mouseleave', 'data-8spf3l', () => setCursorStyle(''));
			map.on('click', 'data-8spf3l', (e) => {
				if (e?.features?.length) {
					const { properties } = e.features[0];

					selectLocation({
						...properties,
						stations: JSON.parse(properties?.stations)
					});
				}
			});
		}
	}, []);

	// const handleLocationClick = useCallback(
	// 	(e: MapLayerMouseEvent) => {
	// 		if (e?.features?.length) {
	// 			const { properties } = e.features[0];

	// 			selectLocation({
	// 				...properties,
	// 				stations: JSON.parse(properties?.stations)
	// 			});
	// 		}
	// 	},
	// 	[selectLocation]
	// );

	return (
		<Map
			ref={mapRef}
			mapLib={import('mapbox-gl')}
			initialViewState={{
				longitude: -100,
				latitude: 40,
				zoom: 3.5
			}}
			// onZoom={(e) => console.log(e.target.getLayer('data-8spf3l'))}
			// onClick={handleLocationClick}
			// onMou={(e) => console.log(e.features)}
			interactiveLayerIds={['stations']}
			cursor={cursorStyle}
			attributionControl={false}
			mapboxAccessToken="pk.eyJ1IjoiZmFpc2FsYXJzaGVkIiwiYSI6ImNsdG4yaGs0YTAya3YyanA4aWZrbHg0aTEifQ.2fgTovIlzWCkgM9AJdsubg"
			mapStyle="mapbox://styles/faisalarshed/cltn7xfj500d201qo3ck7g93l">
			{/* <Source type="geojson" data={geoJSONdata}>
				<Layer
					id="stations"
					// beforeId="place-labels"
					type="circle"
					paint={{
						'circle-color': '#00ff00',
						'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 1, 5, 4] // alternating (zoom, size) pairs
					}}
				/>
			</Source> */}
		</Map>
	);
}
