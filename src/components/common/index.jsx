import RadioGroup from "./RadiaGroup";
import Select from "./Select";
// import DatePicker from "./DatePicker";
import Checkbox from './Checkbox';
import Input from './Input'
import RichText from './RichText'
// import DateTimePicker from "./DateTimePicker";
import Autocomplete from "./Autocomplete";
import FormHeading from "./FormHeading";
import SearchTags from "./SearchTags";
import ContainerToast from "./Toast/ContainerToast"
import Spinner from "./Spinner";
import MuiButton from "./MuiButton";
import Img from "./Img";
import CustomSwitch from "./CustomSwitch";
import FilterContentTypeCard from "./FilterContentTypeCard";
import Link from "./Link";
import MuiIcon from "./MuiIcon";
import MenuList from "./MenuList";
import Popup from "./Popup";
import SidePanel from "./SidePanel";
import DragDropFile from "./DragDropFile";
import ReactFormHook from "./ReactFormHook";
import DataFetchingComponent from "./DataFetchingComponent";
const Controls = {
//   DateTimePicker,
  RadioGroup,
  Select,
  RichText,
  ReactFormHook,
//   DatePicker,
  Checkbox,
  Input,
  Popup,
  SidePanel,
  MenuList,
  MuiIcon,
  Img,
  DataFetchingComponent,
  MuiButton,
  CustomSwitch,
  ContainerToast,
  Link,
    Spinner,
  SearchTags,
  Autocomplete,
  FormHeading,
  FilterContentTypeCard,
  DragDropFile
};

export default Controls;


      //   : list.items.map((item) => (
            //       <dd onClick={() => handleClick(item.url)}>
            //         <ListItemButton>
            //           {item.icon && item.icon}
            //           <ListItemText primary={item.label} />
            //         </ListItemButton>
            //       </dd>
            //     ))}