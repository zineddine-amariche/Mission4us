import { Box, Stack, Divider, useTheme, Chip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Space from "../../../../components/outils/Space";
import { PrimaryText } from "../../../../components/utils/typography";

const SocialMedia = () => {
  const theme = useTheme();

  const { Rsociaux } = useSelector((state) => state.cvs);

  return (
    Rsociaux.lenght?
    <>
      <Stack
        component={"div"}
        sx={{
          width: "100%",
          p: 4,
          bgcolor: theme.palette.background.default,
          borderRadius: 3,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <PrimaryText
          fontWeight={"600"}
          fontSize={"35px"}
          text={"Réseaux Sociaux"}
          color={theme.palette.primary.light}
        />
      </Stack> 
      <Space space={15} />
      <Stack
        sx={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          p: 3,
          bgcolor: theme.palette.background.default,
          // border:`2px solid ${theme.palette.primary.light}`,
          borderRadius: 6,
        }}
        direction={{
          xs: "column",
          sm: "column",
          lg: "row",
          md: "column",
        }}
      >
        {Rsociaux.map((i, index) => {
          return <RenderItem item={i} key={index} />;
        })}
      </Stack>
    </>
    : null
  ) ;
};

export default SocialMedia;

const RenderItem = ({item }) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        display: "flex",

        flex: "1 1 20%",
      }}
      
    >
      <Chip
        label={item.label.reseaux}
        sx={{
        border: `1px solid ${theme.palette.primary.light}`,
        color:theme.palette.primary.light,
        fontSize: 18,
        p: 3,
        }}
      />
    </Stack>
  );
};
