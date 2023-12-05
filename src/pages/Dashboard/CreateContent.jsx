import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import common from "components/common";
import { ApiCall, reduceArrayByKeys } from "utils";
import React, { useState, useEffect } from "react";
import dashboardStyles from "styles/components/dashboardStyles";
import { useForm } from "react-hook-form";

const CreateContent = ({ isOpen, onClose,contentTypes,tags,fetchTags }) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
     isSubmitting, isValid
  } = useForm();
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const classes = dashboardStyles();

  const addTag = async (tag) => {
    const addedTag = await ApiCall("tags/", null, "POST", {
      name: tag,
      title: tag,
    });
    addedTag && fetchTags();
  };

  const onSubmit = async (formData) => {
    const tags = reduceArrayByKeys(selectedTags, ["id"]);
    let payload = { ...formData, type, description, tags };
    if (pdfFile) {
      const combinedFormData = new FormData();
      combinedFormData.append("file", pdfFile);
      combinedFormData.append("data", JSON.stringify(payload));
      await ApiCall("libraries/", null, "POST", combinedFormData);
      return;
    }
    await ApiCall("libraries/", null, "POST", {
      data: JSON.stringify(payload),
    });
  };

  const handleTagChange = (value) => {
    setSelectedTags(value);
  };
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xl">
      <form key="2000" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          <Typography variant="h2" align="left">
            Create Content
          </Typography>
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
                <Box display="flex" gap={theme.spacing(10)}>
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
                  value={selectedTags} // Pass your array of selected values here
                  onChange={handleTagChange} // Pass your state setter function here
                  options={tags}
                  addNewTag={addTag}
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
                <common.Input
                  register={register("url", { required: type !== "pdf" })}
                  placeholder="Content URL"
                  disabled={type === "pdf"}
                />
                <common.Input
                  register={register("summary", { required: true })}
                  placeholder="Summary"
                />
                <common.RichText
                  value={description}
                  onBlur={setDescription}
                  required
                />
                {type == "pdf" && (
                  <common.DragDropFile onChange={setPdfFile} type={type} required={type === "pdf"} />
                )}
              </Grid>
            </Grid>
          </Card>
        </DialogContent>
        <DialogActions>
          <common.MuiButton label={"Cancel"} onClick={onClose} />
          <common.MuiButton variant="contained" type="submit" label={"Save"} />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateContent;
