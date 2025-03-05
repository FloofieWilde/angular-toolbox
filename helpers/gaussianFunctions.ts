import { getLastWeekDate } from './dateFunctions';

function gaussianRandom(mean = 0, stdev = 1) {
    // Box-Muller transform
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

function getGaussianRandomValues(mean = 0, stdev = 1, count = 13) {
    const values: any[] = [];
    for (let i = 0; i < count; i++) {
        const date = getLastWeekDate(values[values.length - 2] && new Date(values[values.length - 2][0]));
        values.push([date, gaussianRandom(mean, stdev)]);
    }
    return values;
}