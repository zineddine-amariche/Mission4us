import React, { useEffect, useState, useCallback } from "react";
import { Box, Stack, useTheme } from "@mui/material";
import Head from "../../components/Head";
import Body from "../../components/Body";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import AddMission from "./formAjoutMission";
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
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import ModalDelete from "../../components/modal";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import DevisMission from "./formDevis";
import EditMission from "./formEditMission";
import { CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { deleteMission, fetchMissions } from "../../Redux/mission/slice";
import DrawerInfo from "../../components/Drawer/Drawer.jsx";
import { Snackbar } from "@material-ui/core";

const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
}));

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
  { id: "name", label: "Nom mission", minWidth: 100 },
  {
    id: "intitule",
    label: "Intitulé de la mission",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "job",
    label: "Job",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "adresse",
    label: "Adresse",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  // {
  //   id: "tel",
  //   label: "N° téléphone",
  //   minWidth: 100,
  //   align: "left",
  //   format: (value) => value.toLocaleString("en-US")
  // },
  {
    id: "actions",
    label: "Actions",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(client, intitule, job, adresse, tel) {
  return { client, intitule, job, adresse, tel };
}

const rows = [
  createData(
    "John Dev",
    "loremImpum",
    "Front-end Engeenier",
    "Bejaia",
    "0782205066",
  ),
  createData(
    "Jack BK",
    "loremImpum",
    "Full stack Engeenier",
    "Bejaia",
    "0782205066",
  ),
  createData(
    "John Dev",
    "loremImpum",
    "Front-end Engeenier",
    "Bejaia",
    "0782205066",
  ),
  createData(
    "Jack BK",
    "loremImpum",
    "Full stack Engeenier",
    "Bejaia",
    "0782205066",
  ),
  createData(
    "John Dev",
    "loremImpum",
    "Front-end Engeenier",
    "Bejaia",
    "0782205066",
  ),
  createData(
    "Jack BK",
    "loremImpum",
    "Full stack Engeenier",
    "Bejaia",
    "0782205066",
  ),
  createData(
    "John Dev",
    "loremImpum",
    "Front-end Engeenier",
    "Bejaia",
    "0782205066",
  ),
  createData(
    "Jack BK",
    "loremImpum",
    "Full stack Engeenier",
    "Bejaia",
    "0782205066",
  ),
];

const Missions = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const missions = useSelector((state) => state.missions.missions);
  const status = useSelector((state) => state.missions.status);
  const error = useSelector((state) => state.missions.error);

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => setOpen(false), []);
  const buttonStyle = useButtonStyles();

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
  const [ouvrir, setOuvrir] = React.useState(false);
  const handleOuvrir = () => setOuvrir(true);
  const handleFermer = () => setOuvrir(false);

  const [openDevis, setOpenDevis] = useState(false);

  const handleOpenDevis = useCallback(() => setOpenDevis(true), []);

  const handleCloseDevis = useCallback(() => setOpenDevis(false), []);

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = useCallback(() => setOpenEdit(true), []);

  const handleCloseEdit = useCallback(() => setOpenEdit(false), []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleDelete = (id) => {
    handleOuvrir();
    setSelectedRow(id);
  };

  const handleModalClose = () => {
    handleFermer();
    setSelectedRow(null);
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleConfirmDelete = () => {
    dispatch(deleteMission(selectedRow));
    handleModalClose();
    setOpenSnackbar(true);
  };
  const role = useSelector((state) => state.account?.user.authorities);

  const handleRowClick = (id) => {
    setSelectedRow(id);
  };

  return (
    <Box>
      <Box
        sx={{
          padding: "10px",
          color: theme.palette.grey[100],
          fontSize: "22px",
          backgroundColor: theme.palette.background.default,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.light,
          }}
        >
          <p>Missions</p>
        </div>
        <div>
          {role == "ROLE_CLIENT" || role == "ROLE_ADMIN" ? (
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              size="medium"
              style={{
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.background.default,
              }}
              onClick={handleOpen}
            >
              Ajouter
            </Button>
          ) : null}
          <DrawerInfo anchor="right" open={open}>
            <AddMission open={open} onClose={handleClose} />
          </DrawerInfo>
        </div>
      </Box>
      <Body>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
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

              {/* <TableBody key="body-row">
                {missions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((mission) => {
                    return (
                      <>
                        {status === "loading" && <CircularProgress />}
                        <StyledTableRow
                          hover
                          // role="checkbox" tabIndex={-1}
                          key={mission.id}
                          onClick={() => handleRowClick(mission.id)}
                        >
                          <StyledTableCell>{mission.name}</StyledTableCell>
                          <StyledTableCell>{mission.details}</StyledTableCell>
                          <StyledTableCell>{mission.type}</StyledTableCell>
                          <StyledTableCell>{`${mission.street},${mission.city},${mission.country}`}</StyledTableCell>
                          <StyledTableCell>{row.tel}</StyledTableCell> 

                          <StyledTableCell align="left">
                            <Stack direction="row">
                              {role == "ROLE_CLIENT" || role == "ROLE_ADMIN" ? (
                                <>
                                  <Tooltip title="Supprimer">
                                    <Box
                                      onClick={() => handleDelete(mission.id)}
                                      sx={{ color: "red" }}
                                    >
                                      <DeleteIcon />
                                    </Box>
                                  </Tooltip>
                                </>
                              ) : null}
                              {role == "ROLE_PROVIDER" ? (
                                <Tooltip title="Creer devis">
                                  <Box onClick={handleOpenDevis}>
                                    <FormatQuoteIcon />
                                  </Box>
                                </Tooltip>
                              ) : null}
                            </Stack>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    );
                  })}
              </TableBody> */}

              <TableBody>
                {missions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((mission) => (
                    <StyledTableRow
                      hover
                      key={mission.id}
                      onClick={() => handleRowClick(mission.id)}
                    >
                      <StyledTableCell>
                        <div>{mission.name} </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div>{mission.details}</div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div>{mission.type}</div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div>{`${mission.street},${mission.city},${mission.country}`}</div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Stack direction="row">
                          {role == "ROLE_CLIENT" || role == "ROLE_ADMIN" ? (
                            <>
                              <Tooltip title="Supprimer">
                                <Box
                                  onClick={() => handleDelete(mission.id)}
                                  sx={{ color: "red" }}
                                >
                                  <DeleteIcon />
                                </Box>
                              </Tooltip>
                            </>
                          ) : null}
                          {role == "ROLE_PROVIDER" ? (
                            <Tooltip title="Créer devis">
                              <Box onClick={handleOpenDevis}>
                                <LocalAtmIcon />
                              </Box>
                            </Tooltip>
                          ) : null}
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <DrawerInfo anchor="right" open={openDevis}>
            <DevisMission
              open={openDevis}
              onClose={handleCloseDevis}
              missionId={selectedRow}
            />
          </DrawerInfo>
          <DrawerInfo anchor="right" open={openEdit}>
            <EditMission open={openEdit} onClose={handleCloseEdit} />
          </DrawerInfo>

          <ModalDelete
            open={ouvrir}
            onClose={handleModalClose}
            title={"Voulez vous supprimer cette mission?"}
            onDelete={handleConfirmDelete}
          />
          {status === "succeeded" && (
            <Snackbar
              open={openSnackbar}
              message="Votre suppression a été exécutée avec succès."
              autoHideDuration={3000}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              ContentProps={{ style: { backgroundColor: "green" } }}
            />
          )}

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={missions.length}
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

export  {Missions};
