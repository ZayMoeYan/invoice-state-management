'use client';
import {TableCell, TableRow} from "@/components/ui/table";
import {InvoiceData} from "@/lib/features/invoice/invoiceSlice";
import {ChangeEvent, useState} from "react";

interface Props {
    item: InvoiceData,
    edit: boolean,
    onUpdate: (itemToUpdate: InvoiceData) => void,
    onDelete: (itemToDelete: InvoiceData) => void
}



export default function InvoiceDetailData({ item, edit, onUpdate, onDelete }: Props) {

    const [itemToUpdate, setItemToUpdate] = useState(item);
    const [editMode, setEditMode] = useState(false);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const updateItem = {
            ...itemToUpdate,
            [name]: event.target.value,
        }
        setItemToUpdate(updateItem);
    }

    const onEditHandler = () => {
        setEditMode(!editMode);
        if(editMode) {
            onUpdate(itemToUpdate);
        }
    }

    return (
        <>

                <TableRow key={item.id}>
                    <TableCell>
                        {
                            !editMode ? item.name : <input type={'text'}
                                                       className={'border w-30'}
                                                       name={'name'}
                                                       onChange={onChangeHandler}
                                                       value={itemToUpdate.name}
                            />
                        }
                    </TableCell>
                    <TableCell>
                        {
                            !editMode ? item.qty : <input type={'text'}
                                                       className={'border w-30'}
                                                       name={'qty'}
                                                       onChange={onChangeHandler}
                                                       value={itemToUpdate.qty}
                            />
                        }
                    </TableCell>
                    <TableCell>
                        {
                            !editMode ? item.price : <input type={'text'}
                                                       className={'border w-30'}
                                                       name={'price'}
                                                       onChange={onChangeHandler}
                                                       value={itemToUpdate.price}
                            />
                        }
                    </TableCell>
                    <TableCell>{itemToUpdate.qty * itemToUpdate.price}</TableCell>
                    {
                        edit &&
                        <TableCell>
                            <button type={'button'}
                                    className={'border px-2 py-1 cursor-pointer'}
                                    onClick={onEditHandler}
                            >{editMode ? 'Update' : 'Edit'}</button>
                        </TableCell>
                    }
                    {
                        edit &&
                        <TableCell>
                            <button type={'button'}
                                    className={'border px-2 py-1 cursor-pointer'}
                                    onClick={() => onDelete(item)}
                            >Del</button>
                        </TableCell>
                    }

                </TableRow>

        </>
    );
}
