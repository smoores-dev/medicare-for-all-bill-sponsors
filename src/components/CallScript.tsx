"use client"

import { Box, Button, Modal, Text } from "@mantine/core"
import { useState } from "react"

interface Props {
  scriptFor: string
}

export function CallScript({ scriptFor }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setIsOpen(true)}>
        View call script
      </Button>

      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        fullScreen
        radius={0}
        classNames={{
          content: "bg-canvas",
          header: "bg-canvas",
          title: "mx-auto max-w-[596px] font-black py-4",
          body: "border-t-2",
        }}
        transitionProps={{ transition: "fade", duration: 200 }}
        title={`Call script for ${scriptFor}`}
      >
        <Box className="mx-auto max-w-[596px] py-8">
          <Text>
            My name is ______, I am a constituent living in ________. I am
            calling to urge you to cosponsor the Medicare for All Act. In the
            wealthiest nation on earth, no one should die, suffer, or fall into
            debt simply because they need medical care. Healthcare is a human
            right. The United States must join every other industrialized nation
            in the world and pass national healthcare. If you do not support the
            Medicare for all Act, I will elect someone who does.
          </Text>
        </Box>
      </Modal>
    </>
  )
}
