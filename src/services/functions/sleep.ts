declare type SleepType = (timeout?: number) => Promise<any>

export const sleep: SleepType = (timeout = 3000) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, timeout);
});