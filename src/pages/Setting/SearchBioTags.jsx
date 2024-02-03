import { useQuery } from '@tanstack/react-query'
import React, { memo, useState } from 'react'
import { Controls as common } from '../../components/common'
import { ApiCall, encodeParams } from '../../utils'

function SearchBioTagsComponent({ queryKey, name, label, errors, control, multiple, validation }) {
  const [searchTagText, setSearchTagText] = useState('')

  async function fetchTags() {
    const queryParams = {
      page: 1,
      name: searchTagText
    }
    const encodedTagParams = encodeParams(queryParams)
    const apiUrl = `${queryKey}?${encodedTagParams}`
    const fetchedTags = await ApiCall(apiUrl)

    return fetchedTags?.results
  }

  const { data: tags } = useQuery({
    queryKey: [queryKey, searchTagText], // Dynamic query key
    queryFn: () => fetchTags()
  })

  return (
    <common.ControlledInput
      name={name ?? queryKey}
      control={control}
      errors={errors}
      validation={validation}
      component={
        <common.Autocomplete
          label={label}
          options={tags ?? []}
          inputValue={searchTagText}
          setInputValue={setSearchTagText}
          multiple={multiple}
          addNewOption={false}
        />
      }
    />
  )
}

export const SearchBioTags = memo(SearchBioTagsComponent)
