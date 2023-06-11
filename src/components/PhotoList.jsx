/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import Lottie from "react-lottie";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import PhotoListItem from "./PhotoListItem";
import { Fragment } from "react";
import { Button, CircularProgress } from "@mui/material";
import animationData from '../lottie/97930-loading.json';

export default function PhotoList({ album }) {
    const { data, isError, isFetching } = useFetchPhotosQuery(album);
    const [addPhoto, results] = useAddPhotoMutation();

    const handlePhotoAdd = () => {
        addPhoto(album);
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    let content;
    if (isFetching) {
        content = (
            // <Skeleton animation="wave" variant="rounded" sx={{ width: "100%", height: "600px" }} />
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
            />
        )
    } else if (isError) {
        content = <div>Hata var</div>
    } else {
        content = data.map((photo) => {
            return <PhotoListItem key={photo.id} photo={photo} />
        })
    }
    return (
        <Fragment>
            <div style={{ marginTop: -20, marginLeft: 22, paddingBottom: 10 }}>
                <div className="topArrangement">
                    <h3>{album.title} Fotoğrafları</h3>
                    <Button variant="outlined" onClick={handlePhotoAdd} sx={{ ":hover": { border: 2 } }}>
                        {results.isLoading ? (<CircularProgress size={25} />) : (<span style={{ color: "#fff", fontWeight: "bold" }}>Fotoğraf Ekle+</span>)}
                    </Button>
                </div>
            </div>
            <div className="photoDiv">{content}</div>
        </Fragment>
    )
}
