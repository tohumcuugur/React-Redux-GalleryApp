/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button, CircularProgress } from "@mui/material";
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import { Fragment } from "react";
import Lottie from "react-lottie";
import animationData from '../lottie/97930-loading.json';
import AlbumListItem from "./AlbumListItem";


export default function AlbumList({ user }) {
    const { data, isError, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAlbumAdd = () => {
        addAlbum(user);
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
        content = data.map((album) => {
            return <AlbumListItem key={album.id} album={album} />
        })
    }

    return (
        <Fragment>
            <div style={{ marginTop: -20, marginLeft: 22, paddingBottom: 10 }}>
                <div className="topArrangement">
                    <h3>{user.name} Albümü</h3>
                    <Button variant="outlined" onClick={handleAlbumAdd} sx={{ ":hover": { border: 2 } }}>
                        {results.isLoading ? (<CircularProgress size={25} />) : (<span style={{ color: "#fff", fontWeight: "bold" }}>Albüm Ekle+</span>)}
                    </Button>
                </div>
            </div>
            <div>{content}</div>
        </Fragment>
    )
}
