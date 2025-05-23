'use client';
import {useAppSelector} from "@/lib/hooks";
import {selectInvoices} from "@/lib/features/invoice/invoiceSlice";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Invoice from "@/app/invoices/components/Invoice";



export default function InvoiceList() {

    const invoices = useAppSelector(selectInvoices);

    return (
        <div className='w-[50%]'>
            <Table>
                <TableCaption>A list of your invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                        {
                            invoices.map((invoice,index) => (
                               <Invoice key={index} invoice={invoice} />
                            ))
                        }
                </TableBody>
            </Table>
        </div>
    );
}