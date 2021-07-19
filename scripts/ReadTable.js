import HtmlTableToJson from "html-table-to-json";

const readTable = (input) => {
    return HtmlTableToJson.parse(input);
}

const getNames = (splitInput) => {
    console.log(splitInput.results)
    // todo: optimize for seattle
    let names = [];
    for (let i = 0; i < splitInput.results[0].length; i ++) {
        names.push(splitInput.results[0][i].Sammamish);
    }
    return names;
}

export { readTable, getNames };