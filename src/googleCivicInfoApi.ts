export interface GoogleCivicInfoDivisonsResponseData {
  kind: "civicinfo#divisionsByAddressResponse"
  normalizedInput: {
    locationName?: string
    line1: string
    line2?: string
    line3?: string
    city: string
    state: string
    zip: string
  }
  divisions: {
    [key: string]: {
      name: string
      alsoKnownAs: string[]
    }
  }
}

export class GoogleCivicInfoApiClient {
  constructor(
    private apiKey: string,
    public baseUrl: string,
  ) {}

  private async fetch<Results>(url: URL) {
    url.searchParams.append("key", this.apiKey)

    const response = await fetch(url)

    const result = (await response.json()) as Results
    return result
  }

  async getDistrictFromAddress(address: string) {
    const civicInfoUrl = new URL("divisionsByAddress", this.baseUrl)
    civicInfoUrl.searchParams.append("address", address)

    const divisions =
      await this.fetch<GoogleCivicInfoDivisonsResponseData>(civicInfoUrl)

    const districtDivision = Object.entries(divisions.divisions).find(([id]) =>
      id.includes("/cd:"),
    )

    if (!districtDivision) {
      throw new Error(
        "Unable to find congressional district for provided address.",
      )
    }

    const match = districtDivision[0].match(/\/state:([a-z]{2})\/cd:([0-9]+)/)

    if (!match) {
      throw new Error(
        "Unable to find congressional district for provided address.",
      )
    }

    const [, state, district] = match

    if (!state || !district) {
      throw new Error(
        "Unable to find congressional district for provided address.",
      )
    }

    return {
      state,
      district,
      normalizedInput: divisions.normalizedInput,
      districtName: districtDivision[1].name,
    }
  }
}
