/* eslint-disable react/prop-types */

import { CircularProgress } from "@mui/material"
import ExpendablePanel from "./ExpendablePanel"
import PhotoList from "./PhotoList"
import { GoTrashcan } from "react-icons/go"
import { useRemoveAlbumMutation } from "../store"


export default function AlbumListItem({ album }) {

    const [removeAlbum, results] = useRemoveAlbumMutation()
    // debugger;

    const handleClick = () => {
        removeAlbum(album);

    }

    const header = (
        <div style={{ paddingBottom: 15 }}>
            <button className="deleteBtn" onClick={handleClick}>
                {results.isLoading ?
                    (<CircularProgress size={25} />) :
                    (<GoTrashcan size={25} />)}
            </button>
            {album.title}

        </div>

    )
    return (
        <div>
            <ExpendablePanel header={header}>
                <PhotoList album={album} />
            </ExpendablePanel>
        </div>
    )
}
