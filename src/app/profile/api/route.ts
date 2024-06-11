import { type NextRequest } from "next/server";
import { headers, cookies } from "next/headers";


export async function GET(_request: NextRequest) {

    const headersList = headers();
    //const requestHeaders = new Headers(request.headers);
    console.log('Authorization header::', headersList.get('Authorization'))

    cookies().set('resultsperpage', '20')
    return new Response("<h1>Profile data</h1>", {
        headers: {
            "Content-Type": "text/html",
            "Set-Cookie": "theme=dark"
        }
    })
}