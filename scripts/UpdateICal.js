export default function updateICal(prevCal, newCal) {
    let fullCal = "";
    // Make previous calendar limited to
    prevCal = prevCal.split("\n")
    prevCal.pop();
    prevCal.reverse();
    prevCal.pop();
    prevCal.pop();
    prevCal.pop();
    prevCal.pop();
    prevCal.pop();
    prevCal.reverse();

    // Combine newCal with prevCal
    let newCalDupped = newCal.split("\n");
    let justCalBeg = newCalDupped[0] + "\n" + newCalDupped[1] + "\n" + newCalDupped[2]
        + "\n" + newCalDupped[3] + "\n" + newCalDupped[4] + "\n";
    newCalDupped.reverse();
    newCalDupped.pop();
    newCalDupped.pop();
    newCalDupped.pop();
    newCalDupped.pop();
    newCalDupped.pop();
    newCalDupped.reverse();

    // Combine everything
    fullCal = justCalBeg + prevCal.join("\n") + "\n" + newCalDupped.join("\n");
    return fullCal;
}