import React, { useEffect, useLayoutEffect, useRef } from "react"
import Radar from "radar-sdk-js"
import "radar-sdk-js/dist/radar.css"
import AutocompleteUI from "radar-sdk-js/dist/ui/autocomplete"

interface Props {
  disabled: boolean
  onChange: (address: string) => void
}

export function AddressAutocomplete({ disabled, onChange }: Props) {
  const initialDisabled = useRef(disabled)
  const autocompleteRef = useRef<AutocompleteUI>(null)

  useLayoutEffect(() => {
    autocompleteRef.current?.setDisabled(disabled)
  }, [disabled])

  useEffect(() => {
    Radar.initialize(process.env.NEXT_PUBLIC_RADAR_API_KEY!)
    autocompleteRef.current = Radar.ui.autocomplete({
      container: "autocomplete",
      width: "600px",
      countryCode: "US",
      disabled: initialDisabled.current,
      onSelection: (address) => onChange(address.formattedAddress),
    })
    return () => {
      autocompleteRef.current?.remove()
    }
  }, [onChange])

  return <div id="autocomplete" />
}
