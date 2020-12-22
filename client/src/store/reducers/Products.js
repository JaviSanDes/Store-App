import {
    LOADING_ERROR,
    LOADING_IN_PROGRESS,
    SET_PRODUCTS,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    ELIMINATE_PRODUCT,
    RESET_NOTIFICATIONS,
    REMOVE_ALL_PRODUCTS,
} from '../actionTypes';

const initialState = {
    isLoading: false,
    hasErrored: false,
    products: [],
    order: [],
    newProducts: 0,
    totalPrice: 0,
};

const setProducts = (state, action) => {
    const products = state.products.map(product => ({ ...product })); // CLONE ARRAY OF OBJECTS
    const newProducts = action.products;
    Object.values(newProducts).forEach(newProduct => {
        if (!products.some(product => product._id === newProduct._id))
            products.push({ ...newProduct });
    });
    return {
        ...state,
        isLoading: false,
        products: [...products],
    };
};

const addProduct = (state, action) => {
    const products = state.products.map(product => ({ ...product })); // CLONE ARRAY OF OBJECTS
    const order = [...state.order];
    const newProducts = state.newProducts + 1;
    let { totalPrice } = state;
    products.map(product => {
        if (product._id === action.productId) {
            totalPrice += product.price;
            product.quantity += 1;
            if (!order.includes(product._id)) order.push(product._id);
        }
        return null;
    });
    return {
        ...state,
        products,
        order,
        newProducts,
        totalPrice,
    };
};

const removeProduct = (state, action) => {
    const products = state.products.map(product => ({ ...product }));
    let order = [...state.order];
    const newProducts = state.newProducts - 1;
    let { totalPrice } = state;
    products.map(product => {
        if (product._id === action.productId) {
            if (product.quantity > 0) {
                product.quantity -= 1;
                totalPrice -= product.price;
            }
            if (product.quantity <= 0) {
                order = order.filter(id => id !== product._id);
            }
        }
        return null;
    });
    return {
        ...state,
        products,
        order,
        newProducts,
        totalPrice,
    };
};

const eliminateProduct = (state, action) => {
    const products = state.products.map(product => ({ ...product }));
    let order = [...state.order];
    let { totalPrice } = state;
    products.map(product => {
        if (product._id === action.productId) {
            totalPrice -= product.price * product.quantity;
            product.quantity = 0;
            order = order.filter(id => id !== product._id);
        }
        return null;
    });
    return {
        ...state,
        products,
        order,
        totalPrice,
    };
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_ERROR:
            return {
                ...state,
            };
        case LOADING_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case SET_PRODUCTS:
            return setProducts(state, action);
        case ADD_PRODUCT:
            return addProduct(state, action);
        case REMOVE_PRODUCT:
            return removeProduct(state, action);
        case ELIMINATE_PRODUCT:
            return eliminateProduct(state, action);
        case RESET_NOTIFICATIONS:
            return {
                ...state,
                newProducts: 0,
            };
        case REMOVE_ALL_PRODUCTS:
            return {
                ...state,
                order: [],
            };
        default:
            return state;
    }
};

export default productReducer;
