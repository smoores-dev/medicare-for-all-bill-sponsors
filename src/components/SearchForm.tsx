"use client"

import { CongressGovMemberResponseData } from "@/congressGovApi"
import { GoogleCivicInfoDivisonsResponseData } from "@/googleCivicInfoApi"
import {
  TextInput,
  Button,
  Stack,
  Paper,
  Title,
  Group,
  Image,
  Anchor,
} from "@mantine/core"
import { useActionState } from "react"

export interface CongressMemberSearchResults {
  members: (CongressGovMemberResponseData["member"] & {
    isCosponsor: boolean
  })[]
  location: GoogleCivicInfoDivisonsResponseData["normalizedInput"]
  district: string
}

interface Props {
  action: (
    prevState: CongressMemberSearchResults | null,
    formData: FormData,
  ) => Promise<CongressMemberSearchResults>
}

export function SearchForm({ action }: Props) {
  const [state, formAction, isPending] = useActionState(action, null)

  return (
    <>
      <form action={formAction} className="flex flex-col">
        <TextInput label="Address" name="address" />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
      {state && (
        <Stack>
          <p>State: {state.location.state}</p>
          <p>Municipality: {state.location.city}</p>
          <p>Congressional district: {state.district}</p>
          <Title order={2}>Your representatives</Title>
          {state.members.map((member) => (
            <Paper key={member.bioguideId}>
              <Group>
                <Image h={150} w={100} src={member.depiction.imageUrl} alt="" />
                <Stack>
                  <Title order={3}>{member.name}</Title>
                  <p>
                    Chamber:{" "}
                    {
                      member.terms.find((term) => term.congress === 118)
                        ?.chamber
                    }
                  </p>
                  {member.isCosponsor ? (
                    <p>Is a cosponsor for the Medicare for All bill!</p>
                  ) : (
                    <>
                      <p>
                        Is not yet a cosponsor for the Medicare for All bill
                      </p>
                      <p>
                        Give them a call:{" "}
                        <Anchor
                          href={`tel:${member.addressInformation.phoneNumber}`}
                        >
                          {member.addressInformation.phoneNumber}
                        </Anchor>
                      </p>
                    </>
                  )}
                </Stack>
              </Group>
            </Paper>
          ))}
        </Stack>
      )}
    </>
  )
}
