import { CallScript } from "@/components/CallScript"

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function CallScriptPage({ searchParams }: Props) {
  const { member, phoneNumber, supporting } = await searchParams
  const isSupporting = supporting === "true"

  return (
    <CallScript
      scriptFor={member as string}
      phoneNumber={phoneNumber as string}
      isSupporting={isSupporting}
    />
  )
}
