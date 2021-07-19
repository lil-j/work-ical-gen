// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).send("BEGIN:VCALENDAR\n" +
      "VERSION:2.0\n" +
      "PRODID:-//sebbo.net//ical-generator//EN\n" +
      "NAME:TANOOR SCHEDULE\n" +
      "X-WR-CALNAME:TANOOR SCHEDULE\n" +
      "BEGIN:VEVENT\n" +
      "UID:76d3ef50-9213-43a4-a4e5-44ae395af04b\n" +
      "SEQUENCE:0\n" +
      "DTSTAMP:20210719T060107Z\n" +
      "DTSTART:20210722T150000Z\n" +
      "DTEND:20210722T200000Z\n" +
      "SUMMARY:Work @ Tanoor\n" +
      "LOCATION:Tanoor Sammamish\n" +
      "DESCRIPTION:dev by Jake\n" +
      "URL;VALUE=URI:https://lilj.dev/\n" +
      "END:VEVENT\n" +
      "BEGIN:VEVENT\n" +
      "UID:ec668146-07a5-4c2f-869f-4445fb6d1161\n" +
      "SEQUENCE:0\n" +
      "DTSTAMP:20210719T060107Z\n" +
      "DTSTART:20210723T210000Z\n" +
      "DTEND:20210724T010000Z\n" +
      "SUMMARY:Work @ Tanoor\n" +
      "LOCATION:Tanoor Sammamish\n" +
      "DESCRIPTION:dev by Jake\n" +
      "URL;VALUE=URI:https://lilj.dev/\n" +
      "END:VEVENT\n" +
      "BEGIN:VEVENT\n" +
      "UID:ab39d863-2e48-4d35-8241-cac755bfe995\n" +
      "SEQUENCE:0\n" +
      "DTSTAMP:20210719T060107Z\n" +
      "DTSTART:20210724T210000Z\n" +
      "DTEND:20210725T010000Z\n" +
      "SUMMARY:Work @ Tanoor\n" +
      "LOCATION:Tanoor Sammamish\n" +
      "DESCRIPTION:dev by Jake\n" +
      "URL;VALUE=URI:https://lilj.dev/\n" +
      "END:VEVENT\n" +
      "BEGIN:VEVENT\n" +
      "UID:8a57a96f-4ba5-4d5b-a1a5-abd488255430\n" +
      "SEQUENCE:0\n" +
      "DTSTAMP:20210719T060107Z\n" +
      "DTSTART:20210725T210000Z\n" +
      "DTEND:20210726T010000Z\n" +
      "SUMMARY:Work @ Tanoor\n" +
      "LOCATION:Tanoor Sammamish\n" +
      "DESCRIPTION:dev by Jake\n" +
      "URL;VALUE=URI:https://lilj.dev/\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR")
}
