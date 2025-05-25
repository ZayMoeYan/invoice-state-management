'use client';
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon, XIcon} from "lucide-react";
import {format, parse} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {deleteInvoice, InvoiceData, InvoiceState, updateInvoice} from "@/lib/features/invoice/invoiceSlice";
import {getTotal} from "@/utils/util";
import {ChangeEvent, useState} from "react";
import InvoiceDetailData from "@/app/invoices/components/InvoiceDetailData";
import {useAppDispatch} from "@/lib/hooks";
import InvoiceInput from "@/app/invoices/components/InvoiceInput";
import InvoiceItem from "@/app/invoices/components/InvoiceItem";

interface Props {
    invoice: InvoiceState
}

export default function InvoiceDetail({ invoice }: Props ) {

    const [invoiceToUpdate, setInvoiceToUpdate] = useState(invoice);
    const [editMode, setEditMode] = useState(false);
    const [date, setDate] = useState<Date>(parse(invoice.date, 'dd/MM/yyyy', new Date()));
    const dispatch = useAppDispatch();

    const onInvoiceUpdateHandler = () => {
        setEditMode(!editMode);
        if(editMode) {
            const toUpdateInvoice = {
                ...invoiceToUpdate,
                date: format(date!, 'dd/MM/yyyy')
            }
            dispatch(updateInvoice(toUpdateInvoice));
        }
    }

    const onInvoiceDeleteHandler = () => {
        dispatch(deleteInvoice(invoice));
    }

    const onDateSelectHandler = (selectedDate: Date | undefined) => {
        setDate(selectedDate!);
    }

    const onItemUpdateHandler = (itemToUpdate: InvoiceData) => {
        const newData = invoiceToUpdate.data.map(item => item.id === itemToUpdate.id ? itemToUpdate : item);
        const updateInvoice = {
            ...invoiceToUpdate,
            data: newData
        }
        setInvoiceToUpdate(updateInvoice);
    }

    const onItemDeleteHandler = (itemToDelete: InvoiceData) => {
        const newData = invoiceToUpdate.data.filter(item => item.id !== itemToDelete.id);
        const updateInvoice = {
            ...invoiceToUpdate,
            data: newData
        }
        setInvoiceToUpdate(updateInvoice);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>)  => {
        const name = event.target.name;
        const updateInvoice = {
            ...invoiceToUpdate,
            [name] : event.target.value,
        }
        setInvoiceToUpdate(updateInvoice);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type={"button"} className={"cursor-pointer border font-bold rounded px-3 py-1"}>Details</button>
            </DialogTrigger>
            <DialogContent className={'w-200'}>
                <DialogHeader className={'flex flex-row justify-between'} >
                    <DialogTitle >Invoice Details</DialogTitle>
                    <DialogClose>
                        <XIcon className={'cursor-pointer'} />
                    </DialogClose>
                </DialogHeader>
                <form>
                    <div className={"flex flex-row justify-between items-center"}>
                        <div>
                            <label htmlFor="description">Description</label> <br/>
                            {
                                !editMode ? <div className={'border px-3 py-1 rounded w-50'}>{invoice.description}</div>
                                    : <input type={'text'} id={'description'}
                                             name={'description'}
                                             className={'border px-3 py-1 rounded'}
                                             onChange={onChangeHandler}
                                             value={invoiceToUpdate.description}/>
                            }
                        </div>
                        <div>
                            <label htmlFor="date">Date</label><br/>
                            {
                                !editMode ?  <div className={'border px-3 py-1 rounded w-50'}>{invoice.date}</div> :
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button
                                                type={'button'}
                                                className={'px-3 cursor-pointer py-1 border w-60 flex items-center rounded'}
                                            >
                                                <CalendarIcon className={'me-3'}/>
                                                {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={onDateSelectHandler}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                            }
                        </div>
                    </div>
                    <div className={'mt-2'}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    invoiceToUpdate.data.map(item =>
                                        (<InvoiceDetailData
                                            key={item.id}
                                            item={item}
                                            edit={editMode}
                                            onUpdate={onItemUpdateHandler}
                                            onDelete={onItemDeleteHandler}
                                        />))
                                }

                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell>{getTotal(invoiceToUpdate.data)}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                    <div className={'mt-3 text-end'}>
                        <button type={'button'}
                                className={'px-2 py-1 border cursor-pointer me-2'}
                                onClick={onInvoiceUpdateHandler}
                        >{!editMode ? 'Edit' : 'Update'}
                        </button>
                        <DialogClose asChild >
                            <button type={'button'}
                                    className={'px-2 py-1 border cursor-pointer'}
                                    onClick={onInvoiceDeleteHandler}
                            >Delete
                            </button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
