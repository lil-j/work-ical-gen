import Head from 'next/head'
import Image from 'next/image'
import {useState} from "react";
import {readTable, getNames, generateEvents} from "../scripts/ReadTable";
import {Text, Textarea, Input, Stack, Center, Button} from "@chakra-ui/react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";

export default function Home() {
    const [scheduleInput, setScheduleInput] = useState();
    const { width, height } = useWindowSize()
    const [rows, setRows] = useState("");
    const [name, setName] = useState("");
    const [names, setNames] = useState();
    const [selectedName, setSelectedName] = useState();
    const [success, setSuccess] = useState(false);
    const sendTable = () => {
        if (!rows) setRows(8);
        const splitInput = readTable(scheduleInput);
        setScheduleInput(splitInput);
        const names = getNames(splitInput);
        setNames(names);
        // fetchTitles(splitInput, rows);
    }

    const generateCalendar = async () => {
        let cal = generateEvents(scheduleInput, selectedName);
        console.log(cal)
        const response = await fetch("/api/generate-calendar", {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                cal, name:selectedName
            })
        })
        const responseJson = await response.json();
        if(responseJson.errors) {
            console.log(responseJson.errors)
        } else {
            //success
            setSuccess(true)

        }
    }

    return (
        <div>
            <Center>
                <Stack spacing={3}>
                    {
                        !names ? <><Text fontSize="3xl">Insert Restaurant Schedule</Text>
                                <div contentEditable dangerouslySetInnerHTML={{__html: scheduleInput}}
                                     onInput={(e) => setScheduleInput(e.target.innerHTML)}/>
                                <Button onClick={sendTable}>Submit</Button></> :
                            <>
                                <br/>
                                <br/>
                                <br/>
                                <Stack spacing={3}>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                                            Choose Your Name
                                        </MenuButton>
                                        <MenuList>
                                            {
                                                names.map(({name, index}) => (
                                                    <MenuItem
                                                        key={index}
                                                        onClick={() => setSelectedName({name:name, index:index})}>{name}</MenuItem>
                                                ))
                                            }
                                        </MenuList>
                                    </Menu>
                                    <Text fontSize={"3xl"}>Selected Name: <strong>{selectedName && selectedName.name}</strong></Text>
                                    <Button onClick={generateCalendar}>Generate</Button>
                                    {success && <>
                                        <Confetti
                                            width={width}
                                            height={height}
                                        />
                                    <a href={`/api/calendar/${selectedName.name}`}>SUCCESS - USE THIS LINK IN GCAL</a></>}
                                </Stack>
                            </>
                    }

                </Stack>
            </Center>
        </div>
    )
}
