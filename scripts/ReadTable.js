import HtmlTableToJson from "html-table-to-json";
import ical from 'ical-generator';
import moment from 'moment';

// Converts HTML table into more readable object format
const readTable = (input) => {
    return HtmlTableToJson.parse(input);
}

// Extracts all name from schedule - allows for selection of specific schedule
const getNames = (splitInput) => {
    let location = "";
    // Evaluate which location is being inputted
    if (Object.keys(splitInput.results[0][0]).includes("Sammamish")) {
        location = "Sammamish"
    } else if (Object.keys(splitInput.results[0][0]).includes("Seattle")) {
        location = "Seattle"
    }
    let names = [];
    // Add all names to array as well as index as name for use later
    for (let i = 0; i < splitInput.results[0].length; i++) {
        names.push({name: splitInput.results[0][i][location], index: i});
    }
    return names;
}

// Once name is resolved, the calendar can then be parsed
const parseSplitInput = (splitInput, name) => {
    // Fetch schedule
    let theirSched = splitInput.results[0][name.index];
    let keyNames = Object.keys(theirSched);
    let keyNamesDup = Object.keys(theirSched);
    let formattedSched = [];
    for (let i = 0; i < keyNames.length; i++) {
        // Replace weird characters
        keyNamesDup[i] = keyNames[i].replace(/\u00a0/g, " ");
        let day = keyNamesDup[i].split(" ")[0];
        if (day === "M" || day === "T" || day === "W" || day === "TH" || day === "F" || day === "SAT" || "SUN" === day) {
            // If day is real and they are part of given schedule (not in opposite location) append to valid array
            if (!theirSched[keyNames[i]].includes("x") && !theirSched[keyNames[i]].includes("Sea") && !theirSched[keyNames[i]].includes("Samm") && theirSched[keyNames[i]].length > 2){
                formattedSched.push({
                    date: keyNamesDup[i].split(" ")[1],
                    time: theirSched[keyNames[i]]
                })
            }
        }
    }
    return formattedSched;
}

// This generates the iCal (.ics) file format
const generateEvents = (splitInput, name) => {
    let formattedSched = parseSplitInput(splitInput, name);
    const calendar = ical({name: name.name + "'s Tanoor Schedule"});
    // For each item in array, add an event
    for (let i = 0; i < formattedSched.length; i ++) {
        let splitTime = formattedSched[i].time.split("-")
        console.log(formattedSched[i].date + "/" + moment().year())
        let start = moment(formattedSched[i].date + "/" + moment().year() + " " + splitTime[0] + ":00:00", "MM/DD/YYYY hh:mm:ss")
        if (start.hour() < 10) {
            start = moment(formattedSched[i].date + "/" + moment().year() + " " + splitTime[0] + ":00:00", "MM/DD/YYYY hh:mm:ss")
                .add(12, 'hours'); // Looks weird, but accounts for 24h time
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
            description: 'Disclaimer: Schedule is subject to change -- it is important to double check with master version. I am not responsible for bugs. ' +
                'Developed by Jake Harper',
            location: 'Tanoor Sammamish',
            url: 'https://lilj.dev/'
        });
        // This part doesn't work when subscribed the Google Calendar URL --- for some reason ...
        event.createAlarm({
            type: 'audio',
            trigger: 1800, // 30min before event
        });
    }
    return calendar.toString()
}

export { readTable, getNames, parseSplitInput, generateEvents };
