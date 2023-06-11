/* eslint-disable react/prop-types */

import { CircularProgress } from "@mui/material";
import { useRemovePhotoMutation } from "../store";
import { GoTrashcan } from "react-icons/go";

export default function PhotoListItem({ photo }) {

    const [removePhoto, results] = useRemovePhotoMutation()
    // debugger;

    const handleRemovePhoto = () => {
        removePhoto(photo);

    }
    return (
        <div style={{ cursor: "pointer", position: "relative" }}>
            <img src={photo.url} alt="" />
            <div className="photoTrashCanAlignment" onClick={handleRemovePhoto}>
                {results.isLoading ?
                    (<CircularProgress size={25} />) :
                    (<GoTrashcan size={30} />)}
            </div>
        </div>
    )
}
