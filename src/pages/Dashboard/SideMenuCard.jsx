import { Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import common from "components/common";
import { useSelector, useDispatch } from "react-redux";
import { ApiCall } from "utils";
import { fetchCurrentUser } from "redux/dashboardSlice";
function SideMenuCard({ onPortalChange }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.dashboard);
  const channels = [
    {
      header: "CHANNELS",
      items: [
        { url: "", label: "General", icon: "Tag" }, //!replace url:"" with url:"general"
        { url: "", label: "Create Channel", icon: "AddCircle" },
      ],
    },
    {
      header: "COMMUNITY",
      items: [{ url: "", label: "Add Member", icon: "AddCircle" }],
    },
    {
      header: "RESOURCES",
      items: [
        { url: "find", label: "Find Member", icon: "Search" },
        { url: "library", label: "Library", icon: "YouTube" },
      ],
    },
  ];
  const unFavorite = async (id) => {
    const response = await ApiCall(`profile/favorite/${id}`, null, "DELETE");
    if (response) {
      dispatch(fetchCurrentUser());
    }
  };
  const handleClick = (text) => {
    text != "" && onPortalChange(text);
  };

  return (
    <dl
      className="col-start gap-2"
      style={{
        color: "#698296",
      }}
    >
      {channels.map((list, index) => (
        <div className="col-start gap-2">
          <dt>{list.header}</dt>
          {index == 1 &&
            currentUser[0]?.favorites?.map((user) => (
              <dd className="row-between gap-05">
                <Avatar src={user.profile_pic} />
                <Typography color="primary.main">
                  {user.user.first_name}
                </Typography>
                <common.MuiIcon
                  name={"StarRateRounded"}
                  color="warning.main"
                  onClick={() => unFavorite(user.id)}
                />
              </dd>
            ))}
          {list.items.map((item, itemIndex) => (
            <dd
              className="row-between gap-06 cursor"
              onClick={() => handleClick(item.url)}
            >
              <common.MuiIcon name={item.icon} />
              <Typography>{item.label}</Typography>
            </dd>
          ))}
        </div>
      ))}
    </dl>
  );
}

export default SideMenuCard;
