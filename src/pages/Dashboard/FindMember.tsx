import { Avatar, Box, Card, Grid, Typography } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Send from '../../assets/icons/send.svg'
import { Controls as common } from '../../components/common'
import { dashboardStyles } from '../../styles/components/dashboardStyles'
import { ApiCall, encodeParams } from '../../utils'
import { InviteMember } from './InviteMember'
import { UserProfileSidePanel } from './UserProfileSidePanel'

const sortByData = [
  { id: 'Most Recent', title: 'Most Recent' },
  { id: 'Recommendation', title: 'Recommendations' },
  { id: 'Un-Published', title: 'Un-Published' },
  { id: 'Draft', title: 'Draft' }
]
const moreOptions = ['View Profile', 'Email', 'Message via Slack']

function FindMember({ addFavorites, unFavorite }) {
  const classes: any = dashboardStyles()
  const currentUser = useSelector((state: any) => state?.dashboard?.currentUser)
  const role = currentUser?.user?.groups?.[0]?.name ?? ''
  const [viewProfile, setViewProfile] = useState(false)
  const [handleMore, setHandleMore] = useState<any>(null)
  const [isMemberDialogOpen, setMemberDialogOpen] = useState(false)

  const [findMember, setFindMember] = useState({
    member: '',
    sortBy: 'Most Recent',
    favorites: []
  })

  const isFavorite = (id) => currentUser?.favorites?.some((item) => item.id == id)

  async function fetchMembers({ pageParam = 1 }) {
    const queryParams = {
      page: pageParam,
      name: findMember.member,
      sort: findMember.sortBy
    }
    const encodedParams = encodeParams(queryParams)
    const apiUrl = `profile?${encodedParams}`

    return ApiCall(apiUrl)
  }

  const {
    data: members,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
    isError
  } = useInfiniteQuery({
    queryKey: ['profile', findMember.member, findMember.sortBy], // Dynamic query key
    queryFn: fetchMembers,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.next
  })

  const openMemberDialog = () => {
    setMemberDialogOpen(true)
  }

  const handleCloseUserMenu = (item, content) => {
    if (item === 'Email') {
      window.location.href = `mailto:${handleMore.user.email}`
    } else if (item === 'View Profile') {
      setHandleMore(content)
      setViewProfile(true)
    }
  }

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xss={6} xs={6} sm={8} md={9}>
          <Typography variant="h5" align="left">
            {members?.pages?.[0]?.count} Members
          </Typography>
        </Grid>
        {role === 'Moderator' && (
          <Grid item xss={6} xs={6} sm={4} md={3}>
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
          <Grid item xss={12} xs={6} sm={8} md={9} sx={{ pr: 1 }}>
            <common.Input
              name="member"
              placeholder="Search members"
              value={findMember.member}
              listUpdater={setFindMember}
              startIcon="Search"
            />
          </Grid>

          <Grid item xss={12} xs={6} sm={4} md={3}>
            <common.Select name="sortBy" value={findMember.sortBy} label="Sort By" listUpdater={setFindMember} options={sortByData} />
          </Grid>
        </Grid>

        <common.InfiniteQueryWrapper
          isSuccess={isSuccess}
          isError={isError}
          data={members}
          error={error}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {(members) =>
            members.length != 0 &&
            members?.map((rec) => (
              <Box key={rec?.dashboard_user} padding={'0.75rem 1.25rem'}>
                <Grid container className={`row-between ${classes.content}`}>
                  <Grid item xss={6} xs={8} sm={4} md={4} lg={4}>
                    <Box className="row gap-1">
                      <Avatar src={rec?.profile_pic} />
                      <Box className="col-start gap-05">
                        <Box className="row-start gap-05">
                          <Typography variant="author">{rec?.user?.first_name + rec?.user?.last_name}</Typography>
                          {isFavorite(rec?.id) ? (
                            <common.MuiIcon name="StarRateRounded" color="warning.main" onClick={() => unFavorite(rec?.id)} />
                          ) : (
                            <common.MuiIcon name="StarBorderRounded" color="primary.lighter" onClick={() => addFavorites(rec?.id)} />
                          )}
                        </Box>
                        <Typography variant="lighterSubtitle2">{rec?.user?.email}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xss={6} xs={4} sm={4} md={2} lg={2}>
                    <Typography className={classes.role}>{rec?.user?.groups?.[0]?.name == 'Moderator' ? 'Moderator' : 'Member'}</Typography>
                  </Grid>
                  <Grid item xss={4} xs={3} md={2} lg={2}>
                    <Typography className={classes.role}>
                      {rec?.position} , {rec?.company_name}
                    </Typography>
                  </Grid>
                  <Grid item xss={7} xs={4} md={3} lg={3} className="row-around">
                    {/* <common.MuiIcon name="FiberManualRecord" fontSize="10px" IconColor={rec?.match_count ? 'success' : 'error'} /> */}
                    {rec?.match_count ? rec?.match_count : 'No'} Matches
                  </Grid>

                  <Grid item xs={1} md={1} lg={1}>
                    <common.MenuList items={moreOptions} onClose={(item) => handleCloseUserMenu(item, rec)} icon="MoreHorizRounded" />
                  </Grid>
                </Grid>
                <Box className="flex">
                  {rec.interests.map((item) => (
                    <Typography key={item.title} className={classes.tag}>
                      {item.title}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))
          }
        </common.InfiniteQueryWrapper>
      </Card>
      {viewProfile && <UserProfileSidePanel user={handleMore} openPanel={viewProfile} setPanel={setViewProfile} />}
      <common.Popup
        openPopup={isMemberDialogOpen}
        setPopup={setMemberDialogOpen}
        width={'sm'}
        title={'Invite Members'}
        submitBtnLabel="Send Invite"
        subTitle={'Invite members to your Directory.'}
      >
        <InviteMember />
      </common.Popup>
    </>
  )
}

export { FindMember }
