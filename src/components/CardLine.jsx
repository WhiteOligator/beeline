import { Box, Card, CardContent, CardMedia } from "@mui/material";
import { News } from "../data/News";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import React from "react";
import { SkeletonCardLine } from "./SkeletonCardLine";



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
});

const FirstBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  margin: "0",
  width: "100%",
});


const SecondBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  textAlign: "start",
  margin: "0",
});

const ThirdBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  margin: "0",
  width: "100%",
});

const IconBlock = styled(Box)({
  display: "flex",
  margin: "0",
  width: "40%",
  columnGap: "10px",
});

const PSource = styled('p')({
  fontFamily: 'Roboto',
  fontWeight: 900,
  fontSize: '18px',
  margin: '0',
})


const PTitle= styled('p')({
  fontFamily: 'Roboto',
  fontWeight: 900,
  fontSize: '24px',
  margin: '0'
})

const PDesciption= styled('p')({
  fontFamily: 'Roboto',
  fontWeight: 100,
  fontSize: '14px',
  margin: '0',
  color: 'gray'
})

const PCategoryAvtorDate= styled('p')({
  fontFamily: 'Roboto',
  fontWeight: 900,
  fontSize: '14px',
  margin: '0',
})


export const CardLine = (props) => {

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })
  // eslint-disable-next-line react/prop-types
  const {icon, source, published_at, title, description, author, category, image} = props;

  return (
      <Card
        ref={ref}
        sx={{ display: "flex", justifyContent: "space-between", minHeight: 250 }}
      > 
      {inView && props ? 
        <React.Fragment>
        <MainContainer>
          <CardContantStyled>
            <FirstBox>
              <IconBlock>
                <img
                  style={{ maxWidth: "24px", maxHeight: "24px", margin: "0" }}
                  src={icon}
                />
                <PSource>{source}</PSource>
              </IconBlock>
              <PCategoryAvtorDate>{published_at}</PCategoryAvtorDate>
            </FirstBox>
            <SecondBox>
              <PTitle variant="h7">{title}</PTitle>
            </SecondBox>
            <SecondBox>
              <PDesciption variant="h7">{description}</PDesciption>
            </SecondBox>
            <ThirdBox>
              <PCategoryAvtorDate variant="h8">
                Author: {author}, {News[0].source}
              </PCategoryAvtorDate>
              <PCategoryAvtorDate variant="h8">Category: {category}</PCategoryAvtorDate>
            </ThirdBox>
          </CardContantStyled>
        </MainContainer>
        <CardMedia
          component="img"
          sx={{ maxWidth: 300, margin: "0"}}
          image={image}
        />
        </React.Fragment>
        :
        <SkeletonCardLine />
        } 
      </Card>
  );
};
