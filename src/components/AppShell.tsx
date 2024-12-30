"use client"

import NextLink from "next/link"
import {
  MantineProvider,
  AppShell as MantineAppShell,
  AppShellHeader,
  AppShellMain,
  Title,
  Anchor,
  Group,
} from "@mantine/core"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  return (
    <MantineProvider defaultColorScheme="light">
      <MantineAppShell withBorder={false} header={{ height: 60 }}>
        <AppShellHeader>
          <Group align="center">
            <Anchor component={NextLink} href="/" className="block">
              <Title size="h3">Medicare for All!</Title>
            </Anchor>
          </Group>
        </AppShellHeader>

        <AppShellMain className="mt-8">{children}</AppShellMain>
      </MantineAppShell>
    </MantineProvider>
  )
}
