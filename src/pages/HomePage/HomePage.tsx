/* eslint-disable no-restricted-globals */
import { Button } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";
import { CustomDataGrid } from "../../components/CustomDataGrid/CustomDataGrid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeUserById, selectUsers } from "../../redux/slices/userSlice";
import { deleteUserById } from "../../services/user";


type Selection = {
    selected: boolean,
    list: GridSelectionModel
}

export const HomePage = () => {

    const users = useAppSelector(selectUsers)

    const [selection, setSelection] = useState<Selection>({ selected: false, list: []});

    const [openConfModalSingle, setOpenConfModalSingle] = useState(false);
    const [openConfModalMultiple, setOpenConfModalMultiple] = useState(false);
    const dispatch = useAppDispatch()
    const [selectedUserId, setSelectedUserId] = useState(0);

    const handleOnDeleteSingle = async () => {
        try {
            deleteUserById(selectedUserId)
            dispatch(removeUserById(selectedUserId))
            setOpenConfModalSingle(false)
        } catch (err) { console.error(err) }
    }

    const handleOnDeleteMultiple = () => {
        selection.list.forEach(userId => {
            deleteUserById(Number(userId))
            dispatch(removeUserById(Number(userId)))
        });
        setOpenConfModalMultiple(false)
    }

    const handleSelectUser = (userId: number) => {
        setOpenConfModalSingle(true)
        setSelectedUserId(userId)
    }

    const handleSelectionChange = (selectionModel: GridSelectionModel) => {
        if(selectionModel.length === 0){
            setSelection({ selected: false, list: selectionModel })
        } else {
            setSelection({ selected: true, list: selectionModel })
        }
    }


    return (
        <>
            <div style={{minHeight: '400px', height: '100vh', width: 'clamp(700px, 100%, 1200px)', margin: '0 auto', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
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
                            onClick={() => setOpenConfModalMultiple(true)}
                            >
                            Remove Selected
                        </Button>
                    )
                }
            
            </div>
            <ConfirmationModal
                openModal={openConfModalSingle}
                setOpenModal={setOpenConfModalSingle}
                handleOnDelete={handleOnDeleteSingle}
                message="If you click Delete, all information about this user will be lost."
            />

            <ConfirmationModal
                openModal={openConfModalMultiple}
                setOpenModal={setOpenConfModalMultiple}
                handleOnDelete={handleOnDeleteMultiple}
                message="If you click Delete, all information about all selected users will be lost."
            />
        </>
    )
}
