'use client';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {ChangeEvent, useState} from "react";
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addItem, resetItems, selectItems} from "@/lib/features/invoice/itemSlice";
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import InvoiceItem from "@/app/invoices/components/InvoiceItem";
import {addInvoice, InvoiceData, InvoiceState} from "@/lib/features/invoice/invoiceSlice";


const ItemSchema =  yup.object({
    name: yup.string().required('Name is required.'),
    qty: yup.number().typeError('Year is required.').positive('Must be a positive number.'),
    price: yup.number().typeError('Price is required.').positive('Must be a positive number.'),
})

export default function InvoiceInput() {

    const { register, reset, formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(ItemSchema)
    });
    const items = useAppSelector(selectItems);
    const [date, setDate] = useState<Date>();
    const [desc, setDesc] = useState('');
    const [firstSave, setFirstSave] = useState(false);
    const dispatch = useAppDispatch();

    const onSelectHandler = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
    }

    const onSubmitHandler = (data: any) => {
        data = {
            ...data,
            id: crypto.randomUUID(),
        }
        dispatch(addItem(data));
        reset();
    }

    const onDescChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    }

    const onSaveHandler = () => {
        if(!desc || !date || !items.length) {
            setFirstSave(true);
        }else {
            setFirstSave(false);
            const invoiceToSave: InvoiceState = {
                id: crypto.randomUUID(),
                description: desc,
                date: format(date!, 'dd/MM/yyyy'),
                data: items
            }
            console.log('Invoice To Save ', invoiceToSave);
            setDesc('');
            setDate(undefined);
            dispatch(resetItems());
            dispatch(addInvoice(invoiceToSave));
        }
    }


    return (
        <div className={'mb-30 border p-4 mt-5'} >
            <p className={'text-center text-xl font-bold mb-2'}>Invoice Form</p>
            <form onSubmit={handleSubmit(onSubmitHandler)} >
                <div className={'flex flex-row justify-between'} >
                    <div className={'flex flex-col'} >
                        <label htmlFor="description">Description</label>
                        <input type="text" id={'description'}  className={'border px-3 py-1 rounded'}
                                onChange={onDescChangeHandler} value={desc}
                        />
                        <span className={'text-red-600 text-sm h-5'} >{firstSave && !desc && 'Description is required.'}</span>
                    </div>
                    <div className={'flex flex-col'} >
                        <label htmlFor="date">Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"} className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                >
                                    <CalendarIcon/>
                                    {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={onSelectHandler}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <span className={'text-red-600 text-sm h-5'} >{firstSave && !date && 'Date is required.'}</span>
                    </div>
                </div>
                <div className={'flex flex-row justify-between items-center w-200 mt-5'} >
                    <div className={'flex flex-col'}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id={'name'} {...register('name')}  className={'border px-3 py-1 rounded'}/>
                        <span className={'text-red-600 text-sm h-5'} >{errors.name && errors?.name?.message}</span>
                    </div>

                    <div className={'flex flex-col'} >
                        <label htmlFor="qty">Qty</label>
                        <input type="text" id={'qty'} {...register('qty')}  className={'border px-3 py-1 rounded'}/>
                        <span className={'text-red-600 text-sm h-5'} >{errors?.qty && errors?.qty?.message}</span>
                    </div>
                    <div className={'flex flex-col'} >
                        <label htmlFor="price">Price</label>
                        <input type="text" id={'price'} {...register('price')}  className={'border px-3 py-1 rounded'}/>
                        <span className={'text-red-600 text-sm h-5'} >{errors?.price && errors?.price?.message}</span>
                    </div>
                    <div>
                        <button type={'submit'} className={'border px-3 py-1  rounded cursor-pointer'}>Add Item</button>
                    </div>
                </div>
                <div className={'text-center'} >
                    <span className={'text-red-600 text-sm h-5'} >{firstSave && !items.length && 'Items are required.'}</span>
                </div>
                {
                    (items.length !== 0) && <Table>
                        <TableCaption>A list of your items.</TableCaption>
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
                                items.map(item => (
                                    <InvoiceItem key={item.id} item={item}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                }
                <div className={'text-end mt-5'} >
                    <button type={'button'} onClick={onSaveHandler} className={'px-3 py-1 border cursor-pointer'} >Save</button>
                </div>
            </form>
        </div>
    );
}