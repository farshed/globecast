import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';
import { fetchData, formatAsGeoJSON } from '../utils';

type PlayerContextType = {
	station: any;
	location: any;
	loading: boolean;
	playing: boolean;
	volume: number;
	geoJSONdata: GeoJSON.FeatureCollection;
	selectStation: Function;
	selectLocation: Function;
	togglePlayback: Function;
	changeVolume: Function;
};

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

const stream = new Audio();
let geoJSONdata = {} as GeoJSON.FeatureCollection;

export default function PlayerProvider({ children }: { children: ReactNode }) {
	const [location, setLocation] = useState<any>(null);
	const [station, setStation] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(100);

	useEffect(() => {
		console.log('hello');
		fetchData().then((data) => {
			geoJSONdata = formatAsGeoJSON(data);
			setLoading(false);
		});
	}, []);

	const selectStation = useCallback(
		(newStation: any) => {
			if (newStation?.id !== station?.id) {
				setStation(newStation);
				stream.src = newStation.stream;
				stream.load();
				stream.play();
				setPlaying(true);
			}
		},
		[station]
	);

	const selectLocation = useCallback(
		(loc: any) => {
			if (loc?.id !== location?.id) {
				setLocation(loc);
				selectStation(loc.stations[0]);
			}
		},
		[location, selectStation]
	);

	const value = useMemo(() => {
		const togglePlayback = () => {
			// const isPlaying = !stream.paused && stream.currentTime > 0 && !stream.ended;
			playing ? stream.pause() : stream.play();
			setPlaying(!playing);
		};

		const changeVolume = (vol: number) => {
			stream.volume = vol / 100;
			setVolume(vol);
		};

		return {
			station,
			location,
			selectStation,
			selectLocation,
			loading,
			playing,
			geoJSONdata,
			togglePlayback,
			volume,
			changeVolume
		};
	}, [station, location, selectStation, selectLocation, loading, playing, volume]);

	return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => useContext(PlayerContext);
