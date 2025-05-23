import {createAppSlice} from "@/lib/createAppSlice";
import {PayloadAction, ReducerCreators} from "@reduxjs/toolkit";
import {dummyInvoices} from "@/utils/dummy";
import {act} from "react-dom/test-utils";

export interface InvoiceData {
    id?: string,
    name: string,
    qty: number,
    price: number
}

export type InvoiceState = {
    id?: string
    description: string,
    date: string,
    data: InvoiceData[],
}

type InvoiceSliceState = {
    invoices: InvoiceState[],
    status: 'loading' | 'completed' | 'rejected'
};

const initialState: InvoiceSliceState = {
    invoices: dummyInvoices,
    status: 'loading'
}

export const invoiceSlice = createAppSlice({
    name: 'invoice',
    initialState,
    reducers: (create: ReducerCreators<InvoiceSliceState>) => ({
        addInvoice: create.reducer((state, action: PayloadAction<InvoiceState>) => {
            state.invoices.push(action.payload);
        }),
        updateInvoice: create.reducer((state, action: PayloadAction<InvoiceState>) => {
            state.invoices = state.invoices.map(item => item.id === action.payload.id ? action.payload : item);
        }),
        deleteInvoice: create.reducer((state, action: PayloadAction<InvoiceState>) => {
            state.invoices = state.invoices.filter(item => item.id !== action.payload.id);
        }),

    }),
    selectors: {
        selectInvoices: (state) => state.invoices,
        selectStatus: (state) => state.status
    }
})

export const { addInvoice, updateInvoice, deleteInvoice } = invoiceSlice.actions;
export const { selectInvoices, selectStatus } = invoiceSlice.selectors;