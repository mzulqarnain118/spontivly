import { useSelector,useDispatch } from 'react-redux';
import {
  addSelectedChip,
  removeSelectedChip,
  setSearchText,
  setChipData,
} from '../../redux/skillsSlice';
import common from '../../components/common';
import FetchTags from './FetchTags';

function Skills() {
  const { selectedChips, searchText, filterChipData } = useSelector(
    (state: any) => state.skills
  );
  return (
    <>
      <common.FormHeading
        heading="What are your skills?"
        title="Select all that apply"
      />

      <FetchTags
        selectedChips={selectedChips}
        filterChipData={filterChipData}
        addSelectedChip={addSelectedChip}
        removeSelectedChip={removeSelectedChip}
        queryKey="skills"
        searchText={searchText}
        setSearchText={setSearchText}
        setChipData={setChipData}
      />
    </>
  );
}

export default Skills;
