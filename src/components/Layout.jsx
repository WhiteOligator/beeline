import { FilterExcelContainer } from "../container/FilterExcelContainer";
import { Header } from "./Header";
import { Grid } from "@mui/material";

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
  return (
    <Grid
      container
      direction={"row"}
      rowGap={12}
      justifyContent={"center"}
      columnGap={4}
    >
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={3}>
        <FilterExcelContainer />
      </Grid>
      <Grid item xs={7}>
        {children}
      </Grid>
    </Grid>
  );
};
