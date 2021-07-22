function updateICal(prevCal, newCal) {
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
    fullCal = justCalBeg + prevCal.join("\n") + "\n" + newCalDupped.join("\n");
    return fullCal;
}
const testingCal = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//sebbo.net//ical-generator//EN
NAME:Jacob's Tanoor Schedule
X-WR-CALNAME:Jacob's Tanoor Schedule
BEGIN:VEVENT
UID:f6d87f77-530b-4cd9-87f3-527228773ca2
SEQUENCE:0
DTSTAMP:20210720T024724Z
DTSTART:20210722T150000Z
DTEND:20210722T200000Z
SUMMARY:Work @ Tanoor
LOCATION:Tanoor Sammamish
DESCRIPTION:dev by Jake
BEGIN:VALARM
ACTION:AUDIO
TRIGGER:-PT30M
ATTACH;VALUE=URI:Basso
END:VALARM
URL;VALUE=URI:https://lilj.dev/
END:VEVENT
BEGIN:VEVENT
UID:f11de16e-b5c0-4c78-b923-24b5db3d6608
SEQUENCE:0
DTSTAMP:20210720T024724Z
DTSTART:20210723T210000Z
DTEND:20210724T010000Z
SUMMARY:Work @ Tanoor
LOCATION:Tanoor Sammamish
DESCRIPTION:dev by Jake
BEGIN:VALARM
ACTION:AUDIO
TRIGGER:-PT30M
ATTACH;VALUE=URI:Basso
END:VALARM
URL;VALUE=URI:https://lilj.dev/
END:VEVENT
BEGIN:VEVENT
UID:b0d43799-906e-4714-b5d3-890b0a557e90
SEQUENCE:0
DTSTAMP:20210720T024724Z
DTSTART:20210724T210000Z
DTEND:20210725T010000Z
SUMMARY:Work @ Tanoor
LOCATION:Tanoor Sammamish
DESCRIPTION:dev by Jake
BEGIN:VALARM
ACTION:AUDIO
TRIGGER:-PT30M
ATTACH;VALUE=URI:Basso
END:VALARM
URL;VALUE=URI:https://lilj.dev/
END:VEVENT
BEGIN:VEVENT
UID:4a08319c-cd48-44ec-832c-212c6bc45aa3
SEQUENCE:0
DTSTAMP:20210720T024724Z
DTSTART:20210725T210000Z
DTEND:20210726T010000Z
SUMMARY:Work @ Tanoor
LOCATION:Tanoor Sammamish
DESCRIPTION:dev by Jake
BEGIN:VALARM
ACTION:AUDIO
TRIGGER:-PT30M
ATTACH;VALUE=URI:Basso
END:VALARM
URL;VALUE=URI:https://lilj.dev/
END:VEVENT
END:VCALENDAR`
updateICal(testingCal, testingCal)