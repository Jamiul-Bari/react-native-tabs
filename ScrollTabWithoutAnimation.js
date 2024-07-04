import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Animated, Image, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('screen');
const images = {
    man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    fashion: 'https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    kids: 'https://images.pexels.com/photos/1619772/pexels-photo-1619772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    snapback:
        'https://images.unsplash.com/photo-1675669969865-67eb6f1c0034?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shoes: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    kitchen: 'https://images.unsplash.com/photo-1512149519538-136d1b8c574a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    jewellery: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bags: 'https://images.unsplash.com/photo-1590739171755-a0cb74e28f10?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    office: 'https://images.unsplash.com/photo-1516134162643-d3a8f6ef0623?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    pet: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    help: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};
const data = Object.keys(images).map((i) => ({
    key: i,
    title: i,
    image: images[i],
}));

const Tab = ({ item, index, fIndex, onTabPress }) => {
    return <TouchableOpacity onPress={onTabPress}>
        <View>
            <Text style={{ color: index === fIndex ? 'white' : 'gray', fontSize: 20, fontWeight: index === fIndex ? 800 : 400, textTransform: 'uppercase' }}>
                {item.title}
            </Text>
        </View>
    </TouchableOpacity>
}

const Tabs = ({ data, index, onTabPress }) => {
    const tabContainerRef = useRef();

    useEffect(() => {
        tabContainerRef.current?.scrollToIndex({
            animated: true,
            index: index,
            viewPosition: 0.5
        });
    }, [index]);

    return <View style={{ position: 'absolute', top: 100, width: width }}>
        <FlatList
            ref={tabContainerRef}
            initialScrollIndex={index}
            data={data}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 10 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item, index: fIndex }) => {
                return <Tab
                    key={item.key}
                    item={item}
                    index={index}
                    fIndex={fIndex}
                    onTabPress={() => onTabPress(fIndex)} />
            }}
        />
    </View>
}

export default function ScrollTabWithoutAnimation() {
    const flatListRef = useRef();
    const [index, setIndex] = useState(0);
    const onTabPress = useCallback(tabIndex => {
        setIndex(tabIndex);
        flatListRef?.current?.scrollToOffset({
            offset: tabIndex * width
        });
    });

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Animated.FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={(item) => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={(e) => {
                    if (e.nativeEvent.contentOffset.x % width === 0) {
                        setIndex(e.nativeEvent.contentOffset.x / width);
                    }
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width: width, height: height }}>
                            <Image
                                source={{ url: item.image }}
                                style={{ flex: 1, resizeMode: 'cover' }}
                            />
                            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]}></View>
                        </View>
                    );
                }}
            />
            <Tabs data={data} index={index} onTabPress={onTabPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
