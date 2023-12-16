import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import common from "components/common";
import { ApiCall, reduceArrayByKeys } from "utils";
import  { useState } from "react";
import dashboardStyles from "styles/components/dashboardStyles";
import { useForm } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";
import { useInfiniteQuery } from "react-query";
import qs from 'qs';

const CreateContent = ({ isOpen, onClose, contentTypes }) => {
  const theme = useTheme();
  const classes = dashboardStyles();
  const { register, handleSubmit } = useForm();
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [searchTagText, setSearchTagText] = useState("");

  async function fetchTags({ pageParam = 1 }, name) {
    const queryParams = {
      page: pageParam,
      name,
    };
    const encodedParams = qs.stringify(queryParams, { arrayFormat: "comma" });
    const apiUrl = `tags?${encodedParams}`;
    return await ApiCall(apiUrl);
  }
  const {
    data: tags,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["libraryTags", searchTagText], // Dynamic query key
    ({ pageParam = 1 }) => fetchTags({ pageParam }, searchTagText),
    {
      getNextPageParam: (lastPage) => lastPage?.next,
    }
  );

  const addTag = async (tag) => {
    const addedTag = await ApiCall("tags/", null, "POST", {
      name: tag,
      title: tag,
    });
    if (addedTag) {
      refetch({
        pageParam: 1,
        searchText,
      });
    }
  };
  const onSubmit = async (formData) => {
    const tags = reduceArrayByKeys(selectedTags, ["id"]);
    let payload = { ...formData, type, description, tags };
    if (pdfFile) {
      const combinedFormData = new FormData();
      combinedFormData.append("file", pdfFile);
      combinedFormData.append("data", JSON.stringify(payload));
      await ApiCall("libraries/", null, "POST", combinedFormData);
      onClose();
      return;
    }
    await ApiCall("libraries/", null, "POST", {
      data: JSON.stringify(payload),
    });
    onClose();
  };

  const handleTagChange = (value) => {
    setSelectedTags(value);
  };
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xl">
      <form key="2000" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          <Box className="row-between">
            <Typography variant="h2" align="left">
              Create Content
            </Typography>
            <IconButton onClick={onClose}>
              <ClearIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            align="left"
            sx={{ color: "customColors.subtitle1" }}
          >
            Fill out a few details to get started!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Card className={classes.contentCard}>
            <Grid container spacing={8}>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" align="left">
                  Heading
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ color: "customColors.subtitle1" }}
                >
                  What's your post all about?
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} className={classes.createContentItem}>
                <common.Input
                  register={register("title", { required: true })}
                  placeholder="Title"
                />
                <Box className="row-between gap-1">
                  <common.Input
                    register={register("author", { required: true })}
                    placeholder="Author"
                  />
                  <common.Select
                    defaultValue="Select content type"
                    options={contentTypes}
                    valueUpdater={setType}
                    value={type}
                    required
                  />
                </Box>
                <common.Autocomplete
                  placeholder="Tags"
                  variant="outlined"
                  value={selectedTags} 
                  onChange={handleTagChange} 
                  options={tags?.pages?.flatMap((page) => page?.results) ?? []}
                  addNewTag={addTag}
                  inputValue={searchTagText}
                  setInputValue={setSearchTagText}
                  required
                />
              </Grid>
            </Grid>
            <Divider className={classes.createContentDivider} />
            <Grid container spacing={8}>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" align="left">
                  Content
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ color: "customColors.subtitle1" }}
                >
                  Provide some more details about your post
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} className={classes.createContentItem}>
                {type != "pdf" && (
                  <common.Input
                    register={register("url", { required: type !== "pdf" })}
                    placeholder="Content URL"
                    disabled={type === "pdf"}
                  />
                )}
                <common.Input
                  register={register("summary", { required: true })}
                  placeholder="Summary"
                />
                <common.RichText
                  value={description}
                  onBlur={setDescription}
                  cssClass={classes.editor}
                  required
                />
                {type == "pdf" && (
                  <common.DragDropFile
                    onChange={setPdfFile}
                    type="files"
                    required={type === "pdf"}
                  />
                )}
              </Grid>
            </Grid>
          </Card>
        </DialogContent>
        <DialogActions className={classes.addContentDialogAction}>
          <common.MuiButton variant="contained" type="submit" label={"Save"} />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateContent;
