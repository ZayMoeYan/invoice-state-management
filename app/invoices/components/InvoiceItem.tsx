import {TableCell, TableRow} from "@/components/ui/table";
import {ChangeEvent, useState} from "react";
import {InvoiceData} from "@/lib/features/invoice/invoiceSlice";
import {useAppDispatch} from "@/lib/hooks";
import {deleteItem, updateItem} from "@/lib/features/invoice/itemSlice";

interface Props {
    item: InvoiceData
}

export default function InvoiceItem({item}: Props) {

    const [itemToUpdate, setItemToUpdate] = useState(item);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();

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
            dispatch(updateItem(itemToUpdate));
        }
    }

    const onDeleteHandler = () => {
        dispatch(deleteItem(item));
    }

    return (
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
            <TableCell >
                <button type={'button'}
                        className={'border px-2 py-1 cursor-pointer'}
                        onClick={onEditHandler}
                >{editMode ? 'Update' : 'Edit'}</button>
            </TableCell>
            <TableCell>
                <button type={'button'}
                        className={'border px-2 py-1 cursor-pointer'}
                        onClick={onDeleteHandler}
                >Del</button>
            </TableCell>

        </TableRow>
    );
}