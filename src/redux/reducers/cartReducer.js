import { LOAD_CART, TOGGLE_CART, ADD_PRODUCT, REMOVE_PRODUCT, ADD_QUANTITY, SUB_QUANTITY } from '../actions/actionTypes';

const initState = {
    products: [],
    addedItems: [],
    total: 0,
    isOpen: false
}

const CartReducer = (state = initState, action) => {

    //INSIDE HOME COMPONENT
    switch (action.type) {
        case ADD_PRODUCT: {
            let addedItem = state.products.find(item => item.id === action.payload.id)
            //check if the item exists in the addedItems
            let existed_item = state.addedItems.find(item => action.payload.id === item.id)
            if (existed_item) {
                addedItem.quantity += 1
                return {
                    ...state,
                    total: state.total + addedItem.price
                }
            }
            else {
                addedItem.quantity = 1;
                //calculating the total
                let newTotal = state.total + addedItem.price
                return {
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total: newTotal
                }
            }
        }
        case REMOVE_PRODUCT: {
            let itemToRemove = state.addedItems.find(item => action.payload.id === item.id)
            let new_items = state.addedItems.filter(item => action.payload.id !== item.id)
            //calculating the total
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
            console.log(itemToRemove)
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        case ADD_QUANTITY: {
            let addedItem = state.products.find(item => item.id === action.payload.id)
            addedItem.quantity += 1
            let newTotal = state.total + addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }
        case SUB_QUANTITY: {
            let addedItem = state.products.find(item => item.id === action.payload.id)
            //if the qt == 0 then it should be removed
            if (addedItem.quantity === 1) {
                let new_items = state.addedItems.filter(item => item.id !== action.payload.id)
                let newTotal = state.total - addedItem.price
                return {
                    ...state,
                    addedItems: new_items,
                    total: newTotal,
                    isOpen: true
                }
            }
            else {
                addedItem.quantity -= 1
                let newTotal = state.total - addedItem.price
                return {
                    ...state,
                    total: newTotal
                }
            }
        }
        case LOAD_CART: {
            return {
                ...state,
                products: action.payload
            };
        }
        case TOGGLE_CART: {
            return {
                ...state,
                isOpen: !state.isOpen
            };
        }
        default: return state;
    }
}

export default CartReducer;