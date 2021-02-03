import React from "react";
import { useNotificationListStyles } from "../../styles";
import { defaultNotifications } from "../../data";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import FollowButton from "../shared/FollowButton";
import useOutsideClick from "@rooks/use-outside-click";

function NotificationList({ handleHideList}) {
  const listContainerRef = React.useRef();
  const classes = useNotificationListStyles();
  // This line checks for a "click" event outside a selected section and then does a provided action."
  useOutsideClick(listContainerRef, handleHideList);

  return (
    <Grid ref={listContainerRef} className={classes.listContainer} container>
      {/* This code maps through the notifications and assigns them to isLike or isFollow then
      give then a basic layout for the UI */}
      {defaultNotifications.map(notification => {
        const isLike = notification.type === 'like';
        const isFollow = notification.type === 'follow';

        return (
          <Grid key={notification.id} item className={classes.listItem}>
            <div className={classes.listItemWrapper}>
              <div className={classes.avatarWrapper}>
                <Avatar src={notification.user.profile_image} alt="User avatar" />
              </div>
              <div className={classes.nameWrapper}>
                <Link to={`/${notification.user.username}`}>
                  <Typography variant="body1" >
                    {notification.user.username}
                  </Typography>
                </Link>
                <Typography
                variant="body2"
                color="textSecondary"
                className={classes.typography}
                >
                  {isLike && `likes your photo. 4d`}
                  {isFollow && `started following you. 5d`}
                </Typography>
              </div>
            </div>
            <div>
              {/* This code either shows a link in the form of a picture of the person who
               liked or a follow button if the notification was a follow. */}
              {isLike && (
                <Link to={`/p/${notification.post.id}`}>
                  <Avatar src={notification.post.media} alt="post cover" />
                </Link>
              )}
              {isFollow && <FollowButton />}
            </div>
          </Grid>
        )

      })}
    </Grid>
  )
}

export default NotificationList;
