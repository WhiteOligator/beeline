import styled from "@emotion/styled";
import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/cardReducer";
import { categoryList } from "../data/News";
import { AddExcelDialog } from "../components/AddExcelDialog";

const Block = styled(Container)({
  backgroundColor: "#fff",
  borderRadius: "5px",
  width: "100%",
  minHeight: "250px",
  padding: "20px",
  position: "static",
});

export const FilterExcelContainer = () => {
  const dispatch = useDispatch();

  const [categorys, setCategorys] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleChange = (value) => {
    if (value.length !== 0) {
      setCategorys(value);
      dispatch(setFilter(value));
    } else {
      setCategorys(value);
      dispatch(setFilter(categoryList));
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Block>
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        rowGap={10}
      >
        <Grid item xs={12}>
          <Autocomplete
            value={categorys}
            multiple
            fullWidth
            onChange={(_, value) => handleChange(value)}
            id="tags-standard"
            options={categoryList}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="standard"
                helperText="send category"
                label="Filter"
                placeholder="category"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth onClick={handleClickOpen}>
            Загрузить Excel файл
          </Button>
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle>
            <Typography variant="h5">Загрузка Excel</Typography>
          </DialogTitle>
          <DialogContent sx={{ width: "800px" }}>
            <Typography variant="h6">
              В шапке таблицы должны содержаться столбцы: Категория, Дата
              создания, Иконка, Заголовок, Картинка, Описание, Источник.
            </Typography>
            <AddExcelDialog setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </Grid>
    </Block>
  );
};
