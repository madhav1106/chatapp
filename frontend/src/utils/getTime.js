const getTime = (datetime) => {
    const date = new Date(datetime);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

const padZero = (number) => {
    return number.toString().padStart(2,"0");
}

export default getTime;