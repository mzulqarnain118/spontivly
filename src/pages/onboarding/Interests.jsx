import { Container, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Button, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    addSelectedChip,
    removeSelectedChip,
    fetchInterests,
    setSearchText
} from '../../redux/interestsSlice';
import { useTheme } from '@mui/material/styles';
import skillsStyles from '../../styles/components/skillsStyles';

function Interests() {
    const dispatch = useDispatch();
    const classes = skillsStyles();

    const { selectedChips, nextPage, searchText, filterChipData } = useSelector((state) => state.interests);
    const theme = useTheme();

    const handleClearClick = useCallback(() => {
        dispatch(setSearchText(''))
    });
    const handleTextChange = useCallback((e) => {
        const query = e.target.value;
        dispatch(setSearchText(query))
    });

    const handleAddToSelectedChips = useCallback((chipToAdd) => () => {
        if (!selectedChips.find((chip) => chip.id === chipToAdd.id)) {
            dispatch(addSelectedChip(chipToAdd));
        }
    }, [selectedChips]);

    const handleRemoveFromSelectedChips = useCallback((chipToRemove) => () => {
        dispatch(removeSelectedChip(chipToRemove));
    });

    useEffect(() => {
        dispatch(fetchInterests());

    }, []);



    const handleLoadMore = () => {
        const urlObj = new URL(nextPage);
        const page = urlObj.searchParams.get('page');
        dispatch(fetchInterests(page));

    };
    return (
        <>
            <Typography className={classes.heading}>What are your interests?</Typography>

            <span className={classes.title}
            >
                Select all that apply
            </span>
            <Container className={classes.mainContainer}>
                <TextField
                    variant="outlined"
                    placeholder="Search Interests"
                    value={searchText}
                    onChange={handleTextChange}
                    InputProps={{
                        startAdornment: (
                            <IconButton disabled>
                                <SearchIcon />
                            </IconButton>
                        ),
                        endAdornment: searchText && (
                            <IconButton onClick={handleClearClick}>
                                <ClearIcon />
                            </IconButton>
                        ),
                    }}
                    className={classes.searchInput}
                    sx={{
                        [theme.breakpoints.up('md')]: {
                            width: '30vw', // Adjust width for screens wider than 'md' breakpoint
                        },
                    }}
                />
                <Container className={classes.chipContainer}
                >
                    {selectedChips.map((data, index) => (
                        <>
                            <Chip
                                key={data.id}
                                label={data.title}
                                size="medium"
                                onDelete={handleRemoveFromSelectedChips(data)}
                                deleteIcon={<ClearIcon />}
                                className={classes.selectedChip}
                            />
                            {(index + 1) % 4 === 0 && <div style={{ flexBasis: "100%" }} />}
                        </>
                    ))}
                </Container>
                <Container className={classes.selectedchipContainer}
                >
                    {filterChipData.map((data, index) => (
                        <>
                            <Chip
                                key={data.id}
                                label={data.title}
                                onClick={handleAddToSelectedChips(data)}
                                className={classes.chip}
                            />
                            {(index + 1) % 4 === 0 && <div style={{ flexBasis: "100%" }} />}
                        </>
                    ))}

                </Container>
                {nextPage && (
                    <Button
                        variant="outlined"
                        onClick={handleLoadMore}
                        className={classes.loadMoreButton}
                    >
                        Load More
                    </Button>
                )}
            </Container>
        </>
    )
}

export default React.memo(Interests)
