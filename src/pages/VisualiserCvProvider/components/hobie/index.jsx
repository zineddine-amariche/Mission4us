import { Box, Stack, Divider, useTheme, Chip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Space from "../../../../components/outils/Space";
import { PrimaryText } from "../../../../components/utils/typography";

const Hobies = () => {
  const theme = useTheme();

  const { loisirs } = useSelector((state) => state.cvs);

  const data = [
    { nom: "Sport" },
    { nom: "Musique" },
    { nom: "Voyage" },
    { nom: "Cinema" },
  ];

  return loisirs.length ? (
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
          text={"Hobbies"}
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
        {loisirs.map((i, index) => {
          let item = data[index];
          return <RenderItem item={item} i={i} index={index} />;
        })}
      </Stack>
    </>
  ) : null;
};

export default Hobies;

const RenderItem = ({ index, i, item }) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        display: "flex",

        flex: "1 1 20%",
      }}
      key={index}
    >
      <Chip
        label={item.nom}
        sx={{
          bgcolor: theme.palette.primary.light,
          fontSize: 18,
          p: 3,
        }}
      />
    </Stack>
  );
};

// import { Box, Stack, Divider, useTheme, Chip } from "@mui/material";
// import React from "react";
// import { useSelector } from "react-redux";
// import Space from "../../../../components/outils/Space";
// import { PrimaryText } from "../../../../components/utils/typography";

// const Hobies = () => {
//   const theme = useTheme();

//   const { loisirs } = useSelector((state) => state.cvs);

//   return (
//     <>
//       <Stack
//         component={"div"}
//         sx={{
//           width: "100%",
//           p: 4,
//           bgcolor: theme.palette.background.default,
//           borderRadius: 3,
//           justifyContent: "center",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <PrimaryText
//           fontWeight={"600"}
//           fontSize={"35px"}
//           text={"Hobbies"}
//           color={theme.palette.primary.light}
//         />
//       </Stack>
//       <Space space={15} />
//       <Stack
//         sx={{
//           display: "flex",
//           gap: 5,
//           justifyContent: "center",
//           flexWrap: "wrap",
//           width: "100%",
//           p: 3,
//           bgcolor: theme.palette.background.default,
//           // border:`2px solid ${theme.palette.primary.light}`,
//           borderRadius: 6,
//         }}
//         direction={{
//           xs: "column",
//           sm: "column",
//           lg: "row",
//           md: "column",
//         }}
//       >
//         {loisirs.map((i, index) => {
//           return <RenderItem item={i} key={index} />;
//         })}
//       </Stack>
//     </>
//   ) ;
// };

// export default Hobies;

// const RenderItem = ({item }) => {
//   const theme = useTheme();

//   return (
//     <Stack
//       sx={{
//         display: "flex",

//         flex: "1 1 20%",
//       }}

//     >
//       <Chip
//         label={item.label.hobbies}
//         sx={{
//           bgcolor: theme.palette.primary.light,
//           fontSize: 18,
//           p: 3,
//         }}
//       />
//     </Stack>
//   );
// };
