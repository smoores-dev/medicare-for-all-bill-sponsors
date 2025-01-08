export interface CongressGovMemberResponseData {
  member: {
    bioguideId: string
    depiction?: {
      attribution: string
      imageUrl: string
    }
    district: number | null
    partyHistory: {
      partyAbbreviation: string
      partyName: string
      startYear: number
    }[]
    state: string
    terms: {
      chamber: string
      startYear: number
      endYear?: number
      congress: number
    }[]
    updateDate: string
    url: string
    firstName: string
    middleName: string
    lastName: string
    suffix: string
    directOrderName: string
    addressInformation: {
      officeAddress: string
      city: string
      district: string
      zipcode: string
      phoneNumber: string
    }
  }
}

export interface CongressGovMembersResponseData {
  members: {
    bioguideId: string
    depiction: {
      attribution: string
      imageUrl: string
    }
    district: number | null
    name: string
    partyName: string
    state: string
    terms: {
      item: {
        chamber: string
        startYear: number
      }[]
    }
    updateDate: string
    url: string
  }[]
}

export interface CongressGovBillCosponsorsResponseData {
  cosponsors: {
    bioguideId: string
    district: number
    firstName: string
    fullName: string
    isOriginalCosponsor: boolean
    lastName: string
    middleName: string
    party: string
    sponsorshipDate: string
    state: string
    url: string
  }[]
  pagination: {
    count: number
    countIncludingWithdrawnCosponsors: number
    next: string
  }
}

export interface CongressGoveBillResponseData {
  bill: {
    sponsors: {
      bioguideId: string
      district: number
      firstName: string
      fullName: string
      isOriginalCosponsor: boolean
      lastName: string
      middleName: string
      party: string
      sponsorshipDate: string
      state: string
      url: string
    }[]
  }
}

export class CongressGovApiClient {
  constructor(
    private apiKey: string,
    public congressNumber: number,
    public baseUrl: string,
  ) {}

  private async fetch<Results>(url: URL) {
    url.searchParams.append("api_key", this.apiKey)

    const response = await fetch(url, {
      next: {
        // Cache for one day
        revalidate: 60 * 60 * 24,
      },
    })

    const result = (await response.json()) as Results
    return result
  }

  async getMemberDetails(bioguideId: string) {
    const memberUrl = new URL(`member/${bioguideId}`, this.baseUrl)

    const result = await this.fetch<CongressGovMemberResponseData>(memberUrl)

    return result.member
  }

  async listMembersByDistrict(state: string, district: number) {
    const membersUrl = new URL(
      `member/congress/${this.congressNumber}/${state.toUpperCase()}`,
      this.baseUrl,
    )
    membersUrl.searchParams.append("currentMember", "true")
    // California has the largest number of house members with 52,
    // so no state will have more than 54 total reps
    membersUrl.searchParams.append("limit", "54")

    const membersData =
      await this.fetch<CongressGovMembersResponseData>(membersUrl)

    return {
      members: membersData.members.filter(
        (member) =>
          // Senators have no district, so include members with null districts
          // as well
          member.district === district || member.district == null,
      ),
    }
  }

  async getMembersByDistrict(
    state: string,
    district: number,
  ): Promise<{ members: CongressGovMemberResponseData["member"][] }> {
    const membersResponse = await this.listMembersByDistrict(state, district)
    const memberIds = membersResponse.members.map((member) => member.bioguideId)

    const members = await Promise.all(
      memberIds.map((bioguideId) => this.getMemberDetails(bioguideId)),
    )

    return {
      members,
    }
  }

  async getHrBillCosponsors(congress: number, billNumber: number) {
    const billCosponsorsUrl = new URL(
      `bill/${congress}/hr/${billNumber}/cosponsors`,
      this.baseUrl,
    )
    // The max for this param is 250
    billCosponsorsUrl.searchParams.append("limit", "250")

    const pageOne =
      await this.fetch<CongressGovBillCosponsorsResponseData>(billCosponsorsUrl)

    // If we do a good job, we may have more than 250 cosponsors!
    // If so, we need to send a second request for the rest
    if (pageOne.pagination.count > 250) {
      billCosponsorsUrl.searchParams.append("offset", "250")
      const pageTwo =
        await this.fetch<CongressGovBillCosponsorsResponseData>(
          billCosponsorsUrl,
        )

      pageOne.cosponsors.push(...pageTwo.cosponsors)
    }

    return pageOne
  }

  async getHrBillSponsors(congress: number, billNumber: number) {
    const billUrl = new URL(`bill/${congress}/hr/${billNumber}`, this.baseUrl)

    const [bill, billCosponsors] = await Promise.all([
      this.fetch<CongressGoveBillResponseData>(billUrl),
      this.getHrBillCosponsors(congress, billNumber),
    ])

    return {
      sponsors: bill.bill.sponsors,
      cosponsors: billCosponsors.cosponsors,
    }
  }

  async getSenateBillSponsors(congress: number, billNumber: number) {
    const billUrl = new URL(`bill/${congress}/s/${billNumber}`, this.baseUrl)

    const billCosponsorsUrl = new URL(
      `bill/${congress}/s/${billNumber}/cosponsors`,
      this.baseUrl,
    )
    billCosponsorsUrl.searchParams.append("limit", "100")

    const [bill, billCosponsors] = await Promise.all([
      this.fetch<CongressGoveBillResponseData>(billUrl),
      this.fetch<CongressGovBillCosponsorsResponseData>(billCosponsorsUrl),
    ])

    return {
      sponsors: bill.bill.sponsors,
      cosponsors: billCosponsors.cosponsors,
    }
  }
}
