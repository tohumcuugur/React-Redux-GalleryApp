import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from '@faker-js/faker';



const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    });
};
const usersApi = createApi({
    reducerPath: "users", //index.js'ten ya "users" stringi ile ulaşabiliriz yada usersApi.reducerPath ile ulaşabiliriz.
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        //her bir aksiyonu 1'er saniye arayla çek, fetch user ,add user ,remove user'da 1 saniye otomatik bekler.
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints(builder) {
        return {
            //end points // data çekme, ekleme, kişileri kaldırma gibi işler için endpoinst kullanılır.
            fetchUsers: builder.query({
                providesTags: ["User"],
                query: () => {
                    return {
                        url: "/users",
                        method: "GET",
                    }
                }
            }), //datayı çekmek için query ,update içinde mutation "yeni data ekleme yada datayı kaldırma" kullanılır.
            addUser: builder.mutation({
                invalidatesTags: () => { //fetchUsers işlemine bir tag ataması gerçekleştirdim , bu tag atamasını Kişi ekleye bastığımda iptal ediyorum , ve iptal sonrası otomatik olarak yeniden fetch ediyor ve eklenen son kullanıcıyıda çekmiş oluyoruz.
                    return [{ type: "User" }]
                },
                query: () => {
                    return {
                        url: "/users",
                        method: "POST",
                        body: {
                            name: faker.person.fullName()
                        }
                    }
                }
            }),
            removeUser: builder.mutation({
                invalidatesTags: () => {
                    return [{ type: "User" }]
                },
                query: (user) => { //id bilgisine ihtiyaç oldugu için user bilgisini geçiyoruz
                    return {
                        url: `/users/${user.id}`,
                        method: "DELETE",
                    }
                }
            })
        }
    }
});
export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } = usersApi
export { usersApi };