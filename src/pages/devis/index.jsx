import React, { useEffect, useState, useCallback } from "react";
import { Box, Tooltip, useTheme } from "@mui/material";

import Head from "../../components/Head";
import Body from "../../components/Body";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Drawer from "../../components/Drawer/Drawer.jsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Paper from "@material-ui/core/Paper";
import InfoIcon from "@mui/icons-material/Info";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountInfo } from "../../Redux/infoAccount/slice";
import { CircularProgress } from "@material-ui/core";
import { Stack } from "@mui/system";
import { fetchDevis } from "../../Redux/devis/slice";
import VisibilityIcon from "@mui/icons-material/Visibility";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.light,
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.black,
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [
  { id: "status", label: "Status", minWidth: 100 },
  {
    id: "amount",
    label: "Fourchette du prix",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "created",
    label: "Date de creation",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  // {
  //   id: "provider",
  //   label: "Fournisseur",
  //   minWidth: 100,
  //   align: "left",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  // {
  //   id: "tel",
  //   label: "N° téléphone",
  //   minWidth: 100,
  //   align: "left",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  {
    id: "actions",
    label: "Actions",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const Devis = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const devis = useSelector((state) => state.devis.devis);

  const status = useSelector((state) => state.devis.status);
  const error = useSelector((state) => state.devis.error);
  let navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const providers = useSelector((state) => state.providers.providers);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchDevis());
  }, [dispatch]);

  const role = useSelector((state) => state.account?.user.authorities);

  return (
    <Box>
      <Head title="Devis" />
      <Body>
        <Paper>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {status === "loading" && <CircularProgress />}
                {devis
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((devi, index) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={devi.id}
                      >
                        <StyledTableCell>
                          <div
                            style={{
                              backgroundColor:
                                devi.status === "SELECTED"
                                  ? "green"
                                  : devi.status === "NEW"
                                  ? "blue"
                                  : "red",
                              borderRadius: 50,
                              padding: 10,
                              textAlign: "center",
                              color: "white",
                              width: 100,
                            }}
                          >
                            {devi.status}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>{devi.amount}</StyledTableCell>
                        <StyledTableCell>{devi.created}</StyledTableCell>
                        {/* <StyledTableCell>{provider.email}</StyledTableCell> */}
                        {/* <StyledTableCell>{provider.phoneNumber}</StyledTableCell> */}
                        <StyledTableCell align="left">
                          <Stack direction="row">
                            {role == "ROLE_CLIENT" || role == "ROLE_ADMIN" ? (
                              <>
                                <Tooltip
                                  title={devi.providerId ? "voir cv" : ""}
                                >
                                  <Box
                                    onClick={() => {
                                      if (devi.providerId) {
                                        // console.log("devi", devi);
                                        navigate(`/VisualiserCvClient/${devi.providerId}`,{state:devi.providerId});
                                      } else {
                                        return;
                                      }
                                    }}
                                    sx={{
                                      color: devi.providerId ? "#112" : "gray",
                                    }}
                                  >
                                    <VisibilityIcon />
                                  </Box>
                                </Tooltip>
                              </>
                            ) : null}
                            {/* {role == "ROLE_PROVIDER" ? (
                                <Tooltip title="Creer devis">
                                  <Box onClick={return}>
                                    <InfoIcon />
                                  </Box>
                                </Tooltip>
                              ) : null} */}
                          </Stack>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={devis.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.primary.light,
            }}
          />
        </Paper>
      </Body>
    </Box>
  );
};

export  {Devis};
