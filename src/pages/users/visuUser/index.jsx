
import React, { useState } from 'react'
import { Box, Typography, useTheme,Stack, Badge } from "@mui/material";
import Head from "../../../components/Head";
import Body from '../../../components/Body';
import { Formik,Field , } from "formik";
import { TextField } from '@material-ui/core';
import InputFeilds from "../../../components/outils/InputFeilds";
import Space from "../../../components/outils/Space";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import * as Yup from 'yup'
import RowBox from '../../../components/RowBox';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import SelectMenue from '../../../components/outils/SelectMenue';
import { Person2Outlined } from "@mui/icons-material";

const options = [
  // { value: '', label: '' },
  { value: 'user1', name: 'Fournisseur' },
  { value: 'user2', name: 'Client' },
]


const VisuUser = ({open,onClose}) => {
  const theme = useTheme();

  const shapeStyles = {
    bgcolor: theme.palette.background.default,
    width: 80,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    
  };

  const shapeCircleStyles = { borderRadius: "50%" };
  const circle = (
    <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }}>
      <Person2Outlined
        sx={{ fontSize: 60, color: theme.palette.primary.dark }}
      />
    </Box>
  );


  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
       
      }}
    >
      <div style={{display:'flex', alignItems:'center', padding:'20px 0 20px 20px',backgroundColor:theme.palette.background.default, color: theme.palette.primary.light,}}>
      <Tooltip title="Fermer">
      <Box onClick={onClose}><CloseIcon/></Box>
       </Tooltip>            
      <Typography  variant={"h4"} style={{paddingLeft:15}}> Fiche utilisateur{" "}</Typography>
      

      </div>
      
      <Body >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        fontWeight={600}
        style={{ 
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
        height:50,
        borderRadius:10,
        padding:15,
        marginBottom:20
            }}
        >
        Infos
     </Typography>
     {/* <div style={{
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
     }}>
     <Badge overlap="circular">{circle}</Badge>
     </div> */}
      
      
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
                
              <div style={{ paddingBottom: 15}}>
                
                 
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                        style={{ color: theme.palette.neutral.dark, }}
                      >
                        Type
                      </Typography>
                      <Typography variant="body2" style={{ paddingBottom: 10,color: theme.palette.neutral.dark, }}>
                        {"Fournisseur"}
                      </Typography>
                    
                
               
                
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                        style={{ color: theme.palette.neutral.dark,}}
                      >
                        Nom Complet
                      </Typography>
                      <Typography variant="body2" style={{ paddingBottom: 10 ,color: theme.palette.neutral.dark,}}>
                        {"John Dev"}
                      </Typography>
                   
                
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                        style={{ color: theme.palette.neutral.dark,}}
                      >
                        N° téléphone
                      </Typography>
                      <Typography variant="body2" style={{ paddingBottom: 10 ,color: theme.palette.neutral.dark,}}>
                        {"0782305080"}
                      </Typography>

                      <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      fontWeight={600}
                      style={{ color: theme.palette.neutral.dark,}}
                    >
                      Adresse
                    </Typography>
                    <Typography variant="body2" style={{ paddingBottom: 10,color: theme.palette.neutral.dark, }}>
                      {"Bejaia"}
                    </Typography>
                    
                
              </div>
              <div style={{ paddingBottom: 15 }}>
               
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                        style={{ color: theme.palette.neutral.dark,}}
                      >
                        Compte Bancaire
                      </Typography>
                      <Typography variant="body2" style={{ paddingBottom: 10 ,color: theme.palette.neutral.dark,}}>
                        {"194160200557133yt"}
                      </Typography>
             
               
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                        style={{ color: theme.palette.neutral.dark,}}
                      >
                        Registre de commerce
                      </Typography>
                      <Typography variant="body2" style={{ paddingBottom: 10,color: theme.palette.neutral.dark, }}>
                        {"9 A 4958163-00/16"}
                      </Typography>
             
               
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      fontWeight={600}
                      style={{ color: theme.palette.neutral.dark,}}
                    >
                      NIS
                    </Typography>
                    <Typography variant="body2" style={{ paddingBottom: 10 ,color: theme.palette.neutral.dark,}}>
                      {"9 A 4958163-00"}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      fontWeight={600}
                      style={{ color: theme.palette.neutral.dark,}}
                    >
                      NIF
                    </Typography>
                    <Typography variant="body2" style={{ paddingBottom: 10 ,color: theme.palette.neutral.dark,}}>
                      {"s4958163-00"}
                    </Typography>
               
               
              </div>
            </Stack>
    
      
      </Body>
    </Box>
  )
}

export default VisuUser