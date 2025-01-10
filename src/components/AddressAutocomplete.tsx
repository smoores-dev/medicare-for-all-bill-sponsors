"use client"

import { useCallback, useState } from "react"
import "radar-sdk-js/dist/radar.css"
import { useRouter } from "next/navigation"
import type { RadarAddress } from "@/radarApi"
import { rem, Select, SelectProps } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import throttle from "throttleit"

export function AddressAutocomplete() {
  const router = useRouter()

  const [addresses, setAddresses] = useState<RadarAddress[]>([])
  const [data, setData] = useState<string[]>([])

  // react-hooks can't statically analyze this function because
  // it's the result of calling throttle, but it doesn't have
  // any dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchChange = useCallback(
    throttle(async (newValue: string) => {
      const searchParams = new URLSearchParams()
      searchParams.append("query", newValue)
      const response = await fetch(`/autocomplete?${searchParams.toString()}`)
      if (!response.ok) {
        return
      }
      const addresses = (await response.json()) as RadarAddress[]
      console.log(
        newValue,
        addresses,
        addresses.map((address) => address.formattedAddress!),
      )
      setAddresses(addresses)
      setData(addresses.map((address) => address.formattedAddress!))
    }, 500),
    [],
  )

  const handleChange = useCallback(
    (value: string | null) => {
      const address = addresses.find(
        (address) => address.formattedAddress === value,
      )
      if (!address) return
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
    [addresses, router],
  )

  console.log("data", data)

  const renderOption = useCallback<Required<SelectProps>["renderOption"]>(
    ({ option }) => {
      console.log("option", option)
      const address = addresses.find(
        (address) => address.formattedAddress === option.value,
      )
      if (!address) return null
      return (
        <span className="overflow-x-hidden whitespace-nowrap">
          <strong>
            {address.number} {address.unit} {address.street}
          </strong>{" "}
          {address.city}, {address.state} {address.postalCode}
        </span>
      )
    },
    [addresses],
  )

  return (
    <Select
      placeholder="Search street address"
      leftSection={<IconSearch width={rem(20)} height={rem(20)} />}
      rightSection={<></>}
      className="w-full"
      searchable
      onSearchChange={handleSearchChange}
      data={data}
      size="md"
      filter={({ options }) => options}
      renderOption={renderOption}
      onChange={handleChange}
    />
  )
}
