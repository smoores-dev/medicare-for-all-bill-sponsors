"use client"

import { Form } from "@/payload-types"
import {
  Button,
  Checkbox,
  Group,
  MultiSelect,
  Notification,
  Portal,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconX, IconCheck } from "@tabler/icons-react"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { useMemo, useState } from "react"

const states = [
  { label: "Alabama", value: "AL" },
  { label: "Kentucky", value: "KY" },
  { label: "Ohio", value: "OH" },
  { label: "Alaska", value: "AK" },
  { label: "Louisiana", value: "LA" },
  { label: "Oklahoma", value: "OK" },
  { label: "Arizona", value: "AZ" },
  { label: "Maine", value: "ME" },
  { label: "Oregon", value: "OR" },
  { label: "Arkansas", value: "AR" },
  { label: "Maryland", value: "MD" },
  { label: "Pennsylvania", value: "PA" },
  { label: "American Samoa", value: "AS" },
  { label: "Massachusetts", value: "MA" },
  { label: "Puerto Rico", value: "PR" },
  { label: "California", value: "CA" },
  { label: "Michigan", value: "MI" },
  { label: "Rhode Island", value: "RI" },
  { label: "Colorado", value: "CO" },
  { label: "Minnesota", value: "MN" },
  { label: "South Carolina", value: "SC" },
  { label: "Connecticut", value: "CT" },
  { label: "Mississippi", value: "MS" },
  { label: "South Dakota", value: "SD" },
  { label: "Delaware", value: "DE" },
  { label: "Missouri", value: "MO" },
  { label: "Tennessee", value: "TN" },
  { label: "District of Columbia", value: "DC" },
  { label: "Montana", value: "MT" },
  { label: "Texas", value: "TX" },
  { label: "Florida", value: "FL" },
  { label: "Nebraska", value: "NE" },
  { label: "Trust Territories", value: "TT" },
  { label: "Georgia", value: "GA" },
  { label: "Nevada", value: "NV" },
  { label: "Utah", value: "UT" },
  { label: "Guam", value: "GU" },
  { label: "New Hampshire", value: "NH" },
  { label: "Vermont", value: "VT" },
  { label: "Hawaii", value: "HI" },
  { label: "New Jersey", value: "NJ" },
  { label: "Virginia", value: "VA" },
  { label: "Idaho", value: "ID" },
  { label: "New Mexico", value: "NM" },
  { label: "Virgin Islands", value: "VI" },
  { label: "Illinois", value: "IL" },
  { label: "New York", value: "NY" },
  { label: "Washington", value: "WA" },
  { label: "Indiana", value: "IN" },
  { label: "North Carolina", value: "NC" },
  { label: "West Virginia", value: "WV" },
  { label: "Iowa", value: "IA" },
  { label: "North Dakota", value: "ND" },
  { label: "Wisconsin", value: "WI" },
  { label: "Kansas", value: "KS" },
  { label: "Northern Mariana Islands", value: "MP" },
  { label: "Wyoming", value: "WY" },
]

interface Props {
  form: Form
}

export function GetInvolvedForm({ form: formConfig }: Props) {
  const initialValues = useMemo(
    () =>
      Object.fromEntries(
        formConfig.fields
          ?.filter((field) => "name" in field)
          .map((field) => {
            const name = field.name
            const defaultValue =
              (("defaultValue" in field && field.defaultValue) ??
              field.blockType === "select")
                ? ([] as string[])
                : ""
            return [name, defaultValue] as const
          }) ?? [],
      ),
    [formConfig.fields],
  )

  const form = useForm({
    mode: "controlled",
    initialValues,
  })

  const [isPending, setIsPending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFailure, setShowFailure] = useState(false)

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        console.log(
          Object.entries(values).map(([field, value]) => ({
            field,
            value,
          })),
        )
        setShowFailure(false)
        setShowSuccess(false)
        setIsPending(true)
        const response = await fetch(`/api/form-submissions`, {
          body: JSON.stringify({
            form: formConfig.id,
            submissionData: Object.entries(values).map(([field, value]) => ({
              field,
              value,
            })),
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })

        setIsPending(false)

        const result = await response.json()
        console.log(result)

        if (!response.ok) {
          setShowFailure(true)
          return
        }

        setShowSuccess(true)
        form.reset()
      })}
    >
      {formConfig.fields?.map((field) => {
        switch (field.blockType) {
          case "checkbox": {
            return (
              <Checkbox
                key={field.name}
                label={field.label}
                {...form.getInputProps(field.name)}
                required={!!field.required}
              />
            )
          }
          case "text": {
            return (
              <TextInput
                key={field.name}
                label={field.label}
                {...form.getInputProps(field.name)}
                required={!!field.required}
              />
            )
          }
          case "textarea": {
            return (
              <Textarea
                key={field.name}
                label={field.label}
                {...form.getInputProps(field.name)}
                required={!!field.required}
              />
            )
          }
          case "email": {
            return (
              <TextInput
                type="email"
                key={field.name}
                label={field.label}
                {...form.getInputProps(field.name)}
                required={!!field.required}
              />
            )
          }
          case "select": {
            return (
              <MultiSelect
                key={field.name}
                label={field.label}
                {...form.getInputProps(field.name)}
                required={!!field.required}
                data={field.options ?? []}
              />
            )
          }
          case "state": {
            return (
              <Select
                searchable
                key={field.name}
                label={field.label}
                {...form.getInputProps(field.name)}
                required={!!field.required}
                data={states}
              />
            )
          }
        }
        return null
      })}
      <Group justify="flex-end">
        <Button type="submit" loading={isPending} mt="lg">
          {formConfig.submitButtonLabel}
        </Button>
      </Group>
      <Portal>
        {showSuccess && (
          <Notification
            className="fixed bottom-8 right-8 w-[400px] max-w-[calc(100%-2rem)]"
            icon={<IconCheck />}
            color="teal"
            title="Received!"
            onClose={() => setShowSuccess(false)}
          >
            <RichText data={formConfig.confirmationMessage!} />
          </Notification>
        )}
        {showFailure && (
          <Notification
            className="fixed bottom-8 right-8 w-[400px] max-w-[calc(100%-2rem)]"
            icon={<IconX />}
            color="red"
            title="Uh oh!"
            onClose={() => setShowFailure(false)}
          >
            For some reason, that didn&apos;t work! Give it a minute and try
            again, we&apos;d love to hear from you!
          </Notification>
        )}
      </Portal>
    </form>
  )
}
