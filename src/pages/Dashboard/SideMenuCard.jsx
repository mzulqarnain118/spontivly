import { Avatar, Typography } from "@mui/material";
import React from "react";

import profile from "assets/images/profile.jpg";
import common from "components/common";
import { useSelector } from "react-redux";
function SideMenuCard({ onPortalChange }) {
  const { currentUser } = useSelector((state) => state.dashboard);

  console.log("🚀 ~ file: SideMenuCard.jsx:10 ~ SideMenuCard ~ currentUser:", currentUser)

  const channels = [
    {
      header: "CHANNELS",
      items: [
        { url: "general", label: "General", icon: "Tag" },
        { url: "#", label: "Create Channel", icon: "AddCircle" },
      ],
    },
    {
      header: "COMMUNITY",
      items: [
        { url: "#", label: "Brouce" },
        { url: "#", label: "Thor" },
        { url: "#", label: "Hank" },
        { url: "#", label: "Shuri" },
        { url: "#", label: "Add Member", icon: "AddCircle" },
      ],
    },
    {
      header: "RESOURCES",
      items: [
        { url: "find", label: "Find Member", icon: "Search" },
        { url: "library", label: "Library", icon: "YouTube" },
      ],
    },
  ];
  const handleClick = (text) => {
    onPortalChange(text);
  };
  return (
    <dl
      className="col-start gap-2"
      style={{
        color: "#698296",
      }}
    >
      {channels.map((list, index) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "flex-start",
          }}
        >
          <dt>{list.header}</dt>
          {list.items.map((item, itemIndex) => (
            <dd
              className="row-between gap-05 cursor"
              onClick={() => handleClick(item.url)}
            >
              {index == 1 && itemIndex != 4 ? (
                <Avatar src={profile} />
              ) : (
                <common.MuiIcon name={item.icon} />
              )}
              <Typography>{item.label}</Typography>
              {index == 1 && itemIndex != 4 && (
                <common.MuiIcon name={"StarRateRounded"} color="warning.main" />
              )}
            </dd>
          ))}
        </div>
      ))}
    </dl>
  );
}

export default SideMenuCard;
