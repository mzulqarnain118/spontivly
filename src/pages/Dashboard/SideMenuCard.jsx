import { Avatar, Typography } from "@mui/material";
import { useState } from "react";
import common from "components/common";
import { useSelector } from "react-redux";
import { ApiCall } from "utils";
function SideMenuCard({ onPortalChange, setPanel, setRefetchUser, channels }) {
  const { currentUser } = useSelector((state) => state.dashboard);
  const [channelLabel, setChannelLabel] = useState("");
  const unFavorite = async (id) => {
    const response = await ApiCall(`profile/favorite/${id}`, null, "DELETE");
    if (response) {
      setRefetchUser(old=>!old);
    }
  };
  const handleClick = (url, label) => {
    setChannelLabel(label);
    url, label != "" && onPortalChange(url, label);
    setPanel(false);
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
                <Avatar src={user?.profile_pic} />
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
          {list.items.map((item) => (
            <dd
              className="row-between gap-06 cursor"
              style={{ color: channelLabel === item.label && "black" }}
              onClick={() => handleClick(item.url, item.label)}
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
