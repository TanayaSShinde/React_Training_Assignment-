import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Product type
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Cart item type
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  paymentDialogOpen: boolean;
}

const initialState: CartState = {
  items: [],
  paymentDialogOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    openPaymentDialog: (state) => {
      state.paymentDialogOpen = true;
    },
    closePaymentDialog: (state) => {
      state.paymentDialogOpen = false;
      state.items = []; // Clear cart when payment is done
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  clearCart, 
  openPaymentDialog, 
  closePaymentDialog 
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectPaymentDialogOpen = (state: { cart: CartState }) => state.cart.paymentDialogOpen;
export const selectTotalItems = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
