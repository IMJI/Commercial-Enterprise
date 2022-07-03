interface IDateObject {
    year : number,
    yearShort : number,
    month : number,
    monthTwoDigits : string,
    monthName : string,
    monthShortname : string,
    day : number,
    dayTwoDigits : string,
    hour : number,
    hourTwoDigits : string,
    minutes : number,
    minutesTwoDigits : string,
    seconds : number,
    secondsTwoDigits : string,
    miliseconds : number
    milisecondsFourDigits : string
}

export default IDateObject;