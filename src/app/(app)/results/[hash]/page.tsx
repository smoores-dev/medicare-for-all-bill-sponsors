import { CallScript } from "@/components/CallScript"
import { CongressGovApiClient } from "@/congressGovApi"
import { GoogleCivicInfoApiClient } from "@/googleCivicInfoApi"
import {
  Anchor,
  Group,
  Paper,
  Stack,
  Title,
  Image,
  Text,
  Divider,
  Box,
} from "@mantine/core"
import Link from "next/link"

const GOOGLE_CIVIC_INFORMATION_API_KEY =
  process.env.GOOGLE_CIVIC_INFORMATION_API_KEY
const GOOGLE_CIVIC_INFORMATION_BASE_URL =
  process.env.GOOGLE_CIVIC_INFORMATION_BASE_URL

const CONGRESS_GOV_API_KEY = process.env.CONGRESS_GOV_API_KEY
const CONGRESS_GOV_BASE_URL = process.env.CONGRESS_GOV_BASE_URL

const CONGRESS_NUMBER =
  process.env.CONGRESS_NUMBER !== undefined &&
  parseInt(process.env.CONGRESS_NUMBER, 10)
const HR_BILL_NUMBER =
  process.env.HR_BILL_NUMBER !== undefined &&
  parseInt(process.env.HR_BILL_NUMBER, 10)
const SENATE_BILL_NUMBER =
  process.env.SENATE_BILL_NUMBER !== undefined &&
  parseInt(process.env.SENATE_BILL_NUMBER, 10)

interface Props {
  params: Promise<{ hash: string }>
}

export default async function Results({ params }: Props) {
  const { hash } = await params
  const address = Buffer.from(hash, "base64url").toString("utf-8")

  if (GOOGLE_CIVIC_INFORMATION_API_KEY === undefined) {
    throw new Error(
      `Missing environment variable GOOGLE_CIVIC_INFORMATION_API_KEY`,
    )
  }
  if (GOOGLE_CIVIC_INFORMATION_BASE_URL === undefined) {
    throw new Error(
      `Missing environment variable GOOGLE_CIVIC_INFORMATION_BASE_URL`,
    )
  }
  if (CONGRESS_GOV_API_KEY === undefined) {
    throw new Error(`Missing environment variable CONGRESS_GOV_API_KEY`)
  }
  if (CONGRESS_GOV_BASE_URL === undefined) {
    throw new Error(`Missing environment variable CONGRESS_GOV_BASE_URL`)
  }
  if (CONGRESS_NUMBER === false) {
    throw new Error(`Missing environment variable CONGRESS_NUMBER`)
  }
  if (HR_BILL_NUMBER === false) {
    throw new Error(`Missing environment variable HR_BILL_NUMBER`)
  }
  if (SENATE_BILL_NUMBER === false) {
    throw new Error(`Missing environment variable SENATE_BILL_NUMBER`)
  }

  const googleCivicInfoClient = new GoogleCivicInfoApiClient(
    GOOGLE_CIVIC_INFORMATION_API_KEY,
    GOOGLE_CIVIC_INFORMATION_BASE_URL,
  )

  const { state, district, normalizedInput, districtName } =
    await googleCivicInfoClient.getDistrictFromAddress(address)

  const congressGovClient = new CongressGovApiClient(
    CONGRESS_GOV_API_KEY,
    CONGRESS_GOV_BASE_URL,
  )

  const memberData = await congressGovClient.getMembersByDistrict(
    state.toUpperCase(),
    parseInt(district, 10),
  )

  const [hrBillSponsors, sBillSponsors] = await Promise.all([
    congressGovClient.getHrBillSponsors(CONGRESS_NUMBER, HR_BILL_NUMBER),
    congressGovClient.getSenateBillSponsors(
      CONGRESS_NUMBER,
      SENATE_BILL_NUMBER,
    ),
  ])

  const results = {
    members: memberData.members.map((member) => ({
      ...member,
      isCosponsor:
        hrBillSponsors.cosponsors.some(
          (sponsor) => sponsor.bioguideId === member.bioguideId,
        ) ||
        hrBillSponsors.sponsors.some(
          (sponsor) => sponsor.bioguideId === member.bioguideId,
        ) ||
        sBillSponsors.cosponsors.some(
          (sponsor) => sponsor.bioguideId === member.bioguideId,
        ) ||
        sBillSponsors.sponsors.some(
          (sponsor) => sponsor.bioguideId === member.bioguideId,
        ),
    })),
    location: normalizedInput,
    district: districtName,
  }

  return (
    <Stack className="m-auto gap-8">
      <Box>
        <Title order={2} className="mb-3 text-4xl">
          {address}
        </Title>
        <Text size="lg">{results.district}</Text>
      </Box>
      <Divider />
      <Text>Your representatives:</Text>
      <Stack className="gap-12">
        {results.members.map((member) => {
          const chamber = member.terms
            // Members can switch chambers within a single congress in some
            // cases. First filter for the current congress, then find the most
            // recent term to determine which chamber to display
            .filter((term) => term.congress === CONGRESS_NUMBER)
            .reduce((acc, term) =>
              acc.startYear > term.startYear ? acc : term,
            )?.chamber

          const party = member.partyHistory.reduce((acc, party) =>
            acc.startYear > party.startYear ? acc : party,
          )?.partyAbbreviation

          return (
            <Paper key={member.bioguideId} className="bg-canvas">
              <Group>
                <Image h={120} w={100} src={member.depiction.imageUrl} alt="" />
                <Stack justify="space-between" className="grow">
                  <Box>
                    <Title order={3} size="lg">
                      {member.directOrderName}
                    </Title>
                    <Text>
                      {chamber === "Senate" ? chamber : "House"} ({party})
                    </Text>
                    <Text>
                      {member.isCosponsor
                        ? "Is a cosponsor of the Medicare For All Act 😄"
                        : "Not a cosponsor of the Medicare For All Act 😠"}
                    </Text>
                  </Box>
                  <Group
                    justify="space-between"
                    className="self-stretch"
                    gap={0}
                  >
                    <Text>
                      Give them a call:{" "}
                      <Anchor
                        className="font-bold text-black"
                        href={`tel:${member.addressInformation.phoneNumber}`}
                      >
                        {member.addressInformation.phoneNumber}
                      </Anchor>
                    </Text>
                    <CallScript
                      scriptFor={`${chamber === "Senate" ? "Sen." : "Rep."} ${member.directOrderName}`}
                    />
                  </Group>
                </Stack>
              </Group>
            </Paper>
          )
        })}
      </Stack>
      <Divider />
      <Box>
        <Text className="text-2xl">
          Want to help organize for Medicare For All?
        </Text>
        <Text className="text-brand underline">
          <Anchor
            className="text-2xl font-black"
            component={Link}
            href="/get-involved"
          >
            Sign up to get involved.
          </Anchor>
        </Text>
      </Box>
    </Stack>
  )
}
