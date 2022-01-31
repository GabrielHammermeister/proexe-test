/* eslint-disable no-restricted-globals */
import { Alert, Button, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";
import { CustomDataGrid } from "../../components/CustomDataGrid/CustomDataGrid";
import { CustomSnackbar } from "../../components/CustomSnackbar/CustomSnackbar";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeUserById, selectUsers } from "../../redux/slices/userSlice";
import { deleteUserById } from "../../services/user";


type Selection = {
    selected: boolean,
    list: GridSelectionModel
}

export const HomePage = () => {

    const [params, setParams] = useSearchParams()

    const [openSnackAdd, setOpenSnackAdd] = useState(params.get('redirect') === 'userAdded');
    const [openSnackEdit, setOpenSnackEdit] = useState(params.get('redirect') === 'userEdited');
    const [selection, setSelection] = useState<Selection>({ selected: false, list: []});

    const users = useAppSelector(selectUsers)
    const [openConfModal, setOpenConfModal] = useState(false);
    const dispatch = useAppDispatch()
    const [selectedUserId, setSelectedUserId] = useState(0);

    const handleCloseSnack = () => {
        setOpenSnackAdd(false)
        setOpenSnackEdit(false)
        history.replaceState({}, '')
    }

    const handleOnDelete = async () => {
        try {
            deleteUserById(selectedUserId)
            dispatch(removeUserById(selectedUserId))
            setOpenConfModal(false)
        } catch (err) { console.error(err) }
    }

    const handleSelectUser = (userId: number) => {
        setOpenConfModal(true)
        setSelectedUserId(userId)
    }
    

    const handleSelectionChange = (selectionModel: GridSelectionModel) => {
        if(selectionModel.length === 0){
            setSelection({ selected: false, list: selectionModel })
        } else {
            setSelection({ selected: true, list: selectionModel })
        }
    }

    const handleRemoveSelected = () => {
        selection.list.forEach(userId => {
            deleteUserById(Number(userId))
            dispatch(removeUserById(Number(userId)))
        });
    }


    return (
        <>
            <div style={{minHeight: '400px', height: '100vh', width: 'clamp(700px, 100%, 1000px)', margin: '0 auto', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                {
                    users &&
                    (
                        <CustomDataGrid
                            handleSelectUser={handleSelectUser}
                            handleSelectionChange={handleSelectionChange}
                            users={users}
                        />
                    )
                }

                {
                    users && users.length > 0  &&
                    (
                        <Link to={`/add`} style={{textDecoration: 'none'}}>
                            <Button 
                                sx={{m: 5}}
                                size="large"
                                variant="contained" 
                                color="primary" 
                                >
                                Add New User
                            </Button>
                        </Link>
                    )
                }

                {
                    selection.selected  &&
                    (
                        <Button 
                            sx={{m: 5}}
                            size="large"
                            variant="contained" 
                            color="primary"
                            onClick={handleRemoveSelected}
                            >
                            Remove Selected
                        </Button>
                    )
                }
            
            </div>
            <ConfirmationModal
                openModal={openConfModal}
                setOpenModal={setOpenConfModal}
                handleOnDelete={handleOnDelete}
            />

            <CustomSnackbar
                openSnackbar={openSnackAdd}
                handleCloseSnackbar={handleCloseSnack}
                message="User added with success!"
            />
            <CustomSnackbar
                openSnackbar={openSnackEdit}
                handleCloseSnackbar={handleCloseSnack}
                message="User updated with success!"
            />

        </>
    )
}
