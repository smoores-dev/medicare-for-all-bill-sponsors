import { GetInvolvedForm } from "@/components/GetInvolvedForm"
import payloadConfig from "@/payload.config"
import { Stack, Text, Title } from "@mantine/core"
import { getPayload } from "payload"

export default async function GetInvolved() {
  const payload = await getPayload({ config: payloadConfig })

  const form = await payload.findByID({ collection: "forms", id: 1 })
  return (
    <Stack align="stretch">
      <Title order={2} className="mb-2 text-5xl lg:mb-4 lg:text-6xl">
        Get Involved
      </Title>
      <Text>
        Sign up if you are interested in helping organize for Medicare For All.
        The path may be long, but we will win universal healthcare in the USA.
      </Text>
      <GetInvolvedForm form={form} />
    </Stack>
  )
}
