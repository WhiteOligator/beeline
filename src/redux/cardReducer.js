import { News, categoryList } from "../data/News";

export const DELETE_CARD = "DELETE_CARD";
export const LOAD_POST = "LOAD_POST";
export const SET_FILTER = "SET_FILTER";

export const initialState = {
  card: [
    News[1],
    News[0],
    News[2],
    News[2],
    News[0],
    News[1],
    News[2],
    News[1],
    News[0],
  ],
  categorys: categoryList,
};

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CARD:
      return {
        ...state,
        card: state.card.filter((_, index) => index !== action.index),
      };
    case LOAD_POST:
      return {
        ...state,
        card: [...state.card, ...action.news],
      };
    case SET_FILTER:
      return {
        ...state,
        categorys: action.categorys,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const loadPost = (news) => ({ type: LOAD_POST, news });
export const deleteCard = (index) => ({ type: DELETE_CARD, index });
export const setFilter = (categorys) => ({ type: SET_FILTER, categorys });

export const getCard = (state) => state.card.card;
export const getCategorys = (state) => state.card.categorys;
