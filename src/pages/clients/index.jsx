import React, { useEffect, useState, useCallback } from "react";
import { Box, useTheme } from "@mui/material";

import Head from "../../components/Head";
import Body from "../../components/Body";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Drawer from "../../components/Drawer/Drawer.jsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Paper from "@material-ui/core/Paper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../Redux/clients/slice";
import { fetchAccountInfo } from "../../Redux/infoAccount/slice";
import { CircularProgress } from "@material-ui/core";
import { Stack } from "@mui/system";

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
  { id: "nom", label: "Nom", minWidth: 100 },
  {
    id: "prenom",
    label: "Prénom",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "pays",
    label: "Pays",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "tel",
    label: "N° téléphone",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(nom, prenom, pays, email, tel) {
  return { nom, prenom, pays, email, tel };
}

const Clients = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);
  const status = useSelector((state) => state.clients.status);
  const error = useSelector((state) => state.clients.error);
  let navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  // if (status === 'loading') {
  //   return <CircularProgress />;
  // }

  // if (status === 'failed') {
  //   return <div style={{color:'red',fontSize:15,textAlign:'center'}}>Error: {error}</div>;
  // }

  // useEffect(() => {
  //   localStorage.setItem('clients', JSON.stringify(clients));
  // }, [clients]);

  // useEffect(() => {
  //   const storedClients = JSON.parse(localStorage.getItem('clients'));
  //   if (storedClients && storedClients.length > 0) {
  //     dispatch({ type: 'clients/fetchClients/fulfilled', payload: storedClients });
  //   }
  // }, [dispatch]);
  return (
    <Box>
      <Head title="Clients" />
      <Body>
        <Paper>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow key="header-row">
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

              {/* <TableBody>
                {status === "loading" ? (
                  <CircularProgress />
                ) : (
                  clients
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((client, ind) => {
                      return (
                        <Box key={ind}>
                          <StyledTableRow
                            hover
                            // role="checkbox"
                            // tabIndex={-1}
                            key={client.id}
                          >
                            <StyledTableCell>
                              {client.firstName}
                            </StyledTableCell>
                            <StyledTableCell>{client.lastName}</StyledTableCell>
                            <StyledTableCell>{client.country}</StyledTableCell>
                            <StyledTableCell>{client.email}</StyledTableCell>
                            <StyledTableCell>
                              {client.phoneNumber}
                            </StyledTableCell>
                          </StyledTableRow>
                        </Box>
                      );
                    })
                )}
              </TableBody> */}
              <TableBody>
                {clients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((client) => (
                    <StyledTableRow
                      hover
                      key={client.id}
                      onClick={() => handleRowClick(client.id)}
                    >
                      <StyledTableCell>
                        <div>{client.firstName}  </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div>{client.lastName}</div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div>{client.country}</div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div>{client.email}</div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div>{`${client.phoneNumber}`}</div>
                      </StyledTableCell>
                    
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={clients.length}
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

export {Clients};
