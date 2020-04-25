import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#000000",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    background: "#363740",
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#363740",
  },
  topBarPaper: {
    width: drawerWidth,
    background: "white !important",
  },
  topBarCard: {
    height: 140,
    width: 450,
  },
  rowContainer: {
    marginBottom: 20,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  topBarCardValue: {
    fontSize: 40,
    fontWeight: "normal",
    paddingTop: 10,
  },
  listItem: {
    color: "#A4A6B3",
  },
  menuIcon: {
    color: "#A4A6B3",
  },
  topBarTitle: {
    color: "black",
  },
}));
