import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import authReducer from "./Auth/Reducer";
import { thunk } from "redux-thunk";
import categoryReducer from "./Customers/Category/Reducer";
import productsReducer from "./Customers/Product/ProductReducer";
import { cartReducer } from "./Customers/Cart/Reducer";
import { orderReducer } from "./Customers/Order/Reducer";
import paymentReducer from "./Customers/Payment/Reducer";
import variantsReducer from "./Customers/Product/VariantReducer";
import adminOrderReducer from "./Admin/Orders/Reducer";
// import customerProductReducer from "./Customers/Product/Reducer";
// import productReducer from "./Admin/Product/Reducer";
// import cartReducer from "./Customers/Cart/Reducer";
// import { orderReducer } from "./Customers/Order/Reducer";
// import adminOrderReducer from "./Admin/Orders/Reducer";
// import ReviewReducer from "./Customers/Review/Reducer";





const rootReducers=combineReducers({

    auth:authReducer,
    category: categoryReducer, 
    products: productsReducer,
    variants:variantsReducer,
    cart: cartReducer,
    order:orderReducer,
    payment:paymentReducer,
 
    // customersProduct:customerProductReducer,
    // cart:cartReducer,
    // order:orderReducer,
    // review:ReviewReducer,

    // admin
    // adminsProduct:productReducer,
    adminsOrder:adminOrderReducer,


});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))
