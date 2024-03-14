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
	selectStation: Function;
	selectLocation: Function;
	loading: boolean;
	geoJSONdata: GeoJSON.FeatureCollection;
};

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

const stream = new Audio();
let geoJSONdata = {} as GeoJSON.FeatureCollection;

export default function PlayerProvider({ children }: { children: ReactNode }) {
	const [location, setLocation] = useState<any>(null);
	const [station, setStation] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log('hello');
		fetchData().then((data) => {
			geoJSONdata = formatAsGeoJSON(data);
			setLoading(false);
		});
	}, []);

	console.log({ location, station });

	const selectStation = useCallback(
		(newStation: any) => {
			if (newStation?.id !== station?.id) {
				setStation(newStation);
				stream.src = newStation.stream;
				stream.load();
				stream.play();
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
		return {
			station,
			location,
			selectStation,
			selectLocation,
			loading,
			geoJSONdata
		};
	}, [station, location, selectStation, selectLocation, loading]);

	return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => useContext(PlayerContext);
