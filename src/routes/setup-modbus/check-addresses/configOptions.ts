export enum DataFormatOptions {
    SIGNED_INT,
    DOUBLE_WORD
};

const bauds = [300, 600, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200];

export const baudRateOptions = bauds.map(el => ({ label: el, value: el }));

export const dataFormatOptions = [
    { value: DataFormatOptions.SIGNED_INT, label: "16 bit, signed integer" },
    { value: DataFormatOptions.DOUBLE_WORD, label: "32 bit, float" },
];

