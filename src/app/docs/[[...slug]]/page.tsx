interface DocsProps {
    params: {
        slug: string[]
    }
}

export default function Docs({params}: DocsProps ) {

    if (params.slug?.length === 2) {
        return <h2>Features {params.slug[0]} and concept {params.slug[1]}</h2>
    }
    if (params.slug?.length === 1) {
        return <h2>Features {params.slug[0]}</h2>
    }

    return <h1>Docs home page</h1>
}