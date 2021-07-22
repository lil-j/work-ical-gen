import {generateEvents} from "../../scripts/ReadTable";
import {GraphQLClient, gql} from "graphql-request";
import updateICal from "../../scripts/UpdateICal";

export default async function handler(req, res) {
    let {cal, name} = req.body;
    // Init GQL Client
    const graphQLClient = new GraphQLClient("https://api-us-west-2.graphcms.com/v2/ckra8kpl51t1201xn28jbgu78/master", {
        headers: {
            authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MjY2NzYwODQsImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuZ3JhcGhjbXMuY29tL3YyL2NrcmE4a3BsNTF0MTIwMXhuMjhqYmd1NzgvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNDdjYjgyNjItODE5YS00ODhkLWIzMmYtZmExMmZjNjE2YTljIiwianRpIjoiY2tyYTh4dnhvMXRrNDAxeGo1YTJzZjdwNSJ9.G3TmPKDI9xRtcPllytiNGoWp2IXu8NWrW4Q0AS5jxlMOwFB_4CxQEEk1_xfAZqgHCwqyQIS-BUJpxj7SEIMRGAcaMfwoz6UiDWwVOU3Bc6PiC3Ccu3SpZ_uBp0NZlhCmFy6YnnEJJnoUsKZi5CKEW16Ot7t6VrVmi66nudNvEm_O0TKeL8iRiEk5pbxaV1UH5V2ZASl6ePH7bm0kHMPUj3xor9spAjHJIRLi_0KxMjIJZqIZQme7tTEIrBJywtFUjQj5ajWo2q7k-vcRg9NjxaePLb2gZgSaRINWu7voL76HDQyAa4-uRvEjP0qB7IPx3uqUyJhiBLRK9MyaIU-kdD89QPJIM8UOJYDz06L3AWz4DBcYW4rFbfejK7rbXL9Jn-SKbHZZ3nEPFHeq9XFCYIfXEjyzFojJMwND3JNjTk_hhzXZQZlU-FG7RSGp9-8ywhU9y-8XhS0KYgED9Use9Elsk24OxEtKwS8oxF5fhU_uvquuI6SWDafhU7_ibpUIEApohS8C0cEjYnKwm6GBrxXw117rbRikd0BbDVed1vK1dLMrqvKd_rzo8WUqZDdmcumEpnjyWTSdxemHNo5BIKNaVCrMdvU2lAQ7tN1z6IHdgG1WvEJ8GxrMfmMbn--MLOwy_3rgg-jnezxfSslDG6a0FCHdPL6dPF3YG-wwtL8"
        },
    });
    // First lets check if we have this use on record
    // If so, let's combine their old schedule with their new one, to allow for schedules that are sent mid-week.
    const check = gql`query MyQuery {
      __typename
      calendar(where: {uid: "${name.name.toLowerCase()}"}) {
        cal
      }
    }
    `
    const checkGq = await graphQLClient.request(check);

    // If we have a match, let's combine the old calendar with the new one
    if (checkGq["calendar"] && checkGq["calendar"].cal !== cal) {
        cal = updateICal(checkGq["calendar"].cal, cal)
    }
    cal = cal.replace(/(\r\n|\n|\r)/gm,"\\n");

    // Update in db
    const query = gql`mutation MyMutation {
      __typename
      upsertCalendar(upsert: {create: {uid: "${name.name.toLowerCase()}", cal: "${cal}"}, update: {cal: "${cal}"}}, where: {uid: "${name.name.toLowerCase()}"}) {
        id
      }
    }
    `
    const data = await graphQLClient.request(query);
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ data }))
}