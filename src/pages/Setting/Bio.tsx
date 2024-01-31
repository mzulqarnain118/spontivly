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
        <common.Form
          onSubmit={updateBioSubmit}
          type="actions"
          leftBtnLabel="View Profile"
          leftBtnHandler={() => console.log(1)}
          defaultValues={defaultValues}
          disableReset={true}
        >
          {({ errors, control }) => (
            <>
              <common.ControlledInput name="position" placeholder="Job Title" control={control} errors={errors} />
              <SearchBioTags
                placeholder="Search Location"
                name="location"
                queryKey="locations"
                control={control}
                errors={errors}
                multiple={false}
              />
              <common.ControlledInput name="company_name" placeholder="Company Name" control={control} errors={errors} />
              <SearchBioTags placeholder="Skillset" queryKey="skills" control={control} errors={errors} />
              <SearchBioTags placeholder="Objectives" queryKey="objectives" control={control} errors={errors} />
              <SearchBioTags placeholder="Interests" queryKey="interests" control={control} errors={errors} />
              <common.ControlledInput
                name="company_stage"
                control={control}
                errors={errors}
                component={<common.Select defaultValue="Select company stage" options={companyStages?.results ?? []} />}
              />
              <common.ControlledInput
                name="introduction"
                placeholder="Summary"
                control={control}
                rows={5}
                multiline={true}
                errors={errors}
              />
            </>
          )}
        </common.Form>
      )}
    </>
  )
}

export { Bio }
