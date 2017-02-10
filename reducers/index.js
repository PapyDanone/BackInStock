import { combineReducers } from "redux";
import * as types from "../actions";

const initialState = [
    {
        title: 'PS4 Pro',
        brand: 'Sony',
        thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/41GGPRqTZtL._SL160_.jpg',
        price: '$399.99',
        isAvailable: true,
        itemId: "B01LOP8EZC"
    },
    {
        title: 'Gravity Rush 2',
        brand: 'Sony',
        thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51ZY0kIkIgL._SL160_.jpg',
        price: '$58.99',
        isAvailable: false,
        itemId: "B01LOP8EZC"
    },
    {
        title: 'Ninja Turtles',
        brand: 'Sony',
        thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51p9zFaDMzL._SL160_.jpg',
        price: '$29.99',
        isAvailable: true,
        itemId: "B01LOP8EZC"
    },
];

const productReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.SAVE_PRODUCT:

            var amazonProduct = action.product;

            return [
                ...state,
                {
                    itemId: amazonProduct.ASIN,
                    title: amazonProduct.ItemAttributes.Title,
                    brand: amazonProduct.ItemAttributes.Brand,
                    thumbnail: amazonProduct.MediumImage.URL,
                    price: amazonProduct.ItemAttributes.ListPrice.FormattedPrice,
                    isAvailable: false
                }
            ];
        case types.REMOVE_PRODUCT:
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    productReducer,
});

export default rootReducer;
