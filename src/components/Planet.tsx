import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useState } from 'react';
import Map, { Layer, MapLayerMouseEvent, MapRef, Source } from 'react-map-gl';
import stations from '../constants/stations';
import { usePlayer } from '../context/player';

const geojsonData = {
	type: 'FeatureCollection',
	features: stations.map((station) => ({
		type: 'Feature',
		geometry: { type: 'Point', coordinates: station.geo },
		properties: station
	}))
} as GeoJSON.FeatureCollection;

export default function Planet() {
	const { selectLocation } = usePlayer();
	const [cursorStyle, setCursorStyle] = useState('');

	const mapRef = useCallback((map: MapRef) => {
		if (map) {
			map.on('mouseover', 'stations', () => setCursorStyle('pointer'));
			map.on('mouseleave', 'stations', () => setCursorStyle(''));
		}
	}, []);

	const handleLocationClick = useCallback(
		(e: MapLayerMouseEvent) => {
			if (e?.features?.length) {
				const { properties } = e.features[0];

				selectLocation({
					...properties,
					stations: JSON.parse(properties?.stations)
				});
			}
		},
		[selectLocation]
	);

	return (
		<Map
			ref={mapRef}
			mapLib={import('mapbox-gl')}
			initialViewState={{
				longitude: -100,
				latitude: 40,
				zoom: 3.5
			}}
			onClick={handleLocationClick}
			interactiveLayerIds={['stations']}
			cursor={cursorStyle}
			attributionControl={false}
			mapboxAccessToken="pk.eyJ1IjoiZmFpc2FsYXJzaGVkIiwiYSI6ImNsdG4yaGs0YTAya3YyanA4aWZrbHg0aTEifQ.2fgTovIlzWCkgM9AJdsubg"
			mapStyle="mapbox://styles/faisalarshed/cltn7xfj500d201qo3ck7g93l">
			<Source type="geojson" data={geojsonData}>
				<Layer
					id="stations"
					type="circle"
					paint={{
						'circle-color': '#00ff00',
						'circle-radius': 3
					}}
				/>
			</Source>
		</Map>
	);
}
