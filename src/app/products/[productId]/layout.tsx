export default function ProductDetailsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <> 
            <p>Features</p>
            {children}
        </>
    );
}
