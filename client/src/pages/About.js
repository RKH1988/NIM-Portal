import React from 'react';
import AboutComponent from "../components/About";
import BorderWrapper from "react-border-wrapper";

const About = () => {
  return (
    <BorderWrapper
      borderColour="#b66d35"
      borderWidth="5px"
      borderRadius="15px"
      borderType="solid"
      innerPadding="30px"
      // topElement={topElement}
      topPosition={0.05}
      topOffset="22px"
      topGap="4px"
      // rightElement={rightElement}
      rightPosition={0.1}
      rightOffset="22px"
      rightGap="4px"
      >
        <AboutComponent/>
    </BorderWrapper>
  );
};

export default About;