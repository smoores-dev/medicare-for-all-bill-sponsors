import {
  CongressMemberSearchResults,
  SearchForm,
} from "@/components/SearchForm"
import { CongressGovApiClient } from "@/congressGovApi"
import { GoogleCivicInfoApiClient } from "@/googleCivicInfoApi"
import { Stack } from "@mantine/core"

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

export default async function HomePage() {
  async function findRepresentatives(
    prevData: CongressMemberSearchResults | null,
    formData: FormData,
  ): Promise<CongressMemberSearchResults> {
    "use server"

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

    const address = formData.get("address") as string

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

    return {
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
  }

  return (
    <Stack align="center">
      <p>
        Enter your address below and find out how to make sure your
        representatives support Medicare for all
      </p>
      <SearchForm action={findRepresentatives} />
    </Stack>
  )
}
