import { Box, CardContent, CardMedia } from "@mui/material";

import styled from "@emotion/styled";

import React from "react";

const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "90%",
  margin: "0",
});

const CardContantStyled = styled(CardContent)({
  flex: "1",
  rowGap: "10px",
  display: "flex",
  flexWrap: "wrap",
  margin: "0",
});

const FirstBox = styled("div")({
  margin: "0",
  width: "100%",
  height: "14px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
});

const SecondBox = styled(Box)({
  margin: "0",
  width: "100%",
  height: "26px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
});

const ThirdBox = styled(Box)({
  margin: "0",
  width: "100%",
  height: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
});

export const SkeletonCardLine = () => {
  return (
    <React.Fragment>
      <MainContainer>
        <CardContantStyled>
          <FirstBox />
          <SecondBox></SecondBox>
          <SecondBox></SecondBox>
          <ThirdBox></ThirdBox>
        </CardContantStyled>
      </MainContainer>
      <CardMedia
        component="img"
        sx={{
          maxWidth: 300,
          margin: "0",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      />
    </React.Fragment>
  );
};
