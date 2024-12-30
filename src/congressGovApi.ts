export interface CongressGovMemberResponseData {
  member: {
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
      chamber: string
      startYear: number
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
    public baseUrl: string,
  ) {}

  private async fetch<Results>(url: URL) {
    url.searchParams.append("api_key", this.apiKey)

    const response = await fetch(url)

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
      `member/congress/118/${state.toUpperCase()}`,
      this.baseUrl,
    )
    membersUrl.searchParams.append("currentMember", "true")

    const membersData =
      await this.fetch<CongressGovMembersResponseData>(membersUrl)

    return {
      members: membersData.members.filter(
        (member) =>
          // Senators have no district, so include members with null districts
          // as well
          member.district === district || member.district === null,
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

  async getHrBillSponsors(congress: number, billNumber: number) {
    const billUrl = new URL(`bill/${congress}/hr/${billNumber}`, this.baseUrl)

    const billCosponsorsUrl = new URL(
      `bill/${congress}/hr/${billNumber}/cosponsors`,
      this.baseUrl,
    )

    const [bill, billCosponsors] = await Promise.all([
      this.fetch<CongressGoveBillResponseData>(billUrl),
      this.fetch<CongressGovBillCosponsorsResponseData>(billCosponsorsUrl),
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
