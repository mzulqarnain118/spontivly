import { useQuery } from '@tanstack/react-query'
import React, { memo, useState } from 'react'
import { Controls as common } from '../../components/common'
import { ApiCall, encodeParams } from '../../utils'

function SearchBioTagsComponent({ queryKey, name, placeholder, errors, control, multiple }) {
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
      component={
        <common.Autocomplete
          placeholder={placeholder}
          options={tags ?? []}
          inputValue={searchTagText}
          setInputValue={setSearchTagText}
          multiple={multiple}
        />
      }
    />
  )
}

export const SearchBioTags = memo(SearchBioTagsComponent)
