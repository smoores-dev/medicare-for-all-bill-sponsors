"use client"

import { Box, Modal, Text } from "@mantine/core"
import { useRouter } from "next/navigation"

interface Props {
  scriptFor: string
  isSupporting: boolean
}

export function CallScript({ scriptFor, isSupporting }: Props) {
  const router = useRouter()

  return (
    <Modal
      opened
      onClose={() => {
        router.back()
      }}
      fullScreen
      radius={0}
      classNames={{
        content: "bg-canvas",
        header: "bg-canvas",
        title: "mx-auto max-w-[596px] w-full font-black py-4",
        body: "border-t-2",
        close: "ms-0",
      }}
      transitionProps={{ transition: "fade", duration: 200 }}
      title={`Call script for ${scriptFor}`}
    >
      <Box className="mx-auto max-w-[596px] py-8">
        <Text>
          {isSupporting ? (
            <>
              Hi, my name is ____, I’m a constituent living in ______. I am
              calling to thank you for supporting the Medicare for All Act. I
              appreciate you fighting for health care as a human right, and I
              urge you to make this a top priority.
            </>
          ) : (
            <>
              My name is ______, I am a constituent living in ________. I am
              calling to urge you to cosponsor the Medicare for All Act. In the
              wealthiest nation on earth, no one should die, suffer, or fall
              into debt simply because they need medical care. Healthcare is a
              human right. The United States must join every other
              industrialized nation in the world and pass national healthcare.
              If you do not support the Medicare for all Act, I will elect
              someone who does.
            </>
          )}
        </Text>
      </Box>
    </Modal>
  )
}
