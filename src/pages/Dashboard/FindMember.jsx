import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import star from "assets/icons/star.svg";
import more from "assets/icons/more.svg";
import UserProfileSidePanel from "../../components/common/UserProfileSidePanel";
import dashboardStyles from "styles/components/dashboardStyles";
import common from "components/common";
import { FiberManualRecord } from "@mui/icons-material";
import { ApiCall } from "utils";
import Spinner from "components/common/Spinner";

function FindMember() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [findMember, setFindMember] = useState({
    member: "",
    sortBy: null,
  });
  const classes = dashboardStyles();
  const handleUserClick = (user) => {
    setSelectedUser(user);
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
  return members.length == 0 ? (
    <Spinner isLoading={loading} />
  ) : (
    <>
      <Typography variant="h5" align="left">
        {members.length} Members
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
          <Box onClick={() => handleUserClick(rec)}>
            <CardContent className={classes.content}>
              <Avatar src={rec.profile_pic} />
              <Grid container className="row-between">
                <Grid item>
                  <Box
                    sx={{
                      marginLeft: 1,
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Typography className={classes.name}>
                        {rec.user.first_name + rec.user.last_name}
                      </Typography>
                      <common.Img src={star} />
                    </Box>

                    <Typography variant="subtitle2">
                      {rec.company_name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography className={classes.role}>
                    {rec.user.groups ? "Moderator" : "Member"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.role}>
                    {rec.position}
                  </Typography>
                </Grid>
                <Grid item className="row-around">
                  <FiberManualRecord
                    fontSize="small"
                    sx={{ fontSize: "10px" }}
                    color={rec?.match ? "success" : "error"}
                  />
                  {rec?.match ? rec?.match : "No"} Matches
                </Grid>

                <Grid item>
                  <img src={more} />
                </Grid>
              </Grid>
            </CardContent>
            <Box sx={{ display: "flex" }}>
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
