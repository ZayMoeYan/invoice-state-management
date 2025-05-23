'use client';
import {TableCell, TableRow} from "@/components/ui/table";
import { format, parse } from "date-fns"

import {InvoiceState} from "@/lib/features/invoice/invoiceSlice";

import { useState} from "react";
import InvoiceDetail from "@/app/invoices/components/InvoiceDetail";
import {getTotal} from "@/utils/util";

interface Props {
    invoice: InvoiceState
}



export default function Invoice({ invoice }: Props) {

    return (
        <TableRow>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>
                {
                    getTotal(invoice.data)
                }
            </TableCell>
            <TableCell>
                <InvoiceDetail invoice={invoice}/>
            </TableCell>
        </TableRow>
    );
}