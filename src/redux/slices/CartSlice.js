const {createSlice} = require('@reduxjs/toolkit');

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToCart(state, action) {
      const existingItem = state.data.find(item => item.id === action.payload.id);
    
      if (existingItem) {
        state.data = state.data.map(item =>
          item.id === existingItem.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.data = [...state.data, { ...action.payload, qty: 1 }];
      }
    },
    
    reduceItemFromCart(state, action) {
      let tempData = state.data;

      tempData.map(item => {
        if (item.id == action.payload.id) {
          item.qty = item.qty - 1;
        }
      });

      state.data = tempData;
    },
    removeItemFromCart(state, action) {
      let tempData = state.data;
      tempData.splice(action.payload, 1);

      state.data = tempData;
    },
    emptyCart(state, action) {
      state.data = action.payload;
    },
    updateItemQuantity(state, action) {
      const { id, qty } = action.payload;
      const existingItem = state.data.find(item => item.id === id);

      if (existingItem) {
        state.data = state.data.map(item =>
          item.id === existingItem.id ? { ...item, qty } : item
        );
      }
    },
  },
  
});




export const {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
  emptyCart,
  updateItemQuantity
} = CartSlice.actions;
export default CartSlice.reducer;
