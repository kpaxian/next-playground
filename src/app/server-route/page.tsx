import { serverSideFunction } from "../utils/server-utils"

export default function ServerRoutePage() {
    console.log('server route rendered', )
    const result = serverSideFunction()
    return (
        <>
            <h1>Server Route Page</h1>
            <p>{result}</p>
        </>
    )
}