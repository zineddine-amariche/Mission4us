import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import Head from "../../components/Head";
import Body from "../../components/Body";
import Experience from "./components/experience";
import Space from "../../components/outils/Space";
import Formation from "./components/formations";
import Competence from "./components/competence";
import Hobies from "./components/hobie";
import Presentation from "./components/presentaion";
import { useLocation, useNavigate } from "react-router-dom";

const VisualiserCvProvider = () => {

  const location = useLocation();
  const state = location.state;

  const navigate = useNavigate();

  const onReturn = () => {
    navigate("/PageCv");
  };

  return (
    <>
      <Head title="Visualiser Curriculum Vitae" retur btn onReturn={onReturn} />
      <Body>
        <Stack>
          <Presentation state={state} />
          <Space space={20} />
          <Experience />
          <Space space={20} />
          <Formation />
          <Space space={20} />
          <Competence />
          <Space space={20} />
          <Hobies />
          {/* <Space space={20} />
          <SocialMedia/> */}
          <Space space={20} />
        </Stack>
      </Body>
    </>
  );
};

export {VisualiserCvProvider};
