import HtmlTableToJson from "html-table-to-json";
import ical from 'ical-generator';
import moment from 'moment';

const readTable = (input) => {
    return HtmlTableToJson.parse(input);
}

const getNames = (splitInput) => {
    console.log(splitInput)
    let location = "";
    console.log(Object.keys(splitInput.results[0][0]))
    if (Object.keys(splitInput.results[0][0]).includes("Sammamish")) {
        location = "Sammamish"
    } else if (Object.keys(splitInput.results[0][0]).includes("Seattle")) {
        location = "Seattle"
    }
    let names = [];
    for (let i = 0; i < splitInput.results[0].length; i++) {
        names.push({name: splitInput.results[0][i][location], index: i});
    }
    return names;
}

const parseSplitInput = (splitInput, name) => {
    let theirSched = splitInput.results[0][name.index];
    let keyNames = Object.keys(theirSched);
    let keyNamesDup = Object.keys(theirSched);
    let formattedSched = [];
    for (let i = 0; i < keyNames.length; i++) {
        keyNamesDup[i] = keyNames[i].replace(/\u00a0/g, " ");
        let day = keyNamesDup[i].split(" ")[0];
        if (day === "M" || day === "T" || day === "W" || day === "TH" || day === "F" || day === "SAT" || "SUN" === day) {
            if (!theirSched[keyNames[i]].includes("x") && !theirSched[keyNames[i]].includes("Sea") && theirSched[keyNames[i]].length > 2) formattedSched.push({
                date: keyNamesDup[i].split(" ")[1],
                time: theirSched[keyNames[i]]
            })
        }
    }
    return formattedSched;
}

const generateEvents = (splitInput, name) => {
    let formattedSched = parseSplitInput(splitInput, name);
    const calendar = ical({name: name.name + "'s Tanoor Schedule"});
    for (let i = 0; i < formattedSched.length; i ++) {
        let splitTime = formattedSched[i].time.split("-")
        console.log(formattedSched[i].date + "/" + moment().year())
        let start = moment(formattedSched[i].date + "/" + moment().year() + " " + splitTime[0] + ":00:00", "MM/DD/YYYY hh:mm:ss")
        if (start.hour() < 10) {
            start = moment(formattedSched[i].date + "/" + moment().year() + " " + splitTime[0] + ":00:00", "MM/DD/YYYY hh:mm:ss")
                .add(12, 'hours');
        }
        let end = moment(formattedSched[i].date + "/" + moment().year() + " " + `${splitTime[1].includes("cl") ? "9" : splitTime[1].split("(")[0]}` + ":00:00", "MM/DD/YYYY hh:mm:ss")
        if (end.hour() < 10) {
            end = moment(formattedSched[i].date + "/" + moment().year() + " " + `${splitTime[1].includes("cl") ? "9" : splitTime[1].split("(")[0]}` + ":00:00", "MM/DD/YYYY hh:mm:ss")
                .add(12, 'hours');
        }
        const event = calendar.createEvent({
            start: start,
            end: end,
            summary: 'Work @ Tanoor',
            description: 'dev by Jake',
            location: 'Tanoor Sammamish',
            url: 'https://lilj.dev/'
        });
        event.createAlarm({
            type: 'audio',
            trigger: 1800, // 30min before event
        });
    }
    return calendar.toString()
}

export {readTable, getNames, parseSplitInput, generateEvents};