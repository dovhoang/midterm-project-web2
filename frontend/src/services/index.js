export const formatTime = (isoDate) => {
    let date = new Date(isoDate);
    return (date.getDate() + '/' + date.getMonth()
        + '/' + date.getFullYear());
}