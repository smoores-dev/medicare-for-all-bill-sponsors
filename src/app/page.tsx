import {
  CongressMemberSearchResults,
  SearchForm,
} from "@/components/SearchForm"
import { CongressGovApiClient } from "@/congressGovApi"
import { GoogleCivicInfoApiClient } from "@/googleCivicInfoApi"
import { Stack } from "@mantine/core"

export default async function HomePage() {
  async function findRepresentatives(
    prevData: CongressMemberSearchResults | null,
    formData: FormData,
  ): Promise<CongressMemberSearchResults> {
    "use server"

    const address = formData.get("address") as string

    const googleCivicInfoClient = new GoogleCivicInfoApiClient(
      process.env.GOOGLE_CIVIC_INFORMATION_API_KEY!,
      process.env.GOOGLE_CIVIC_INFORMATION_BASE_URL!,
    )

    const { state, district, normalizedInput, districtName } =
      await googleCivicInfoClient.getDistrictFromAddress(address)

    const congressGovClient = new CongressGovApiClient(
      process.env.CONGRESS_GOV_API_KEY!,
      process.env.CONGRESS_GOV_BASE_URL!,
    )

    const memberData = await congressGovClient.getMembersByDistrict(
      state.toUpperCase(),
      parseInt(district, 10),
    )

    const [hrBillSponsors, sBillSponsors] = await Promise.all([
      congressGovClient.getHrBillSponsors(118, 3421),
      congressGovClient.getSenateBillSponsors(118, 1655),
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
