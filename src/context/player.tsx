import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

type PlayerContextType = {
	station: any;
	location: any;
	selectStation: Function;
	selectLocation: Function;
};

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

async function tuneIn(station: any) {
	const audio = new Audio();
	audio.src = station.stream;
	await audio.play();
	return audio;
}

export default function PlayerProvider({ children }: { children: ReactNode }) {
	const [location, setLocation] = useState<any>(null);
	const [station, setStation] = useState<any>(null);
	const [stream, setStream] = useState<HTMLAudioElement | null>(null);

	const selectLocation = useCallback(
		(loc: any) => {
			if (loc?.id !== location?.id) {
				setLocation(loc);
				setStation(loc.stations[0]);
				stream?.pause();
				tuneIn(loc.stations[0]).then((audio) => setStream(audio));
			}
		},
		[location, stream]
	);

	const selectStation = useCallback(
		(newStation: any) => {
			if (newStation?.id !== station?.id) {
				setStation(newStation);
				stream?.pause();
				tuneIn(station).then((audio) => setStream(audio));
			}
		},
		[station, stream]
	);

	const value = useMemo(() => {
		return {
			station,
			location,
			selectStation,
			selectLocation
		};
	}, [station, location, selectStation, selectLocation]);

	return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => useContext(PlayerContext);
