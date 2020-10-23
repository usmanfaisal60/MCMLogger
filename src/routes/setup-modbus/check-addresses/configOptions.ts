export enum DataFormatOptions {
    SIGNED_INT,
    DOUBLE_WORD
};

export const baudRateOptions = [
    { value: 9600, label: 9600 },
    { value: 19200, label: 19200 },
    { value: 38400, label: 38400 }
]

export const dataFormatOptions = [
    { value: DataFormatOptions.SIGNED_INT, label: "16 bit, signed integer" },
    { value: DataFormatOptions.DOUBLE_WORD, label: "32 bit, float" },
];

