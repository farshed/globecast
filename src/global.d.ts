declare global {
	type NullableObject = Object | null;

	declare var DecompressionStream: {
		prototype: DecompressionStream;
		new (format: string): DecompressionStream;
	};
}

export {};
