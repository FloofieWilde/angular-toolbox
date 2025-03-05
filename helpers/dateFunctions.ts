export function getLastWeekDate(date?: Date): Date {
    console.log('date', date);
    if (!date) {
        date = new Date();
        return date;
    }
    date.setDate(date.getDate() - 7);
    return date;
}