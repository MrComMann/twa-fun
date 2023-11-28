function getLocaleStringDay(index: number): string {
    const days = ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"];
    return days[index];
}

export default getLocaleStringDay;