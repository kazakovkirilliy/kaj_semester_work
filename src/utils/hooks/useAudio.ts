export const useAudio = (url: string) => {
    new Audio(url).play();
}