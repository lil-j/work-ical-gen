import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react";
import { readTable, getNames } from "../scripts/ReadTable";
import { Text, Textarea, Input, Stack, Center, Button } from "@chakra-ui/react";

export default function Home() {
  const [scheduleInput, setScheduleInput] = useState("");
  const [rows, setRows] = useState("");
  const [name, setName] = useState("");
  const sendTable = () => {
      if (!rows) setRows(8);
      const splitInput = readTable(scheduleInput);
      console.log(splitInput)
      const names = getNames(splitInput);
      // fetchTitles(splitInput, rows);
  }
  return (
    <div>
        <Center>
            <Stack spacing={3}>
                <Text fontSize="3xl">Insert Restaurant Schedule</Text>
                {/*<Textarea value={scheduleInput} onChange={(e) => setScheduleInput(e.target.value)} placeholder="Paste full schedule"/>*/}
                {/*<Input placeholder="Amount of rows (8 if left empty)" value={rows} onChange={(e) => setRows(e.target.value)}/>*/}
                <div contentEditable dangerouslySetInnerHTML={{__html: scheduleInput}} onInput={(e) => setScheduleInput(e.target.innerHTML)}/>
                <Button onClick={sendTable}>Submit</Button>
            </Stack>
        </Center>
    </div>
  )
}
