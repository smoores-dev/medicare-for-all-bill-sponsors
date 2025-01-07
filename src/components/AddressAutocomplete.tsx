"use client"

import React, { useEffect, useRef } from "react"
import Radar from "radar-sdk-js"
import "radar-sdk-js/dist/radar.css"
import AutocompleteUI from "radar-sdk-js/dist/ui/autocomplete"
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
      onSelection: (address) => {
        const hash = btoa(address.formattedAddress)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "")
        router.push(`/results/${hash}`)
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
