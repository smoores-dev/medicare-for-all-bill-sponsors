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
  Anchor,
  Stack,
} from "@mantine/core"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import cx from "classnames"

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
        header={pathname !== "/" ? { height: rem(30 + 20 + 20) } : undefined}
        className="p-5"
      >
        {pathname !== "/" && (
          <AppShellHeader className="border-b-2 border-b-brand bg-canvas px-10 py-5">
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
          className={cx("mx-auto mt-8", {
            "min-h-[calc(100dvh-(1.25rem+1.25rem+2rem))]": pathname === "/",
            "min-h-[calc(100dvh-(1.25rem+1.25rem+2rem+2px+1.25rem+1.25rem+1.875rem))]":
              pathname !== "/",
          })}
          style={{
            maxWidth: pathname === "/" ? 726 : 568,
          }}
        >
          <Stack
            justify="space-between"
            align="flex-start"
            className={cx({
              "min-h-[calc(100dvh-(1.25rem+1.25rem+2rem))]": pathname === "/",
              "min-h-[calc(100dvh-(1.25rem+1.25rem+2rem+2px+1.25rem+1.25rem+1.875rem))]":
                pathname !== "/",
            })}
          >
            {children}
            <Group
              className="gap-16 pb-10 pt-6"
              style={{
                maxWidth: pathname === "/" ? 726 : 568,
              }}
            >
              {pathname === "/get-involved" && (
                <>
                  <Anchor
                    className="text-base text-black opacity-60"
                    component={Link}
                    href="/"
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
                    href="/"
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
          </Stack>
        </AppShellMain>
        {/* <AppShellFooter
          className="bg-canvas mx-auto pb-10"
          style={{
            maxWidth: pathname === "/" ? 726 : 568,
          }}
        > */}
        {/* </AppShellFooter> */}
      </MantineAppShell>
    </MantineProvider>
  )
}
