/* eslint-disable no-debugger */
import { useFetchUsersQuery, useAddUserMutation } from "../store"
// import { Skeleton } from "@mui/material";
import { UsersListItem } from "./UsersListItem"
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "react-lottie";
import animationData from '../lottie/98432-loading.json';


export const UsersList = () => {
    const { data, isError, isFetching } = useFetchUsersQuery();
    // debugger;
    const [addUser, results] = useAddUserMutation();
    // debugger;

    const handleUserAdd = () => {
        addUser();
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
                height={400}
                width={400}
            />
        )
    } else if (isError) {
        content = <div>Hata var</div>
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />
        })
    }
    return (
        <div>
            <div className="topArrangement">
                <h1 style={{ fontSize: "20px" }}>Kişiler</h1>
                <Button variant="outlined" onClick={handleUserAdd}>
                    {results.isLoading ? (<CircularProgress size={25} />) : (<span>Kişi Ekle+</span>)}
                </Button>
            </div>
            {content}
        </div>
    )
}
