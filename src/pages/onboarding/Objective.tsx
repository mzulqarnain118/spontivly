import { memo } from 'react'
import { useSelector } from 'react-redux'
import common from '../../components/common'
import { addSelectedChip, removeSelectedChip, setSearchText, setChipData } from '../../redux/objectiveSlice'
import SearchTags from './SearchTags'

function Objective() {
  const { selectedChips, searchText, filterChipData } = useSelector((state: any) => state.objective)

  return (
    <>
      <common.FormHeading heading="What’s your objective?" title="Select all that apply" />

      <SearchTags
        selectedChips={selectedChips}
        filterChipData={filterChipData}
        addSelectedChip={addSelectedChip}
        removeSelectedChip={removeSelectedChip}
        queryKey="objectives"
        placeholder="Search Objective"
        searchText={searchText}
        setSearchText={setSearchText}
        setChipData={setChipData}
      />
    </>
  )
}

export default memo(Objective)
