import { useState } from "react";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import * as XLSX from "xlsx";

export const AddExcelDialog = ({
  // eslint-disable-next-line react/prop-types
  setOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const [chosenFile, setChoseFile] = useState(null);

  const list = {
    ["Заголовок"]: "title",
    ["Описание"]: "description",
    ["Источник"]: "source",
    ["Картинка"]: "image",
    ["Категория"]: "category",
    ["Дата создания"]: "published_at",
    ["Иконка"]: "icon",
  };

  const handleUploadButtonClick = async () => {
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const dataHead = data[0];
      const dataRow = [...data];
      dataRow.splice(0, 1);

      const headIndex = {
        ["title"]: 0,
        ["description"]: 0,
        ["source"]: 0,
        ["image"]: 0,
        ["category"]: 0,
        ["published_at"]: 0,
        ["icon"]: 0,
      };

      let counter = 0;
      for (let column of dataHead) {
        headIndex[list[column]] = counter;
        counter++;
      }

      let importNews = dataRow.map((el) => {
        return {
          title: el[headIndex["title"]],
          description: el[headIndex["description"]],
          source: el[headIndex["source"]],
          image: el[headIndex["image"]],
          category: el[headIndex["category"]],
          published_at: el[headIndex["published_at"]],
          icon: el[headIndex["icon"]],
        };
      });

      if (importNews) {
        let counter = 0;
        localStorage.clear();
        for (let news of importNews) {
          localStorage.setItem(counter, JSON.stringify(news));
          counter++;
        }
        setOpen(false);
      }
    };

    reader.readAsBinaryString(chosenFile);
    setLoading(false);
  };

  const onFileChange = (event) => {
    setChoseFile(event.target.files[0]);
  };

  return (
    <div
      style={{
        width: "90%",
        border: "2px solid #000",
        marginTop: "50px",
        padding: "10px",
      }}
    >
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <input
            color="primary"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            type="file"
            onChange={onFileChange}
            id="icon-button-file-1"
            style={{ display: "none" }}
          />
          <label htmlFor="icon-button-file-1">
            <Button
              variant="contained"
              size="small"
              component="span"
              color="primary"
              disabled={loading}
            >
              Выбрать файл
            </Button>
          </label>
        </Grid>
        <Grid item>
          <Typography>
            {chosenFile
              ? `Выбран файл "${chosenFile.name}"`
              : "Выберите файл для загрузки"}
          </Typography>
        </Grid>
        <Grid item>{loading && <LinearProgress />}</Grid>
      </Grid>
      <Grid container justifyContent={"flex-end"}>
        <Grid item>
          <Button onClick={handleUploadButtonClick} disabled={!chosenFile}>
            Загрузить
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
