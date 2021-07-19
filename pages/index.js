import Head from 'next/head'
import Image from 'next/image'
import { Text, Textarea, Stack, Center, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
        <Center>
            <Stack spacing={3}>
                <Text fontSize="3xl">Insert Restaurant Schedule</Text>
                <Textarea placeholder="Paste full schedule" />
                <Button>Submit</Button>
            </Stack>
        </Center>
    </div>
  )
}
