export type RadarGeocodeLayer =
  | "place"
  | "address"
  | "postalCode"
  | "locality"
  | "neighborhood"
  | "county"
  | "state"
  | "country"
  | "coarse"
  | "fine"

export interface RadarAddress {
  addressLabel?: string
  borough?: string
  city?: string
  confidence?: "exact" | "interpolated" | "fallback"
  country?: string
  countryCode?: string
  countryFlag?: string
  county?: string
  distance?: number
  dma?: string
  dmaCode?: string
  formattedAddress?: string
  geometry: GeoJSON.Point
  latitude: number
  longitude: number
  layer?: RadarGeocodeLayer
  neighborhood?: string
  number?: string
  unit?: string
  placeLabel?: string
  postalCode?: string
  state?: string
  stateCode?: string
  street?: string
}

export interface RadarAutocompleteResponseData {
  meta: {
    code: number
  }
  addresses: RadarAddress[]
}

export class Radar {
  constructor(
    private apiKey: string,
    public baseUrl: string,
  ) {}

  private async fetch<Results>(url: URL) {
    const response = await fetch(url, {
      headers: {
        Authorization: this.apiKey,
      },
    })

    const result = (await response.json()) as Results
    return result
  }

  async autocomplete(query: string) {
    const url = new URL("search/autocomplete", this.baseUrl)
    url.searchParams.append("query", query)
    url.searchParams.append("layers", "address")
    url.searchParams.append("countryCode", "US")

    const { addresses } = await this.fetch<RadarAutocompleteResponseData>(url)

    return addresses
  }
}
