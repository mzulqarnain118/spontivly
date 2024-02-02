import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Controls as common } from '../../components/common'
import { Toast } from '../../components/common/Toast/Toast'
import { ApiCall, reduceArrayByKeys } from '../../utils'
import { SearchBioTags } from './SearchBioTags'

function Bio({ refetchUser }) {
  const User = useSelector((state) => state?.dashboard?.currentUser ?? [])
  const [defaultValues, setDefaultValues] = useState()

  useEffect(() => {
    if (User) {
      setDefaultValues({
        company_name: User?.company_name ?? '',
        position: User?.position ?? '',
        location: { id: User?.location?.id ?? '', name: User?.location?.name ?? '' },
        skills: User?.skills ?? '',
        objectives: User?.objectives ?? '',
        interests: User?.interests ?? '',
        company_stage: User?.company_stage?.id ?? '',
        introduction: User?.introduction ?? ''
      })
    }
  }, [User])

  const updateBioSubmit = async (values) => {
    const combinedFormData = new FormData()
    const payload = {
      ...values,
      skills: reduceArrayByKeys(values?.skills, ['id']),
      objectives: reduceArrayByKeys(values?.objectives, ['id']),
      interests: reduceArrayByKeys(values?.interests, ['id']),
      location: values?.location?.id
    }

    combinedFormData.append('data', JSON.stringify(payload))
    const profileUpdated = await ApiCall(`profile/${User?.user?.id}/`, null, 'PATCH', combinedFormData)

    if (profileUpdated) {
      Toast(`Profile Updated Successfully`)
      refetchUser()
    }
  }
  const fetchCompanyStages = async () => {
    return ApiCall('company-stages')
  }

  const { data: companyStages } = useQuery({ queryKey: ['company-stages'], queryFn: () => fetchCompanyStages() })

  return (
    <>
      {defaultValues && (
        <common.Form onSubmit={updateBioSubmit} defaultValues={defaultValues} disableReset={true}>
          {({ errors, control }) => (
            <>
              <common.ControlledInput name="position" label="Job Title" control={control} errors={errors} />
              <SearchBioTags
                label="Search Location"
                name="location"
                queryKey="locations"
                control={control}
                errors={errors}
                multiple={false}
              />
              <common.ControlledInput name="company_name" label="Company Name" control={control} errors={errors} />
              <SearchBioTags label="Skillset" queryKey="skills" control={control} errors={errors} />
              <SearchBioTags label="Objectives" queryKey="objectives" control={control} errors={errors} />
              <SearchBioTags label="Interests" queryKey="interests" control={control} errors={errors} />
              <common.ControlledInput
                name="company_stage"
                control={control}
                errors={errors}
                component={<common.Select label="Select company stage" options={companyStages?.results ?? []} />}
              />
              <common.ControlledInput
                name="introduction"
                label="Summary"
                control={control}
                rows={5}
                multiline={true}
                errors={errors}
                validation={{ required: false }}
              />
            </>
          )}
        </common.Form>
      )}
    </>
  )
}

export { Bio }
