export function getTimeRemaining(deadline: Date) {
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();

    if (diffMs <= 0) {
        return { expired: true, timeRemaining: "Tarea vencida" };
    }

    const seconds = Math.floor(diffMs / 1000) % 60;
    const minutes = Math.floor(diffMs / 1000 / 60) % 60;
    const hours = Math.floor(diffMs / 1000 / 60 / 60) % 24;
    const days = Math.floor(diffMs / 1000 / 60 / 60 / 24);

    return {
        expired: false,
        days,
        hours,
        minutes,
        seconds,
    };
}