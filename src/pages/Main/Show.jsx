import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, Text, Animated, StyleSheet, ScrollView, Dimensions, Image, FlatList, TouchableOpacity } from "react-native";
import { NaverMapView, NaverMapMarkerOverlay } from "@mj-studio/react-native-naver-map";
import dayjs from 'dayjs';

import TopTab from "../../components/Main/TobTab";
import BottomButtons from "../../components/Main/BottomButtons";

const { width, height } = Dimensions.get('window');

const Show = ({ navigation, route }) => {
    console.log('show ===============> ', route.params._data);
    const showValue = useRef(new Animated.Value(0)).current;
    const { address, detail_address, content, deadline, latitude, longitude, nickname, peopleCount, tag, title, writeTime } = route.params._data;
    
    const [initialRegion, setInitialRegion] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const showAnimated = (value) => Animated.timing(showValue, { toValue: value, useNativeDriver: true, duration: 300 });

    useEffect(() => {
        showAnimated(1).start()
    }, []);

    return (
        <SafeAreaView style={{flex : 1, backgroundColor : '#fff'}}>
            <TopTab navigation={navigation} title={title} />
            <NaverMapView
                style={{width : width, height : width/1.6 }}
                layerGroups={{
                    BUILDING: true,
                    BICYCLE: false,
                    CADASTRAL: false,
                    MOUNTAIN: false,
                    TRAFFIC: false,
                    TRANSIT: false,
                }}
                initialRegion={initialRegion}
                isShowLocationButton={false}
                isShowZoomControls={false}
                isRotateGesturesEnabled={false}
                isScrollGesturesEnabled={false}
                isTiltGesturesEnabled={false}
                isStopGesturesEnabled={false}
                isZoomGesturesEnabled={false}
                locale={'ko'}
                maxZoom={16}
                minZoom={16}

            >
                <NaverMapMarkerOverlay
                    latitude={latitude}
                    longitude={longitude}
                    width={35}
                    height={45}
                />
            </NaverMapView>
            <View style={{ flex : 1, gap : 10,}}>
                <View style={{ paddingHorizontal : 16, paddingTop : 10, gap : 8}}>
                    <Text style={{fontSize : 20, fontWeight : '700'}}>{title}</Text>
                    <Text style={{fontSize : 16}}>{tag}</Text>
                </View>
                <View style={{ paddingHorizontal : 16, paddingTop : 10, gap : 8}}>
                    <View style={{justifyContent : 'flex-start', alignItems : 'center', flexDirection : 'row', gap : 16}}>
                        <Text style={{fontWeight : '700', color : '#07AC7D'}}>장소</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{width : width-100}}>{address} {detail_address}</Text>
                    </View>
                    <View style={{justifyContent : 'flex-start', alignItems : 'center', flexDirection : 'row', gap : 16}}>
                        <Text style={{fontWeight : '700', color : '#07AC7D'}}>시간</Text>
                        <Text>{dayjs(deadline).format('YYYY년 MM월 DD일 (ddd) HH:mm')} 까지</Text>
                    </View>
                    <View style={{justifyContent : 'flex-start', alignItems : 'center', flexDirection : 'row', gap : 16}}>
                        <Text style={{fontWeight : '700', color : '#07AC7D'}}>인원</Text>
                        <Text>{peopleCount} 명</Text>
                    </View>
                </View>
                <View style={{width : width, height : 1, backgroundColor : '#f4f4f4'}} />
                    <View style={{ flex : 1}}>
                    <ScrollView style={{}}>
                    <View style={{ paddingHorizontal : 16, paddingVertical : 10, gap : 8}}>
                        <Text style={{fontSize : 16, fontWeight : '600'}}>상세내용</Text>
                        <Text>{content}</Text>
                    </View>
                    <View style={{ paddingHorizontal : 16, paddingTop : 10 }}>
                        <Text style={{fontSize : 16, fontWeight : '600'}}>참여인원</Text>
                        <Text>{nickname}</Text>
                    </View>
                    </ScrollView>
                    </View>
            </View>
            <BottomButtons showValue={showValue} peopleCount={peopleCount}/>
        
        </SafeAreaView>
    )
}

export default Show;

const recruitIcon = require('../../assets/icons/recruitIcon.png');
const addressIcon = require('../../assets/icons/addressIcon.png');
const timeIcon = require('../../assets/icons/timeIcon.png');

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        height : 100,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        borderStyle: 'solid',
        borderColor: '#c3c3c3',
        borderWidth: 0.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
})
// import React, { useEffect } from "react";
// import { SafeAreaView, View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// const { width, height } = Dimensions.get('window');

// const Show = ({ route, navigation }) => {
//     const { address, detailAddress, deadLine, latitude, longitude, peopleCount, showContent, showTag, showTitle } = route.params;
    
    
//     // useEffect(() => {

//     // }, []);
    
    
//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#FEFFFE' }}>
//             <MapView
//                 style={{ width: width, height: width / 1.3 }}
//                 provider={PROVIDER_GOOGLE}
//                 initialRegion={{
//                     latitude: latitude,
//                     longitude: longitude,
//                     latitudeDelta: 0.0021,
//                     longitudeDelta: 0.0021
//                 }}
//             >
//                 <TouchableOpacity 
//                     onPress={() => navigation.navigate('Detail')}
//                     style={style.backSpaceView}>
//                     <Image source={backIcon} style={{ width: 30, height: 30 }} />
//                 </TouchableOpacity>
//                 <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
//                     <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
//                         <Image source={locationIcon} style={{ width: 40, height: 40 }} />
//                     </View>
//                 </Marker>
//             </MapView>
//             <View style={style.showTotalView}>
//                 <View style={style.showPartView}>
//                     <Image source={addressIcon} style={style.showIcon} />
//                     <View>
//                         <Text style={style.showCommText}>{address}</Text>
//                         <Text style={style.showCommText}>{detailAddress}</Text>
//                     </View>

//                 </View>
//                 <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 8, gap: 8 }}>
//                     <Image source={recruitIcon} style={style.showIcon} />
//                     <Text style={style.showCommText}>{peopleCount} 명 중 8 명 모집 완료</Text>
//                 </View>
//                 <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 8, gap: 8 }}>
//                     <Image source={timeIcon} style={style.showIcon} />
//                     <Text style={style.showCommText}>{deadLine}</Text>
//                 </View>
//                 <View style={{ height: 1, backgroundColor: '#DBDBDB' }} />
//             </View>
//             <View style={{ paddingHorizontal: 16, gap: 8 }}>
//                 <ScrollView 
//                     bounces={true}
//                     style={{ height: height, paddingHorizontal: 8 }}>
//                     <View style={{ gap: 4 }}>
//                         <Text style={[style.showCommText, { fontWeight: 700, fontSize: 16 }]}>{showTitle}</Text>
//                         <Text style={[style.showCommText, { fontWeight: 400, fontSize: 10, color: '#A7A7A7' }]}>작성한 시간</Text>
//                     </View>
//                     <View style={{ paddingTop: 16 }}>
//                         <Text style={style.showCommText}>{showContent}</Text>
//                     </View>
//                 </ScrollView>
//             </View>
//             <View style={{ width: width, height: 64, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 'auto', paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: '#DBDBDB', backgroundColor : '#FEFFFE' }}>
//                 <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
//                     <Image source={dummyProfileIcon} style={{ width: 30, height: 30 }} />
//                     <View style={{ paddingLeft: 8, gap: 4 }}>
//                         <Text style={[style.showCommText, { fontWeight: 500 }]}>슈퍼메가 울트라 참치</Text>
//                         <Text style={[style.showCommText, { fontWeight: 400, fontSize: 10, color: '#A7A7A7' }]}>모집마감까지 남은 시간</Text>
//                     </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={style.showBtn}>
//                     <Text style={[style.showCommText, { fontWeight: 600, fontSize: 14, color: '#FEFFFE' }]}>참여신청</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     )
// }

// const style = StyleSheet.create({
//     backSpaceView: {
//         height: 20,
//         width: width,
//         position: 'absolute',
//         zIndex: 2,
//         marginRight: 'auto',
//         paddingTop: 10
//     },
//     showTotalView: {
//         paddingVertical: 16,
//         paddingHorizontal: 16,
//         gap: 8
//     },
//     showPartView: {
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         flexDirection: 'row',
//         paddingHorizontal: 8,
//         gap: 8
//     },
//     showCommText: {
//         fontSize: 14,
//         fontWeight: 500,
//         fontFamily: 'Pretendard',
//         color: '#212529'
//     },
//     showIcon: {
//         width: 20,
//         height: 20,
//     },
//     showBtn : {
//         paddingHorizontal : 12, 
//         paddingVertical : 8, 
//         borderRadius : 8, 
//         backgroundColor : '#07AC7D'
//     }
// })

// const locationIcon = require('../../assets/icons/locationIcon.png');
// const backWhiteIcon = require('../../assets/icons/backWhiteIcon.png');
// const backIcon = require('../../assets/icons/backIcon.png');
// const addressIcon = require('../../assets/icons/addressIcon.png');
// const recruitIcon = require('../../assets/icons/recruitIcon.png');
// const timeIcon = require('../../assets/icons/timeIcon.png');
// const dummyProfileIcon = require('../../assets/icons/dummyProfileIcon.png');



// export default Show;