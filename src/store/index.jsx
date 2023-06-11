// eslint-disable-next-line no-unused-vars
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query"; //dispatch ederken kullanılacak.
import { usersApi } from "./apis/userApi";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";


export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer
    },
    middleware: (getDefaultMiddleWare) => {
        return getDefaultMiddleWare().concat(usersApi.middleware).concat(albumsApi.middleware).concat(photosApi.middleware);
    }
})

setupListeners(store.dispatch);

export {
    useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation
} from "./apis/albumsApi";

export {
    useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation
} from "./apis/userApi";
export {
    useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation
} from "./apis/photosApi"