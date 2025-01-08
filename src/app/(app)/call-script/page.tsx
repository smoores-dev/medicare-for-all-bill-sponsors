import { CallScript } from "@/components/CallScript"

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function CallScriptPage({ searchParams }: Props) {
  const { member, supporting } = await searchParams
  const isSupporting = supporting === "true"

  return <CallScript scriptFor={member as string} isSupporting={isSupporting} />
}
