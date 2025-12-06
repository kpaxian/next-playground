"use client";

import { useEffect, useState } from "react";
import Api from "../utils/api";

const url = 'http://localhost:3003/users';


export default function ReqApi () {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        await fetch(url).then(async (res) => {
            const resUsers = await res.json();
            setUsers(resUsers);
        });
    }

    const postUsers = async () => {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({test: 'test'})
        }).then(async (res) => {
            const resUsers = await res.json();
            console.log('post resUsers', resUsers)
        })
    }


    useEffect(() => {
        getUsers();
        postUsers();
    }, []);

    return (
        <>
            <h1>These are my users</h1>
            <ul>
                {
                    users.length > 0 && users.map((item: any) => {
                        return <li key={item?.id}>{ item?.name }</li>
                    })
                }
            </ul>
        </>
    )
}