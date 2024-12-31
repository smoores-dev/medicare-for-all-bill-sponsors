"use client"

import { CongressGovMemberResponseData } from "@/congressGovApi"
import { GoogleCivicInfoDivisonsResponseData } from "@/googleCivicInfoApi"
import { Stack, Paper, Title, Group, Image, Anchor } from "@mantine/core"
import { useCallback, useState, useTransition } from "react"
import { AddressAutocomplete } from "./AddressAutocomplete"

export interface CongressMemberSearchResults {
  members: (CongressGovMemberResponseData["member"] & {
    isCosponsor: boolean
  })[]
  location: GoogleCivicInfoDivisonsResponseData["normalizedInput"]
  district: string
}

interface Props {
  congressNumber: number
  action: (address: string) => Promise<CongressMemberSearchResults>
}

export function SearchForm({ congressNumber, action }: Props) {
  const [state, setState] = useState<null | CongressMemberSearchResults>(null)
  const [isPending, startTransition] = useTransition()

  const onChange = useCallback(
    (address: string) => {
      startTransition(async () => {
        const newState = await action(address)
        startTransition(() => {
          setState(newState)
        })
      })
    },
    [action],
  )

  console.log(state)

  return (
    <>
      <AddressAutocomplete disabled={isPending} onChange={onChange} />
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
                  <Title order={3}>{member.directOrderName}</Title>
                  <p>
                    Chamber:{" "}
                    {
                      member.terms
                        // Members can switch chambers within a single congress in some
                        // cases. First filter for the current congress, then find the most
                        // recent term to determine which chamber to display
                        .filter((term) => term.congress === congressNumber)
                        .reduce((acc, term) =>
                          acc.startYear > term.startYear ? acc : term,
                        )?.chamber
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
