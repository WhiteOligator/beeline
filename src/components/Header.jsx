import { styled } from "@mui/system";

const HeaderSection = styled("section")({
  width: "100%",
  height: "50px",
  backgroundColor: "yellow",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  position: "fixed",
  zIndex: 1000,
});

const Text = styled("h1")({
  color: "#000",
});

export const Header = () => {
  return (
    <HeaderSection>
      <Text>Бесконечный скролл Beeline</Text>
    </HeaderSection>
  );
};
