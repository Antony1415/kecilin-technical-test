'use client'
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CategoryContent, ProductContent, UserContext, UserListContent } from '@/components';
import { AppBar, Button, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const userContext = useContext(UserContext)
    const [value, setValue] = useState('');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setValue(userContext.role === 'USER' ? 'product' : 'user')
    }, [userContext])

    const homeContent = () => {
        if (userContext.role === 'USER') {
            switch (value) {
                case 'product':
                    return <ProductContent user={userContext} />;
                case 'category':
                    return <CategoryContent user={userContext} />;
            }
        } else {
            switch (value) {
                case 'user':
                    return <UserListContent user={userContext} />;
                case 'product':
                    return <ProductContent user={userContext} />;
                case 'category':
                    return <CategoryContent user={userContext} />;
            }
        }
    }

    const handleLogout = () => {
        document.cookie = `user=${JSON.stringify(userContext)}; Max-Age=0`
        router.push("/");
        router.refresh();
    }

    return (
        <div className='flex flex-col gap-5'>
            <AppBar position="static">
                <Toolbar>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                        sx={{
                            '.MuiTabs-flexContainer': {
                                gap: '50px'
                            },
                            '.MuiTabs-indicator': {
                                display: "none"
                            },
                            '.MuiTab-root.Mui-selected': {
                                color: 'white'
                            },
                        }}
                    >
                        {userContext.role === 'ADMIN' && <Tab className='text-black' value="user" label="User List" />}
                        <Tab className='text-black' value="product" label="Product" />
                        {userContext.role === 'ADMIN' && <Tab className='text-black' value="category" label="Category" />}
                    </Tabs>

                    <div className='ml-auto flex gap-5 items-center'>
                        <h1>{userContext.role} - {userContext.firstName} {userContext.lastName}</h1>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>

            <div className='px-10 py-1'>
                {homeContent()}
            </div>
        </div>
    );
}