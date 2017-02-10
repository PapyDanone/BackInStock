export const SAVE_PRODUCT = 'product/SAVE_PRODUCT';
export const REMOVE_PRODUCT = 'player/REMOVE_PRODUCT';

export const saveProduct = product => {
    return {
        type: SAVE_PRODUCT,
        product
    };
};

export const removeProduct = index => {
    return {
        type: REMOVE_PRODUCT,
        index
    };
};