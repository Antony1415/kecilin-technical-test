'use client'
import React from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CategoryContent, ProductContent, UserListContent } from '@/components';
import { AppBar, Button, Toolbar } from '@mui/material';

export default function Home() {
    const [value, setValue] = useState('user');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const homeContent = () => {
        switch (value) {
            case 'user':
                return <UserListContent />;
            case 'product':
                return <ProductContent />;
            case 'category':
                return <CategoryContent />;
        }
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
                        <Tab className='text-black' value="user" label="User List" />
                        <Tab className='text-black' value="product" label="Product" />
                        <Tab className='text-black' value="category" label="Category" />
                    </Tabs>
                    <Button className='ml-auto' color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <div className='px-10 py-1'>
                {homeContent()}
            </div>
        </div>


    );
}
