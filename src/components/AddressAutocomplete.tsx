"use client"

import React, { useEffect, useRef } from "react"
import Radar from "radar-sdk-js"
import "radar-sdk-js/dist/radar.css"
import AutocompleteUI from "radar-sdk-js/dist/ui/autocomplete"
import { RadarAddress } from "radar-sdk-js/dist/types"
import { useRouter } from "next/navigation"

export function AddressAutocomplete() {
  const autocompleteRef = useRef<AutocompleteUI>(null)

  const router = useRouter()

  useEffect(() => {
    Radar.initialize(process.env.NEXT_PUBLIC_RADAR_API_KEY!)

    autocompleteRef.current = Radar.ui.autocomplete({
      container: "autocomplete",
      width: "600px",
      countryCode: "US",
      placeholder: "Search street address",
      layers: ["address"],
      onSelection: (address: RadarAddress) => {
        const searchParams = new URLSearchParams()
        searchParams.append("number", address.number!)
        searchParams.append("street", address.street!)
        if ("unit" in address) {
          searchParams.append("unit", address.unit as string)
        }
        searchParams.append("city", address.city!)
        searchParams.append("state", address.state!)
        searchParams.append("zip", address.postalCode!)
        router.push(`/results?${searchParams.toString()}`)
      },
    })

    const wrapper = autocompleteRef.current.container
      .firstElementChild! as HTMLElement
    wrapper.style.maxWidth = "100%"

    return () => {
      autocompleteRef.current?.remove()
    }
  }, [router])

  return <div id="autocomplete" className="w-full" />
}
