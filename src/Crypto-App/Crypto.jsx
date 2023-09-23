import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import Skeleton from "@material-ui/lab/Skeleton";
import SearchIcon from "@material-ui/icons/Search";
import "./Crypto.css";
const searchBar = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    fontSize: "bold",

    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: withStyles(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: withStyles(theme.palette.common.white, 0.25),
    },
    border: "1px solid white ",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "blue",
    fontWeight: "bold",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    padding: 2,
    textAlign: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const table = makeStyles({
  tableHead: {
    position: 'sticky',
    top: 0,
    
  },
  tableContainer: {
    maxHeight: 600, // Adjust the maximum height as needed
  },

 

});

export default function CustomizedTables() {
  const classes = table();
  const searchBarStyles = searchBar();
  const tableStyles = table();
  const url = "https://api.npoint.io/491d153c7728e651f1dc";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((responce) => responce.json())
      .then((datas) => setData(datas));
  }, []);
  const [search, setSearch] = useState("");
  return (
    <>
      {/* Search Bar  */}
      <div className={searchBarStyles.root}>
        <AppBar
          style={{
            background: "black",
            color: "white",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={searchBarStyles.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={searchBarStyles.title}
              style={{ fontWeight: "bold",textAlign:'center' }}
              variant="h6"
              noWrap
            >
              Crypto Currency
            </Typography>
            <div className={searchBarStyles.search}>
              <div className={searchBarStyles.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                style={{ fontWeight: "bold" }}
                onKeyUp={(e) => setSearch(e.target.value)}
                placeholder="Search Coins…"
                classes={{
                  root: searchBarStyles.inputRoot,
                  input: searchBarStyles.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {/* Table */}
      
        <TableContainer
          component={Paper}
          style={{
            marginTop: "50px",
          }}
          className={classes.tableContainer}
        >
          <Table className={tableStyles} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className={classes.tableHead} align="center">
                  coins
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead} align="center">
                  price
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead} align="center">
                  mcap
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead} align="center">
                  price change 24h
                </StyledTableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
             
            
              {data &&
                data 
                  .filter((filterData) =>
                    search === ""
                      ? filterData
                      : filterData.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                  )
                  .map((crypo, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        key={crypo.id}
                      >
                        <img
                          src={crypo.image}
                          alt={crypo.name}
                          style={{
                            width: "30px",
                            height: "30px",
                            padding: "1px",
                          }}
                        />{" "}
                        <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                          {crypo.name.toUpperCase()}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        {crypo.current_price}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        {" "}
                        {crypo.market_cap}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        {" "}
                        {crypo.price_change_24h}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                       

              {!data.length && (
                <>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    style={{ width: "490%", height: 50 }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    style={{ width: "490%", height: 80 }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    style={{ width: "490%", height: 50 }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    style={{ width: "490%", height: 80 }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    style={{ width: "490%", height: 50 }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    style={{ width: "490%", height: 80 }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    style={{ width: "490%", height: 50 }}
                  />
                </>
              )}
       
            </TableBody>
          </Table>
        </TableContainer>
     
    </>
  );
}
