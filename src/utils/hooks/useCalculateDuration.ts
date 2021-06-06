import { useFormatTime } from './useFormatTime';

export const useCalculateDuration = (startTime: string, endTime: string) => {
    const date1 = new Date(startTime);
    const date2 = new Date(endTime);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return useFormatTime(Math.floor(diffTime / 1000));
}