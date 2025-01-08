import { AddressAutocomplete } from "@/components/AddressAutocomplete"
import { Stack, Text, Title } from "@mantine/core"

const CONGRESS_NUMBER =
  process.env.CONGRESS_NUMBER !== undefined &&
  parseInt(process.env.CONGRESS_NUMBER, 10)

export default async function HomePage() {
  if (CONGRESS_NUMBER === false) {
    throw new Error(`Missing environment variable CONGRESS_NUMBER`)
  }

  return (
    <Stack align="flex-start" className="mx-auto">
      <Title className="text-4xl md:text-5xl lg:text-6xl">
        Do your elected
        <br />
        representatives support
        <br />
        <span className="text-brand">Medicare For All?</span>
      </Title>
      <Text className="text-lg">Use this search to find out.</Text>
      <AddressAutocomplete />
    </Stack>
  )
}
