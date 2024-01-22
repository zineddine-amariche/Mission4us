import React from "react";
import Form0 from "./Form0";
import Form1 from "./Form1";
import Form2 from "./Form2";

export default function MultiForm({ mode, changeMode }) {
  const renderScene = (mode) => {
    switch (mode) {
      case 1:
        return <Form0 changeMode={changeMode} />;
      case 2:
        return <Form1 changeMode={changeMode} />;
      case 3:
        return <Form2 changeMode={changeMode} />;
    }
  };

  return <>{renderScene(mode)}</>;
}
