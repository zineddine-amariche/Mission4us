import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme ,Stack,} from "@mui/material";
import "./styles.css";
import { AccountCircle } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Body from "../../components/Body";
import Button from "@mui/material/Button";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import Space from "../../components/outils/Space";
import EditProfile from "./formEditProfile";
import { fetchAccount } from "../../Redux/account/slice";
import { useDispatch, useSelector } from "react-redux";
const Profile = () => {
  const theme = useTheme();
  const [clicked, setclicked] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account?.user);
  const status = useSelector((state) => state.account?.status);
  const error = useSelector((state) => state.account?.error);
  // useEffect(() => {
   
  //     dispatch(fetchAccount());
   
  // }, [dispatch]);
  return (
    <Box className="dashboard">
      <Box
        sx={{
          padding: "10px",
          color: theme.palette.grey[100],
          fontSize: "22px",
          backgroundColor: theme.palette.background.default,
          display: "flex",
          alignItems: "center",
        }}
      >
        <AccountCircle sx={{ fontSize: 50, marginRight: 2 ,color: theme.palette.primary.light}} />
        <p style={{color: theme.palette.primary.light}}> {account.login}</p>
      </Box>
      <Body>
        <Card
          sx={{
            width: "52%",
            backgroundColor:theme.palette.background.default,
            color: theme.palette.neutral.dark,
            
          }}
        >
          <CardHeader
            style={{ backgroundColor:theme.palette.neutral.dark, color: theme.palette.background.default }}
            title="Informations"
          ></CardHeader>
          <CardContent>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              paddingTop="15px"
              direction={{
                xs: "column",
                sm: "column",
                lg: "row",
                md: "column",
              }}
            >
              {!clicked ? (
                <>
              <div style={{ paddingBottom: 15 }}>
              
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                      >
                        Nom
                      </Typography>
                      <Typography variant="body2" style={{ paddingBottom: 10 }}>
                        {account.firstName}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                      >
                        Prenom
                      </Typography>
                      <Typography variant="body2" style={{ paddingBottom: 10 }}>
                      {account.lastName}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                      >
                        Pseudo
                      </Typography>
                      <Typography variant="body2" >
                        {account.login}
                      </Typography>
                    
              
             
             
              </div>

              <div >
                
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                      >
                        Email
                      </Typography>
                      <Typography variant="body2" style={{ paddingBottom: 10 }}>
                      {account.email}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                      >
                        Role
                      </Typography>
                      <Typography variant="body2" style={{ paddingBottom: 10 }}>
                        {account.authorities}
                      </Typography>

                      {/* <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      fontWeight={600}
                    >
                      Adresse
                    </Typography>
                    <Typography variant="body2" style={{ paddingBottom: 10 }}>
                      {"Bejaia"}
                    </Typography> */}
                      

                    

                </div>
               
            

              </>

              )
              :

              <EditProfile style={{backgroundColor:theme.palette.background.default,
                color: theme.palette.neutral.dark,}}/>

               }
            </Stack>
            
          </CardContent>
          
        </Card>
        <Space space={20} />
        {!clicked ? (
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            size="medium"
            style={{
              backgroundColor:theme.palette.primary.light,
              color:theme.palette.background.default,
            
              float: "right",
            }}
            onClick={() => setclicked(true)}
          >
            Modifier
          </Button>
          
        ) : (
          <div style={{ float: "right" }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              size="medium"
              style={{ backgroundColor:theme.palette.primary.light,
                color:theme.palette.background.default,}}
              type="submit"
              // disabled={isSubmitting}
              sx={{ marginRight: 2 }}

            >
              Valider
            </Button>
            <Button
              variant="contained"
              endIcon={<CloseIcon />}
              size="medium"
              color="error"
              onClick={() => setclicked(false)}
            >
              Annuler
            </Button>
          </div>
          
        )}
        <Space space={20} />
      
      </Body>
    </Box>
  );
};

export {Profile};
