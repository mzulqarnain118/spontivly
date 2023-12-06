import {
  Avatar,
  Box,
  Card,
  ClassNameMap,
  Grid,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import UserProfileSidePanel from './UserProfileSidePanel';
import dashboardStyles from 'styles/components/dashboardStyles';
import common from 'components/common';
import { ApiCall } from 'utils';
import Spinner from 'components/common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from 'redux/dashboardSlice';
import Send from 'assets/icons/send.svg';
import InviteMember from './InviteMember';
function FindMember() {
  const dispatch = useDispatch();
  const classes: ClassNameMap<any> = dashboardStyles();

  const { currentUser } = useSelector((state: any) => state.dashboard);
  const [viewProfile, setViewProfile] = useState(false);
  const [handleMore, setHandleMore] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [isMemberDialogOpen, setMemberDialogOpen] = useState(false);

  const [findMember, setFindMember] = useState({
    member: '',
    sortBy: null,
    favorites: [],
  });
  const sortByData = [
    { id: 'Most Recent', title: 'Most Recent' },
    { id: 'Recommendation', title: 'Recommendations' },
  ];
  const moreOptions = ['View Profile', 'Email', 'Message via Slack'];
  const isFavorite = (id: any) =>
    currentUser?.[0]?.favorites?.some((item: any) => item.id == id);

  const addFavorites = async (id: any) => {
    const response = await ApiCall('profile/favorite/', null, 'POST', {
      favorite: id,
    });
    if (response) {
      dispatch(fetchCurrentUser());
    }
  };

  const fetchMembers = async () => {
    const response = await ApiCall('profile', setLoading);
    response && setMembers(response?.results);
  };

  const searchMember = async (name: any) => {
    const response = await ApiCall(`profile?name=${name}`, setLoading);
    response && setMembers(response?.results);
  };

  const sortByApi = async (sortBy: any) => {
    const response = await ApiCall(`profile?sort=${sortBy}`, setLoading);
    response && setMembers(response?.results);
  };
  const openMemberDialog = () => {
    setMemberDialogOpen(true);
  };
  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    findMember.member && searchMember(findMember.member);
  }, [findMember.member]);

  useEffect(() => {
    findMember.sortBy && sortByApi(findMember.sortBy);
  }, [findMember.sortBy]);

  const handleCloseUserMenu = (item: any) => {
    if (item === 'Email') {
      window.location.href = `mailto:${handleMore.user.email}`;
    } else if (item === 'View Profile') {
      setViewProfile(true);
    } else {
      console.log(item);
    }
  };

  return members?.length == 0 ? (
    <Spinner isLoading={loading} />
  ) : (
    <>
      <Grid container alignItems="center">
        <Grid item xs={6} sm={8} md={9}>
          <Typography variant="h5" align="left">
            {members?.length} Members
          </Typography>
        </Grid>
        {currentUser?.[0]?.user.groups[0]?.name == 'Moderator' && (
          <Grid item xs={6} sm={4} md={3}>
            <common.MuiButton
              variant="contained"
              size="large"
              label="Invite Member"
              className={classes.addContentButton}
              startIcon={<common.Img src={Send} />}
              onClick={openMemberDialog}
            />
          </Grid>
        )}
      </Grid>
      <Card className={classes.card}>
        <Grid container spacing={3} padding={'20px'}>
          <Grid item xs={8} sx={{ pr: 1 }}>
            <common.Input
              name="member"
              placeholder="Search members"
              value={findMember.member}
              listUpdater={setFindMember}
              startIcon={true}
            />
          </Grid>

          <Grid item xs={4}>
            <common.Select
              name="sortBy"
              value={findMember.sortBy}
              label="Sort By"
              listUpdater={setFindMember}
              options={sortByData}
            />
          </Grid>
        </Grid>
        {members?.map((rec: any, index: number) => (
          <Box padding={'0.75rem 1.25rem'}>
            <Grid container className={`row-between ${classes.content}`}>
              <Grid item xs={8} md={4} lg={4}>
                <Box className="row gap-1">
                  <Avatar src={rec.profile_pic} />
                  <Box className="col-start gap-05">
                    <Box className="row-start gap-05">
                      <Typography>
                        {rec.user.first_name + rec.user.last_name}
                      </Typography>
                      {isFavorite(rec.id) ? (
                        <common.MuiIcon
                          name="StarRateRounded"
                          color="warning.main"
                          onClick={() => addFavorites(rec.id)}
                        />
                      ) : (
                        <common.MuiIcon
                          name="StarBorderRounded"
                          color="primary.lighter"
                          onClick={() => addFavorites(rec.id)}
                        />
                      )}
                    </Box>
                    <Typography>{rec.user.email}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4} md={2} lg={2}>
                <Typography className={classes.role}>
                  {rec.user.groups[0]?.name == 'Moderator'
                    ? 'Moderator'
                    : 'Member'}
                </Typography>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <Typography className={classes.role}>{rec.position}</Typography>
              </Grid>
              <Grid item xs={4} md={2} lg={2} className="row-around">
                <common.MuiIcon
                  name="FiberManualRecord"
                  fontSize="10px"
                  IconColor={rec?.match_count ? 'success' : 'error'}
                />
                {rec?.match_count ? rec?.match_count : 'No'} Matches
              </Grid>

              <Grid
                item
                xs={1}
                md={1}
                lg={1}
                onClick={() => setHandleMore(rec)}
              >
                <common.MenuList
                  items={moreOptions}
                  onClose={handleCloseUserMenu}
                  icon="MoreHorizRounded"
                  tooltip="Open settings"
                />
              </Grid>
            </Grid>
            <Box className="flex">
              {rec.interests.map((item: any) => (
                <Typography className={classes.tag}>{item.title}</Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Card>
      {viewProfile && (
        <UserProfileSidePanel
          user={handleMore}
          openPanel={viewProfile}
          setPanel={setViewProfile}
        />
      )}
      <common.Popup
        openPopup={isMemberDialogOpen}
        setPopup={setMemberDialogOpen}
        width={'sm'}
        children={<InviteMember />}
        title={'Manage Members'}
        subTitle={'Invite members to your Directory.'}
      />
    </>
  );
}

export default FindMember;
