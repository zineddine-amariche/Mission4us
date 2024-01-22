import React, { useEffect, useState } from "react";
import { Box, Stack, useTheme } from "@mui/material";
import Head from "../../components/Head";
import Body from "../../components/Body";
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
import { Snackbar } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ModalDelete from "../../components/modal";
import { useSelector, useDispatch } from "react-redux";
import { deleteJob, fetchJobs } from "../../Redux/jobs/slice";

import { CircularProgress } from "@material-ui/core";

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
  { id: "intitule", label: "Intitule", minWidth: 100 },
  // {
  //   id: "description",
  //   label: "Description",
  //   minWidth: 100,
  //   align: "left",
  //   format: (value) => value.toLocaleString("en-US")
  // },
  // {
  //   id: "secteur",
  //   label: "Secteur",
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

function createData(intitule, description, secteur) {
  return { intitule, description, secteur };
}

const Jobs = () => {
  const theme = useTheme();
  const jobs = useSelector((state) => state.jobs.jobs);
  const status = useSelector((state) => state.jobs.status);
  const error = useSelector((state) => state.jobs.error);
  const role = useSelector((state) => state.account?.user.authorities);

  // const classes = useStyles();
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
  const [ouvrir, setOuvrir] = useState(false);
  const handleOuvrir = () => setOuvrir(true);
  const handleFermer = () => setOuvrir(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(role, " role");
    dispatch(fetchJobs());
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
    dispatch(deleteJob(selectedRow));
    handleModalClose();
    setOpenSnackbar(true);
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
          <p>Jobs</p>
        </div>

        {role && role.includes("ROLE_ADMIN") && (
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            size="medium"
            style={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.background.default,
            }}
            onClick={() => navigate("Add Job")}
          >
            Ajouter
          </Button>
        )}
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
                    
                    
                    >{column.label}</StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              {/* <TableBody>
                {jobs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((job) => {
                    return (
                      <>
                        {status === "loading" && <CircularProgress />}
                        <StyledTableRow
                          hover
                          // role="checkbox"
                          // tabIndex={-1}
                          key={job.id}
                        >
                          <StyledTableCell>{job.name}</StyledTableCell>
                     <StyledTableCell >{job.name}</StyledTableCell>  
                          <StyledTableCell>{row.secteur}</StyledTableCell> 

                          <StyledTableCell align="left">
                            {/* <Tooltip title="Modifier">
                            <IconButton
                              aria-label="edit"
                              color="primary"
                              onClick={() => navigate(`Update Job/${job.id}`)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer">
                            <IconButton
                              aria-label="delete"
                              color="secondary"
                              onClick={() => handleDelete(job.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip> 

                            <Stack direction="row">
                              <Tooltip title="Modifier">
                      <Box 
                      // onClick={() => navigate(`Update Job/${job.id}`)} 
                      sx={{color:'green'}}>
                        <EditIcon/>
                        </Box>
                      </Tooltip> 
                              <Tooltip title="Supprimer">
                                <Box
                                  onClick={() => handleDelete(job.id)}
                                  sx={{ color: "red" }}
                                >
                                  <DeleteIcon />
                                </Box>
                              </Tooltip>
                            </Stack>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    );
                  })}
              </TableBody> */}
                    <TableBody>
                {jobs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((job,inx) => (
                    <StyledTableRow
                      hover
                      key={inx}
                      onClick={() => handleRowClick(job.id)}
                    >
                      <StyledTableCell>
                        <div>{job.name}  </div>
                      </StyledTableCell>
                      <StyledTableCell>

                      <Tooltip title="Supprimer">
                            <IconButton
                              aria-label="delete"
                              color="secondary"
                              onClick={() => handleDelete(job.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip> 
                          </StyledTableCell>
                    
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ModalDelete
            open={ouvrir}
            onClose={handleModalClose}
            title={"Voulez vous supprimer ce job?"}
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
            count={jobs.length}
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

export {Jobs};
