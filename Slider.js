import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { ActivityIndicator, Dimensions, Image, SafeAreaView, View } from 'react-native';
const images = [
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    'https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1619772/pexels-photo-1619772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.unsplash.com/photo-1675669969865-67eb6f1c0034?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];
const width = Dimensions.get('window').width;

const Slider = () => {
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={2000}
                onSnapToItem={index => console.log(`Current Index: ${index}`)}
                renderItem={({ index }) => (
                    <View style={{ flex: 1, borderWidth: 0, justifyContent: 'center' }}>
                        {/* <ActivityIndicator size={'small'} /> */}
                        <Image style={{ flex: 1, resizeMode: 'cover' }}
                            source={{ uri: images[index] }}
                        />
                    </View>
                )}
            />
        </View>
    );
}

export default Slider