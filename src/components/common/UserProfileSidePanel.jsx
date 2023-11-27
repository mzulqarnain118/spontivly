import React, { useState } from "react";
import profile from "assets/images/profile.jpg";
import twitter from "assets/icons/twitter-square.svg";
import fb from "assets/icons/facebook.svg";
import linkedin from "assets/icons/linkedin.svg";
import dashboardStyles from "styles/components/dashboardStyles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Modal,
  Typography,
  Avatar,
  Drawer,
} from "@mui/material";

const UserProfileSidePanel = ({ user, isOpen, onClose }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const classes = dashboardStyles();

  const openModal = () => {
    setModalOpen(true);
  };
  const data = [
    "About",
    ["Education", "Gender"],
    ["Age", "Profession"],
    "Interests tags",
  ];
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Drawer
        anchor="right"
        PaperProps={{
          sx: { width: "17.71vw" },
        }}
        open={isOpen}
        onClose={onClose}
        sx={{ padding: "20px" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "48px",
          }}
        >
          <Avatar
            src={user.profile_pic}
            alt={user.name}
            sx={{ width: "3.33vw", height: "3.33vw" }}
          />
          <Typography
            sx={{
              color: " var(--day-primary, #262626)",
              fontSize: "20px",
              fontWeight: 600,
              marginTop: "16px",
            }}
          >
            {user.user.first_name + user.user.last_name}
          </Typography>
          <Typography
            sx={{
              color: "var(--petroleum-p-45, #93A5B4)",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {user.company_name}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <img src={twitter} style={{ marginRight: "1.04vw" }} />
            <img src={fb} style={{ marginRight: "1.04vw" }} />
            <img src={linkedin} />
          </Box>
          <Button
            fullWidth
            size="sm"
            sx={{
              padding: "6px 20px",
              borderRadius: "4px",
              border: " 1px solid var(--petroleum-p-45, #93A5B4)",
              margin: "16px 0",
              color: "var(--petroleum-p-100, #2D3840)",
              fontSize: "14px",
              fontWeight: 600,
            }}
            onClick={openModal}
          >
            View Full Profile
          </Button>
        </Box>
      </Drawer>
      <Modal open={isModalOpen} onClose={closeModal} className="row-center">
        <Card sx={{ padding: "20px", width: "583px" }}>
          {data.map((item, index) => (
            <CardContent className="col-start">
              {[1, 2].includes(index) ? (
                <div className="row-between" style={{ width: "100%" }}>
                  {item.map((child) => (
                    <Typography
                      key={child}
                      variant="subtitle"
                    >
                      {child}
                    </Typography>
                  ))}
                </div>
              ) : (
                <Typography variant="subtitle">{item}</Typography>
              )}
              {index == 0 ? (
                <Typography variant="subtitle1">{user.introduction}</Typography>
              ) : index == 3 ? (
                <div className="flex">
                  {user.interests.map((item) => (
                    <Typography key={item.title} className={classes.tag}>
                      {item.title}
                    </Typography>
                  ))}
                </div>
              ) : null}
              <Divider />
            </CardContent>
          ))}
        </Card>
      </Modal>
    </>
  );
};

export default UserProfileSidePanel;

                