declare global {
	type NullableObject = Object | null;

	declare var DecompressionStream: {
		prototype: DecompressionStream;
		new (format: string): DecompressionStream;
	};

	type RadioStation = {
		id: string;
		title: string;
		stream: string;
	};

	type RadioGroup = {
		id: string;
		title: string;
		country: string;
		geo: [number, number];
		utcOffset: number;
		stations: RadioStation[];
	};
}

export {};
