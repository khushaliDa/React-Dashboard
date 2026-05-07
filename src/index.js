import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UsersProvider } from './context/users';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <UsersProvider>
        <App />
    </UsersProvider>
);