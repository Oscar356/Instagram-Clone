import React from "react";
import { useNavbarStyles, WhiteTooltip, RedTooltip } from "../../styles";
import {
  AppBar,
  Avatar,
  Grid,
  Fade,
  Hidden,
  InputBase,
  Typography,
  Zoom,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/logo.png";
import {
  LoadingIcon,
  AddIcon,
  LikeIcon,
  LikeActiveIcon,
  ExploreIcon,
  ExploreActiveIcon,
  HomeIcon,
  HomeActiveIcon,
} from "../../icons";
import NotificationTooltip from "../notification/NotificationTooltip";
import { defaultCurrentUser, getDefaultUser } from "../../data";
import NotificationList from "../notification/NotificationList";
import { useNProgress } from "@tanem/react-nprogress";

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const history = useHistory();
  const [isLoadingPage, setLoadingPage] = React.useState(true);
  const path = history.location.pathname;
  // Part of the code in charge of showing a loading bar when opening a page.
  React.useEffect(() => {
    setLoadingPage(false);
  }, [path]);

  return (
    <>
      <Progress isAnimating={isLoadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          {!minimalNavbar && (
            <>
              <Search history={history} />
              <Links path={path} />
            </>
          )}
        </section>
      </AppBar>
    </>
  );
}
// This is the Logo that is also a link to the Home page.
function Logo() {
  const classes = useNavbarStyles();
  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="Instagram" className={classes.logo} />
        </div>
      </Link>
    </div>
  );
}
// Search Bar code.
function Search({ history }) {
  const classes = useNavbarStyles();
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [query, setQuery] = React.useState("");

  // This line is to just remove "warning". 
  console.log(setLoading + "Ignore");

  const hasResults = Boolean(query) && results.length > 0;
  console.log(results, hasResults);

  React.useEffect(() => {
    if (!query.trim()) return;
    setResults(Array.from({ length: 5 }, () => getDefaultUser()));
  }, [query]);
  // This is a function to clear the search bar.
  function handleClearInput() {
    setQuery("");
  }
  // Research WhiteTooltip
  return (
    <Hidden xsDown>
      <WhiteTooltip
        arrow
        interactive
        TransitionComponent={Fade}
        open={hasResults}
        titile={
          hasResults && (
            <Grid className={classes.resultContainer} container>
              {results.map((result) => (
                <Grid
                  key={result.id}
                  item
                  className={classes.resultLink}
                  onClick={() => {
                    history.push(`/${result.username}`);
                    handleClearInput();
                  }}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profile_image} alt="user avatar" />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body1">{result.username}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {result.name}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }
      >
        <InputBase
          className={classes.input}
          onChange={(event) => setQuery(event.target.value)}
          startAdornment={<span className={classes.searchIcon} />}
          endAdornment={
            loading ? (
              <LoadingIcon />
            ) : (
              <span onClick={handleClearInput} className={classes.clearIcon} />
            )
          }
          placeholder="Search"
          value={query}
        />
      </WhiteTooltip>
    </Hidden>
  );
}
// This component controls the icons on the top right of the screen.
function Links({ path }) {
  const classes = useNavbarStyles();
  const [showTooltip, setTooltip] = React.useState(true);
  const [showList, setList] = React.useState(false);

  // Review this. Week 4, video 4, time 31:30
  // This is responsible for changing showTooltip from true to false after 5 seconds.
  React.useEffect(() => {
    const timeout = setTimeout(handleHideTooltip, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function handleToggleList() {
    setList((prev) => !prev);
  }

  function handleHideTooltip() {
    setTooltip(false);
  }

  function handleHideList() {
    setList(false);
  }

  return (
    <div className={classes.linksContainer}>
      {showList && <NotificationList handleHideList={handleHideList} />}
      <div className={classes.linksWrapper}>
        <Hidden xsDown>
          <AddIcon />
        </Hidden>
        {/* These next two links take to the home and explore page */}
        <Link to="/">{path === "/" ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        <Link to="/explore">
          {path === "/explore" ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        {/* Controls the like Icon to be active or not. Its also going to control a list of some kind, still working on it */}
        <div className={classes.notifications} onClick={handleToggleList}>
          {showList ? <LikeActiveIcon /> : <LikeIcon />}
        </div>
        <Link to={`/${defaultCurrentUser.username}`}>
          <RedTooltip
            arrow
            open={showTooltip}
            onOpen={handleHideTooltip}
            TransitionComponent={Zoom}
            title={<NotificationTooltip />}
          >
            {/* This code puts a rings around the users picture if they are on they're profile */}
            <div
              className={
                path === `/${defaultCurrentUser.username}`
                  ? classes.profileActive
                  : ""
              }
            ></div>
          </RedTooltip>
          <Avatar
            src={defaultCurrentUser.profile_image}
            className={classes.profileImage}
          />
        </Link>
      </div>
    </div>
  );
}

function Progress({ isAnimating }) {
  const classes = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div
      className={classes.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className={classes.progressBar}
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
        }}
      >
        <div className={classes.progressBackground} />
      </div>
    </div>
  );
}

export default Navbar;
