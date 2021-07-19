import HtmlTableToJson from "html-table-to-json";
import ics from "ics";
const readTable = (input) => {
    return HtmlTableToJson.parse(input);
}

const getNames = (splitInput) => {
    console.log(splitInput)
    // todo: optimize for seattle
    let names = [];
    for (let i = 0; i < splitInput.results[0].length; i ++) {
        names.push({name:splitInput.results[0][i].Sammamish, index: i});
        // names.push(splitInput.results[0][i].Sammamish);
    }
    return names;
}

const generateEvents = (splitInput, name) => {
    let theirSched = splitInput.results[0][name.index];
    // theirSched = name;
    let keyNames = Object.keys(theirSched);
    let keyNamesDup = Object.keys(theirSched);
    let formattedSched = [];
    for (let i = 0; i < keyNames.length; i ++) {
        keyNamesDup[i] = keyNames[i].replace(/\u00a0/g, " ");
        let day = keyNamesDup[i].split(" ")[0];
        if (day === "M" || day === "T" || day === "W" || day === "TH" || day === "F" || day === "SAT" || "SUN" === day) {
            if (!theirSched[keyNames[i]].includes("x")) formattedSched.push({date: keyNamesDup[i].split(" ")[1], time: theirSched[keyNames[i]]})
        }
    }
   console.log( formattedSched)
}

export { readTable, getNames, generateEvents };