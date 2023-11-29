import React, { useState } from "react";
import twitter from "assets/icons/twitter-square.svg";
import fb from "assets/icons/facebook.svg";
import linkedin from "assets/icons/linkedin.svg";
import dashboardStyles from "styles/components/dashboardStyles";
import {
  Box,
  CardContent,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import common from "components/common";

const UserProfileSidePanel = ({ user,openPanel,setPanel }) => {
    const [openPopup, setPopup] = useState(false);
  const classes = dashboardStyles();
  const data = ["About", "Profession", "Interests tags"];

  return (
    <>
      <common.SidePanel openPanel={openPanel} setPanel={setPanel}>
        <Box
          className="col-center"
          sx={{
            marginTop: "48px",
          }}
        >
          <Avatar
            src={user.profile_pic}
            sx={{ width: "3.33rem", height: "3.33rem" }}
          />
          <Typography>{user.user.first_name + user.user.last_name}</Typography>
          <Typography variant="lighterSubtitle2">{user.user.email}</Typography>
          <Box className="flex">
            <img src={twitter} />
            <img src={fb} />
            <img src={linkedin} />
          </Box>
          <common.MuiButton
            fullWidth
            size="sm"
            sx={{
              padding: "6px 20px",
              margin: "16px 0",
            }}
            onClick={() => setPopup(true)}
          >
            View Full Profile
          </common.MuiButton>
        </Box>
      </common.SidePanel>
      <common.Popup openPopup={openPopup} setPopup={setPopup}>
        {data.map((item, index) => (
          <CardContent className="col-start gap-075">
            <Typography variant="subtitle">{item}</Typography>
            {index == 0 ? (
              <Typography variant="subtitle1" sx={{textAlign:"start"}}>{user.introduction}</Typography>
            ) : index == 2 ? (
              <div className="flex">
                {user.interests.map((item) => (
                  <Typography key={item.title} className={classes.tag}>
                    {item.title}
                  </Typography>
                ))}
              </div>
            ) : (
              <Typography variant="subtitle1">{`${user.position} @  ${user.company_name}`}</Typography>
            )}
            <Divider />
          </CardContent>
        ))}
      </common.Popup>
    </>
  );
};

export default UserProfileSidePanel;
