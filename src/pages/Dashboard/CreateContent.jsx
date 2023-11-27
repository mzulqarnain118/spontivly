import { Box, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import common from "components/common";


import React, { useState } from 'react'
import dashboardStyles from 'styles/components/dashboardStyles';

const CreateContent = ({isOpen,onClose}) => {
    const theme = useTheme();
   
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [contentURL, setContentURL] = useState('');
    const [summary, setSummary] = useState('');
    const [select, setSelect] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const classes = dashboardStyles();

    const tags = [

        {
            id: 1,
            title: "Islamic"
        },
        {
            id: 2,
            title: "Technology"
        },
        {
            id: 3,
            title: "Industry"
        },
        {
            id: 4,
            title: "Healthcare"
        },
        {
            id: 5,
            title: "Entertainment"
        }
    ];
    const types = [
        {
            id: "youtube_video",
            title: "Youtube Video"
        },
        {
            id: "doc",
            title: "Doc"
        }
    ]

    const handleTagChange = (value) => {
        setSelectedTags(value);
    };
    return (

        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth="xl"

        >
            <DialogTitle>
                <Typography variant="h2" align="left">
                    Create Content
                </Typography>
                <Typography variant="h6" align="left" sx={{ color: 'customColors.subtitle1' }}>
                    Fill out a few details to get started!
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Card className={classes.contentCard}>
                    <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <Typography variant="h5" align="left">
                                Heading
                            </Typography>
                            <Typography variant="h6" align="left" sx={{ color: 'customColors.subtitle1' }}>
                                What's your post all about?
                            </Typography>
                        </Grid>
                        <Grid item xs={8} display="flex" flexDirection="column" gap={theme.spacing(10)}>
                            <common.Input name="title" value={title} onChange={setTitle} placeholder="Title" />
                            <Box display="flex" gap={theme.spacing(10)}>
                                <common.Input name="author" value={author} onChange={setAuthor} placeholder="Author" />
                                <common.Select
                                    name="type"
                                    defaultValue="Select content type"
                                    options={types}
                                    value={select}
                                    onChange={setSelect}
                                />

                            </Box>
                            <common.Autocomplete placeholder="Tags"
                                variant="outlined"
                                value={selectedTags} // Pass your array of selected values here
                                onChange={handleTagChange}// Pass your state setter function here
                                options={tags}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ color: 'customColors.subtitle2', marginTop: theme.spacing(20), marginBottom: theme.spacing(20) }} />
                    <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <Typography variant="h5" align="left">
                                Content
                            </Typography>
                            <Typography variant="h6" align="left" sx={{ color: 'customColors.subtitle1' }}>
                                Provide some more details about your post
                            </Typography>
                        </Grid>
                        <Grid item xs={8} display="flex" flexDirection="column" gap={theme.spacing(10)}>
                            <common.Input name="url" value={contentURL} onChange={setContentURL} placeholder="Content URL" />
                            <common.Input name="summary" value={summary} onChange={setSummary} placeholder="Summary" />
                            <common.RichText value={description} onBlur={setDescription} />

                        </Grid>
                    </Grid>
                </Card>
            </DialogContent>
            <DialogActions>
                <common.MuiButton label={"Cancel"} onClick={onClose} />
                <common.MuiButton variant="contained" label={"Save"} />
            </DialogActions>
        </Dialog>
    )
}

export default CreateContent
