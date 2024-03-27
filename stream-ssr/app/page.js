import React, { Suspense } from 'react';
import { ComponentOne } from '../components/ComponentOne';
import { ComponentTwo } from '../components/ComponentTwo';
import { ComponentThree } from '../components/ComponentThree';

export function App() {
    return (
        <div>
            <h1>Welcome to Stream SSR Demo</h1>
            <ComponentOne />
            <ComponentTwo />
            <ComponentThree />
        </div>
    );
}
