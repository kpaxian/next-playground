'use client';

import { useTheme } from "../components/theme-provider";

//import { serverSideFunction } from "../utils/server-utils";

export default function ClientRoutePage() {
    console.log('Client Route Rendered', )
    //const result = serverSideFunction();
    const theme = useTheme();
    return (
        <>
            <h1 style={{
                color: theme.colors.primary
            }}>Client Route Page</h1>
            {/* <p>{result}</p> */}
        </>
    )
}