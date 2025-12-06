'use client';

import axios from "axios";
import { useState } from "react";

export const FileUpload = () => {

    const [file, setFile] = useState('null');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('event is', e)
        console.log('file is', file)

        const form = new FormData();
        form.append('video', file);

        axios.post('http://localhost:3003/upload', form)
        .then(function(res){
            console.log('response is', res)
        }).catch(function(error) {
            console.log('submit error is ', error);
        });

    }

    const handleInputChange = (e) => {
        console.log('e', e.target.files)
        setFile(e.target.files[0])
    }
    return (
        <form onSubmit={submitHandler} encType="multipart/form-data">
            <label htmlFor="video">Upload file</label>
            <input type="file" name="video" id="video" onChange={handleInputChange}/>
            <button type="submit">Send file</button>
        </form>
    )
}