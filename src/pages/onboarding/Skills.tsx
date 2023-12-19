import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Controls as common } from '../../components/common'
import { addSelectedChip, removeSelectedChip, setSearchText, setChipData } from '../../redux/skillsSlice'
import { SearchTags } from './SearchTags'

function Skills() {
  const { selectedChips, searchText, filterChipData } = useSelector((state: any) => state.skills)

  return (
    <>
      <common.FormHeading heading="What are your skills?" title="Select all that apply" />

      <SearchTags
        selectedChips={selectedChips}
        filterChipData={filterChipData}
        addSelectedChip={addSelectedChip}
        removeSelectedChip={removeSelectedChip}
        queryKey="skills"
        placeholder="Search Skills"
        searchText={searchText}
        setSearchText={setSearchText}
        setChipData={setChipData}
      />
    </>
  )
}

export const Skills = memo(Skills)
