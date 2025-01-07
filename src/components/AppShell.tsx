"use client"

import {
  MantineProvider,
  AppShell as MantineAppShell,
  AppShellHeader,
  AppShellMain,
  Title,
  Group,
  MantineColorsTuple,
  createTheme,
  rem,
  Divider,
  AppShellFooter,
  Anchor,
} from "@mantine/core"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

const brand: MantineColorsTuple = [
  "#ffefe3",
  "#ffdecc",
  "#ffbc9a",
  "#ff9864",
  "#fe7937",
  "#fe661a",
  "#ff5b09", // Primary
  "#e44b00",
  "#cb4100",
  "#b13500",
]

const canvas: MantineColorsTuple = [
  "#fff8eb", // Primary
  "#fdeed5",
  "#fcdba4",
  "#fcc86f",
  "#fcb744",
  "#fcac2d",
  "#fca722",
  "#e19118",
  "#c88110",
  "#ad6e00",
]

const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand,
    canvas,
  },
  primaryShade: {
    light: 6,
  },
  fontFamily: "var(--font-inter)",
  fontSizes: {
    xs: rem(14),
    sm: rem(16),
    md: rem(18),
    lg: rem(20),
    xl: rem(24),
    "2xl": rem(32),
    "3xl": rem(40),
  },
  components: {
    Title: Title.extend({
      defaultProps: {
        style: {
          fontWeight: 900,
        },
      },
    }),
    Divider: Divider.extend({
      defaultProps: {
        color: "rgba(0, 0, 0, 0.30)",
      },
    }),
  },
})

interface Props {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  const pathname = usePathname()

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <MantineAppShell
        withBorder={false}
        header={{ height: 30 + 20 + 20 }}
        className="p-5"
      >
        {pathname !== "/" && (
          <AppShellHeader className="bg-canvas border-b-brand border-b-2 px-10 py-5">
            <Group align="center">
              <Anchor component={Link} href="/">
                <Title size="h3" className="text-brand">
                  Support M4A
                </Title>
              </Anchor>
            </Group>
          </AppShellHeader>
        )}

        <AppShellMain
          className="mx-auto mt-8"
          style={{
            maxWidth: pathname === "/" ? 726 : 568,
          }}
        >
          {children}
        </AppShellMain>
        <AppShellFooter
          className="bg-canvas mx-auto pb-10"
          style={{
            maxWidth: pathname === "/" ? 726 : 568,
          }}
        >
          <Group className="gap-16">
            {pathname === "/get-involved" && (
              <>
                <Anchor
                  className="text-base text-black opacity-60"
                  component={Link}
                  href="/home"
                >
                  Home
                </Anchor>
                <Anchor
                  className="text-base text-black opacity-60"
                  component={Link}
                  href="/about"
                >
                  About
                </Anchor>
              </>
            )}
            {pathname === "/about" && (
              <>
                <Anchor
                  className="text-base text-black opacity-60"
                  component={Link}
                  href="/home"
                >
                  Home
                </Anchor>
                <Anchor
                  className="text-base text-black opacity-60"
                  component={Link}
                  href="/get-involved"
                >
                  Get Involved
                </Anchor>
              </>
            )}
            {pathname !== "/get-involved" && pathname !== "/about" && (
              <>
                <Anchor
                  className="text-base text-black opacity-60"
                  component={Link}
                  href="/get-involved"
                >
                  Get Involved
                </Anchor>
                <Anchor
                  className="text-base text-black opacity-60"
                  component={Link}
                  href="/about"
                >
                  About
                </Anchor>
              </>
            )}
          </Group>
        </AppShellFooter>
      </MantineAppShell>
    </MantineProvider>
  )
}
