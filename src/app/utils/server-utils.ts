import "server-only";

export const serverSideFunction = () => {
    console.log(
        `
        use multiple libraties
        interact with a database
        use environment variables
        process confidential information
        `
    );

    return 'server result';
}