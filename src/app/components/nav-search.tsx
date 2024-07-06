'use client';

import { useState } from "react";

export const NavSearch = () => {
    console.log('NavSearch rendered')
    const [search, setSearch] = useState('');
    return <div>NavSearch input</div>;
}