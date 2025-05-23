import {createAppSlice} from "@/lib/createAppSlice";
import {PayloadAction, ReducerCreators} from "@reduxjs/toolkit";
import {InvoiceData} from "@/lib/features/invoice/invoiceSlice";


type ItemSliceState = {
    items: InvoiceData[],
};

const initialState: ItemSliceState = {
    items: [],
}

export const itemSlice = createAppSlice({
    name: 'items',
    initialState,
    reducers: (create: ReducerCreators<ItemSliceState>) => ({
        addItem: create.reducer((state, action: PayloadAction<InvoiceData>) => {
            state.items.push(action.payload);
        }),
        updateItem: create.reducer((state, action: PayloadAction<InvoiceData>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
        }),
        deleteItem: create.reducer((state, action: PayloadAction<InvoiceData>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }),
        resetItems: create.reducer((state, action) => {
            state.items = [];
        })
    }),
    selectors: {
        selectItems: (state) => state.items,
    }
})

export const { addItem, updateItem, deleteItem, resetItems } = itemSlice.actions;
export const { selectItems } = itemSlice.selectors;