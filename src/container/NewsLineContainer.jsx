import { Container, Grid } from "@mui/material";
import { CardLine } from "../components/CardLine";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCard,
  getCard,
  getCategorys,
  loadPost,
} from "../redux/cardReducer";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { memo, useEffect } from "react";
import { News } from "../data/News";

export const NewsLineContainer = memo(function NewsLine() {
  const dispatch = useDispatch();
  const card = useSelector(getCard);
  const categorys = useSelector(getCategorys);

  useEffect(() => {
    document.addEventListener("scroll", throttle(checkPosition, 500));
    document.addEventListener("resize", throttle(checkPosition, 500));

    return () => {
      document.removeEventListener("scroll", throttle(checkPosition, 500));
      document.removeEventListener("resize", throttle(checkPosition, 500));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (index) => {
    dispatch(deleteCard(index));
  };

  function checkPosition() {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;

    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 5;

    const position = scrolled + screenHeight;
    const newsRandom = [
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 3),
    ].map((el) => News[el]);

    if (position >= threshold) {
      let news = [];
      if (localStorage.length !== 0) {
        for (let [key, value] of Object.entries(localStorage)) {
          if (news.length < 4) {
            news.push(JSON.parse(value));
            localStorage.removeItem(key);
          } else break;
        }
        dispatch(loadPost(news));
      } else {
        dispatch(loadPost(newsRandom));
      }
    }
  }

  function throttle(callee, timeout) {
    let timer = null;

    return function perform(...args) {
      if (timer) return;

      timer = setTimeout(() => {
        callee(...args);

        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  return (
    <Container maxWidth="md">
      <Grid container direction={"column"} spacing={3}>
        {categorys &&
          card &&
          card
            .filter((news) => categorys.includes(news.category))
            .map((news, index) => (
              <Grid key={`post-${index}`} item container direction={"row"}>
                <Grid item xs={11}>
                  <CardLine {...news} />
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleDelete(index)}>
                    <HighlightOffIcon style={{ color: "red" }} />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
});
