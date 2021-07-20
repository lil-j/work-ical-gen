import Head from 'next/head'
import {useState} from "react";
import {readTable, getNames, parseSplitInput, generateEvents} from "../scripts/ReadTable";
import {Text, Textarea, Input, Stack, Center, Button, Link} from "@chakra-ui/react";
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
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import {ChevronDownIcon} from "@chakra-ui/icons";

export default function Home() {
    const [scheduleInput, setScheduleInput] = useState();
    const {width, height} = useWindowSize()
    const [name, setName] = useState("");
    const [names, setNames] = useState();
    const [selectedName, setSelectedName] = useState();
    const [displayedShifts, setDisplayedShifts] = useState();
    const [success, setSuccess] = useState(false);
    const sendTable = () => {
        const splitInput = readTable(scheduleInput);
        setScheduleInput(splitInput);
        const names = getNames(splitInput);
        setNames(names);
        // fetchTitles(splitInput, rows);
    }
    const onPersonChose = (name, index) => {
        setSelectedName({
            name: name,
            index: index
        })
        const parsedSplit = parseSplitInput(scheduleInput, {
            name: name,
            index: index
        });
        console.log(parsedSplit);
        setDisplayedShifts(parsedSplit);
    }
    const generateCalendar = async () => {
        let cal = generateEvents(scheduleInput, selectedName);
        console.log(cal)
        const response = await fetch("/api/generate-calendar", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                cal, name: selectedName
            })
        })
        const responseJson = await response.json();
        if (responseJson.errors) {
            console.log(responseJson.errors)
        } else {
            //success
            setSuccess(true)

        }
    }

    return (
        <div>
            <Head>
                <title>Schedule to Calendar Builder</title>
            </Head>
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
                                    <Menu boundary={"scrollParent"}>
                                        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                                            Choose Your Name
                                        </MenuButton>
                                        <MenuList>
                                            {
                                                names.map(({name, index}) => (
                                                    <MenuItem
                                                        key={index}
                                                        onClick={() => onPersonChose(name,index)}>{name}</MenuItem>
                                                ))
                                            }
                                        </MenuList>
                                    </Menu>
                                    <Text fontSize={"3xl"}>Selected
                                        Name: <strong>{selectedName && selectedName.name}</strong></Text>
                                    <Text>{displayedShifts && displayedShifts.map(({date, time}, index) => (
                                        <li key={index}>{date} | {time}</li>
                                        ))}</Text>
                                    <Button onClick={generateCalendar}>Generate</Button>
                                    {success && <>
                                        <Confetti
                                            width={width}
                                            height={height}
                                        />
                                        <Modal isOpen={success}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Calendar Creation Success</ModalHeader>
                                                <ModalBody>
                                                    Use <Link color="blue.400" href={`/api/calendar/${selectedName.name}`}>this link</Link> as the import URL
                                                    for external calendars. Come back to this site each week as new calendars come out.
                                                    If this is not your first time using this site, there is no need to recreate the calendar,
                                                    it will automatically update within a few hours.
                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button variant="ghost"><a href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl" rel="noreferrer" target="_blank">Open Google Calendar</a></Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                        </>}
                                </Stack>
                            </>
                    }

                </Stack>
            </Center>
        </div>
    )
}
