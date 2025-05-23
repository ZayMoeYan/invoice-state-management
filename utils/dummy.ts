import {InvoiceState} from "@/lib/features/invoice/invoiceSlice";
import {string} from "prop-types";

export const dummyInvoices: InvoiceState[] = [
    {
        id: '1',
        description: 'to send MDY',
        date: '13/08/2024',
        data : [
            {
                id: '1',
                name: 'Keyboard',
                qty: 3,
                price: 50000,
            },
            {
                id: '2',
                name: 'Mouse',
                qty: 2,
                price: 20000,
            },
            {
                id: '3',
                name: 'SSD',
                qty: 1,
                price: 220000,
            },
            {
                id: '4',
                name: 'Charger',
                qty: 3,
                price: 10000,
            },
        ],
    }
]