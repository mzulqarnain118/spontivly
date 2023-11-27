import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import more from "assets/icons/more.svg";
import UserProfileSidePanel from "../../components/common/UserProfileSidePanel";
import dashboardStyles from "styles/components/dashboardStyles";
import common from "components/common";
import { ApiCall } from "utils";
import Spinner from "components/common/Spinner";
function FindMember() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [findMember, setFindMember] = useState({
    member: "",
    sortBy: null,
    favorites: [],
  });

  const classes = dashboardStyles();
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };
  const setFavorites = async (id, favorites) => {
    const index = favorites.indexOf(id);
    index !== -1 ? favorites.splice(index, 1) : favorites.push(id); // If 'id' exist then delete it and if not in 'favorites', add it
    const response = await ApiCall("profile/update/", null, "PATCH", {
      favorites: favorites,
    });
  };
  const fetchMembers = async () => {
    const response = await ApiCall("profile", setLoading);
    response && setMembers(response?.results);
  };
  useEffect(() => {
    fetchMembers();
  }, []);
  const sortByData = [
    { id: "mostRecent", title: "Most Recent" },
    { id: "recommendations", title: "Recommendations" },
  ];
  return members?.length == 0 ? (
    <Spinner isLoading={loading} />
  ) : (
    <>
      <Typography variant="h5" align="left">
        {members?.length} Members
      </Typography>
      <Card className={classes.card}>
        <Grid container spacing={1}>
          <Grid item xs={8} sx={{ pr: 1 }}>
            <common.Input
              name="member"
              placeholder="Search members"
              value={findMember.member}
              objOnChange={setFindMember}
              startIcon={true}
            />
          </Grid>

          <Grid item xs={4}>
            <common.Select
              name="sortBy"
              value={findMember.sortBy}
              label="Sort By"
              objOnChange={setFindMember}
              options={sortByData}
            />
          </Grid>
        </Grid>
        {members?.map((rec, index) => (
          <Box>
              <Grid container className={`row-between ${classes.content}`}>
                <Grid item xs={4}>
                  <Box className="row gap-025">
                    <Avatar src={rec.profile_pic} />
                    <Box className="col-start">
                      <Box className="row-start gap-05">
                        <Typography className={classes.name}>
                          {rec.user.first_name + rec.user.last_name}
                        </Typography>
                        {rec.favorites?.includes(rec.id) ? (
                          <common.MuiIcon
                            name="StarRateRounded"
                            color="warning.main"
                            onClick={() => setFavorites(rec.id, rec.favorites)}
                          />
                        ) : (
                          <common.MuiIcon
                            name="StarBorderRounded"
                            color="primary.lighter"
                            onClick={() => setFavorites(rec.id, rec.favorites)}
                          />
                        )}
                      </Box>
                      <Typography variant="subtitle2">
                        {rec.company_name}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Typography className={classes.role}>
                    {rec.user.groups ? "Moderator" : "Member"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.role}>
                    {rec.position}
                  </Typography>
                </Grid>
                <Grid item xs={2} className="row-around">
                  <common.MuiIcon
                    name="FiberManualRecord"
                    fontSize="10px"
                    IconColor={rec?.match ? "success" : "error"}
                  />
                  {rec?.match ? rec?.match : "No"} Matches
                </Grid>

                <Grid item xs={1} onClick={() => handleUserClick(rec)}>
                  <img src={more} />
                </Grid>
              </Grid>
            <Box className="flex">
              {rec.interests.map((item) => (
                <Typography className={classes.tag}>{item.title}</Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Card>
      {selectedUser && (
        <UserProfileSidePanel
          user={selectedUser}
          isOpen={true}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
}

export default FindMember;
