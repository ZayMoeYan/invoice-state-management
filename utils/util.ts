import {InvoiceData} from "@/lib/features/invoice/invoiceSlice";

export function getTotal(list: InvoiceData[]) {
    let total = 0;
    list.reduce((sum, cur) => {
        sum += cur.qty * cur.price;
        total = sum;
        return total;
    }, 0)
    return total;
}