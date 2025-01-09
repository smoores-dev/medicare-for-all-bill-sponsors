import { Radar } from "@/radarApi"
import { NextRequest, NextResponse } from "next/server"

const RADAR_BASE_URL = process.env.RADAR_BASE_URL
const RADAR_API_KEY = process.env.RADAR_API_KEY

export async function GET(request: NextRequest) {
  if (RADAR_BASE_URL === undefined) {
    throw new Error(`Missing environment variable RADAR_BASE_URL`)
  }
  if (RADAR_API_KEY === undefined) {
    throw new Error(`Missing environment variable RADAR_API_KEY`)
  }

  const query = request.nextUrl.searchParams.get("query")

  if (!query) {
    return NextResponse.json([])
  }

  const radarClient = new Radar(RADAR_API_KEY, RADAR_BASE_URL)

  const addresses = await radarClient.autocomplete(query)

  return NextResponse.json(addresses)
}
