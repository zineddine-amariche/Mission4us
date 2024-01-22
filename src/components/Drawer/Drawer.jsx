// import React from "react";
// import PropTypes from "prop-types";
// import styles from "./Drawer.module.css";
// import { changeAnchor } from "../../helpers/change-anchor";

// const Drawer = (props) => {
//   const { open, anchor, onClose } = props;
//   const {
//     drawer,
//     animate,
//     hidden,
//     overlay,
//     overlayOpen,
//     overlayHidden,
    
//   } = styles;

//   return (
//     <>
//       <div
//         className={`${overlay} ${!open && overlayHidden} ${
//           open && overlayOpen
//         }`}
//         onClick={onClose}
//         aria-hidden="true"
//       />
//       <div
//         tabIndex="-1"
//         className={`${drawer} ${open && animate} ${
//           !open && hidden
//         } ${changeAnchor(anchor,styles)}`}
//       >
//         {props.children}
//         {/* <div className={header} /> */}
//       </div>
//     </>
//   );
// };

// Drawer.propTypes = {
//   open: PropTypes.bool.isRequired,
//   anchor: PropTypes.string.isRequired,
//   // onClose: PropTypes.func.isRequired
// };
// export default Drawer

import React from "react";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material";

;

const DrawerInfo = (props) => {
  const theme = useTheme();
  const { open, anchor, onClose ,children} = props;
  return (
    <div>
      <React.Fragment>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.background.paper,
              color: "#ffff",
              //theme.palette.primary[100] generates an error
              width: 420,
            },
          }}
          anchor={anchor}
          open={open}
          // onClose={handleCloseDrawer}
        >
          {children}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default DrawerInfo;
