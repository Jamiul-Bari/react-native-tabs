import * as React from 'react';
import AnimatedTab from './AnimatedTab';
import ScrollTabFlatList from './ScrollTabFlatList';
import ScrollTabWithoutAnimation from './ScrollTabWithoutAnimation';

export default function App() {
    return (
        // <AnimatedTab />
        <ScrollTabWithoutAnimation />
        // <ScrollTabFlatList/>
    );
}