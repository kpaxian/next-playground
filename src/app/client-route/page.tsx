'use client';

import { useTheme } from "../components/theme-provider";
import { clientSideFunction } from "../utils/client-utils";

export default function ClientRoutePage() {
    console.log('Client Route Rendered', )
    const result = clientSideFunction();
    const theme = useTheme();
    return (
        <>
            <h1 style={{
                color: theme.colors.primary
            }}>Client Route Page</h1>
            <p>{result}</p>
        </>
    )
}