import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import MenuIcon from '@material-ui/icons/Menu';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const DrawerStep = () => {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function home() {
    history.push("/");
  }
  function gallery() {
    history.push("/gallery");
  }
  function upload() {
    history.push("/upload");
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key={'Home'} onClick={home}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'Upload'} onClick={upload}>
          <ListItemIcon><AddAPhotoIcon /></ListItemIcon>
          <ListItemText primary={'Upload'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Gallery'} onClick={gallery}>
          <ListItemIcon><PhotoAlbumIcon /></ListItemIcon>
          <ListItemText primary={'Gallery'} />
        </ListItem>
      </List>

    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DrawerStep;