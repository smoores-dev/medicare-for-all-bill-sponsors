"use client"

import {
  MantineProvider,
  AppShell as MantineAppShell,
  AppShellHeader,
  AppShellMain,
  Title,
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
            <Title size="h3">Medicare for All!</Title>
          </Group>
        </AppShellHeader>

        <AppShellMain className="mt-8">{children}</AppShellMain>
      </MantineAppShell>
    </MantineProvider>
  )
}
