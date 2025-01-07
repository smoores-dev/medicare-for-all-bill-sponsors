import { Stack, Text, Title } from "@mantine/core"

export default async function About() {
  return (
    <Stack align="stretch">
      <Title order={2} className="text-4xl md:text-5xl lg:text-6xl">
        About
      </Title>
      <Title order={3}>About Medicare For All</Title>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at
        dictum libero. Phasellus convallis nunc at convallis cursus. Duis eu
        magna leo. In vitae dignissim odio, eu posuere diam.
      </Text>
      <Title order={3}>About this site</Title>
      <Text>
        This site was created by volunteers who want to keep the fight for
        Medicare For All in the spotlight and make it easy to check which
        members of Congress support the Medicare For All Act in the House and in
        the Senate.
      </Text>
    </Stack>
  )
}
