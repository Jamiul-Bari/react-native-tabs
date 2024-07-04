import { StatusBar } from 'expo-status-bar';
import React, { createRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Animated, Image, findNodeHandle, Touchable, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('screen');
const images = {
    man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    fashion: 'https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    kids: 'https://images.pexels.com/photos/1619772/pexels-photo-1619772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    snapback:
        'https://images.unsplash.com/photo-1675669969865-67eb6f1c0034?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    help: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};
const data = Object.keys(images).map((i) => ({
    key: i,
    title: i,
    image: images[i],
    ref: createRef()
}));

const Tab = forwardRef(({ item, onTabPress }, ref) => {
    return <TouchableOpacity onPress={onTabPress}>
        <View ref={ref}>
            <Text style={{ color: 'white', fontSize: 84 / data.length, fontWeight: 800, textTransform: 'uppercase' }}>
                {item.title}
            </Text>
        </View>
    </TouchableOpacity>
})

const Tabs = ({ scrollX, data, onTabPress }) => {
    const [measures, setMeasures] = useState([]);
    const tabContainerRef = useRef();

    useEffect(() => {
        const tempMeasures = [];

        data.forEach(item => {
            item.ref.current.measureLayout(tabContainerRef.current, (x, y, width, height) => {
                tempMeasures.push({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                });

                if (tempMeasures.length === data.length) {
                    setMeasures(tempMeasures);
                }
            });
        });
    }, []);

    return <View style={{ position: 'absolute', top: 100, width: width }}>
        <View
            ref={tabContainerRef}
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            {data.map((item, index) => {
                return <Tab key={item.key} item={item} ref={item.ref} onTabPress={() => onTabPress(index)} />
            })}
        </View>

        {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
    </View>
}

const Indicator = ({ measures, scrollX }) => {
    const inputRange = data.map((_, i) => i * width);
    const indicatorWidth = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: measures.map((measure) => measure.width),
    });
    const translateX = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: measures.map((measure) => measure.x),
    });

    return <Animated.View
        style={{
            position: 'absolute',
            backgroundColor: 'white',
            width: indicatorWidth,
            left: 0,
            height: 4,
            bottom: -10,
            transform: [{
                translateX: translateX
            }]
        }}
    />
}

export default function AnimatedTab() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef();
    const onTabPress = useCallback(tabIndex => {
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
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
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
            <Tabs scrollX={scrollX} data={data} onTabPress={onTabPress} />
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
