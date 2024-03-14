import cx from 'classnames';
import { usePlayer } from '../../context/player';

interface StationProps {
	station: any;
	playing: boolean;
}

export default function Station({ station, playing }: StationProps) {
	const { selectStation } = usePlayer();

	return (
		<div
			className={cx(
				'w-full flex p-4 py-3 cursor-pointer hover:bg-slate-800',
				playing && 'bg-slate-800'
			)}
			onClick={() => selectStation(station)}>
			<p className="text-white">{station.title}</p>
		</div>
	);
}
