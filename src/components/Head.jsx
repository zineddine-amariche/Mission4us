import React from "react";
import { Box, Tooltip, useTheme } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import { Stack } from "@mui/system";
import Space from "./outils/Space";
import FlexBetween from "./FlexBetween";
const Head = ({ title, retur, btn, onReturn }) => {
  const theme = useTheme();
  const handleShareResume = () => {
    // Use the 'navigator.share()' API to share the resume
    if (navigator.share) {
      navigator
        .share({
          title: "My Resume",
          text: "Check out my resume!",
          url: "https://example.com/my-resume.pdf",
        })
        .then(() => console.log("Resume shared successfully"))
        .catch((error) => console.error("Error sharing resume:", error));
    } else {
      console.log("Web Share API not supported on this browser");
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "25px",
          color: theme.palette.primary.light,
          fontSize: "22px",
          backgroundColor: theme.palette.background.default,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            textDecoration: retur ? "underline" : "none",
          },
        }}
        onClick={onReturn}
      >
        {retur ? (
          <ChevronLeft sx={{ color: theme.palette.primary.light }} />
        ) : null}

        {title}
        {/* <Space space={"20px"} /> */}
      </Box>
      {btn ? (
        <>
          <Tooltip title="Partager sur Facebook" style={{ marginLeft: 20 }}>
            <FacebookShareButton
              url={"https://example.com/my-resume.pdf"}
              quote={"Check out my resume!"}
              hashtag={"#resume"}
              onClick={handleShareResume}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Tooltip>

          <Tooltip title="Partager sur Twitter">
            <TwitterShareButton
              url={"https://example.com/my-resume.pdf"}
              title={"My Resume"}
              hashtags={["resume"]}
              onClick={handleShareResume}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </Tooltip>

          <Tooltip title="Partager sur Linkedin">
            <LinkedinShareButton
              url={"https://example.com/my-resume.pdf"}
              title={"My Resume"}
              summary={"Check out my resume!"}
              source={"My Website"}
              onClick={handleShareResume}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </Tooltip>
        </>
      ) : null}
    </>
  );
};

export default Head;
