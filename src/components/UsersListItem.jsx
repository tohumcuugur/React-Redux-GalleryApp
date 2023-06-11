/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */

import AlbumList from "./AlbumList"
import ExpendablePanel from "./ExpendablePanel"
import { GoTrashcan } from "react-icons/go"
import { useRemoveUserMutation } from "../store"
import CircularProgress from "@mui/material/CircularProgress";

export const UsersListItem = ({ user }) => {

    const [removeUser, results] = useRemoveUserMutation()
    // debugger;

    const handleClick = () => {
        removeUser(user);

    }


    const header = (
        <div style={{ paddingBottom: 15 }}>
            <button className="deleteBtn" onClick={handleClick}>
                {results.isLoading ? (<CircularProgress size={25} />) : (<GoTrashcan size={25} />)}
            </button>
            {user.name}

        </div>

    )
    return (
        <div>
            <ExpendablePanel header={header}>
                <AlbumList user={user} />
            </ExpendablePanel>
        </div>
    )
}
