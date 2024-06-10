import { type NextApiRequest } from "next"
import { headers, cookies } from "next/headers";


export async function GET(request: NextApiRequest) {

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