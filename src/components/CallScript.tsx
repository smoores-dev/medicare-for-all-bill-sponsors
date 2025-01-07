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
          title: "font-black py-4",
        }}
        transitionProps={{ transition: "fade", duration: 200 }}
        title={`Call script for ${scriptFor}`}
      >
        <Box className="border-t-2 py-8">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at
            dictum libero.
          </Text>
          <Text>
            Phasellus convallis nunc at convallis cursus. Duis eu magna leo. In
            vitae dignissim odio, eu posuere diam. Phasellus eleifend lacus
            efficitur dignissim malesuada. Nulla volutpat sit amet arcu at
            feugiat. Maecenas tristique nisi nec odio accumsan, in aliquet ante
            sollicitudin. In dapibus libero eget orci condimentum, non faucibus
            lacus blandit. Proin convallis nisi vitae tempor pretium. Fusce in
            lorem turpis.
          </Text>
          <Text>
            In id vestibulum ante. Etiam ut porttitor massa, et malesuada magna.
            Proin sed nisi laoreet, aliquam dui sit amet, auctor odio.
          </Text>
        </Box>
      </Modal>
    </>
  )
}
