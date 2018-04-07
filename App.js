import React from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import {
    Video
} from 'expo';

import {
    MaterialIcons,
    Ionicons
} from '@expo/vector-icons';
import {
    FormLabel,
    Button
} from 'react-native-elements'

export default class App extends React.Component {

    constructor(props, context, updater) {
        super(props, context, updater);

        this.state = {
            mute: false,
            shouldPlay: false,
            volume: 1.0,
            uri: "http://192.168.1.2/streaming/mystream.m3u8",
            //uri: "http://localhost:8080/streaming/mystream.m3u8",
            //uri: "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
            //uri: 'http://techslides.com/demos/sample-videos/small.mp4',
            isFull: false,
            id: null,
            name: null,
            sex: null,
            age: null
        };

        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
    }

    _handlePlayAndPause = () => {
        this.setState((prevState) => ({
            shouldPlay: !prevState.shouldPlay
        }));
    };

    _handleViewSize = () => {
        this.setState((prevState) => ({
            isFull: !prevState.isFull
        }));
    };

    _handleVolume = () => {
        this.setState(prevState => ({
            mute: !prevState.mute,
        }));
    };

    render() {
        let {width, height} = Dimensions.get('window');

        console.log("window.width", width);
        console.log("window.height", height);

        //width=1520,height=960

        width = this.state.isFull ? width * 0.99 : width * 0.8;
        //height = this.state.isFull ? height:height/2;
        height = height * (width / 1520);

        console.log("width", width);
        console.log("height", height);

        return (
            <View style={{flex: 1}}>
                <View
                    style={{
                        flex: 1.5,
                        flexDirection: 'row',
                        backgroundColor: 'gray',
                        paddingTop: 25,
                        paddingBottom: 5
                    }}>
                    <Button
                        icon={{name: 'ios-contact-outline', type: 'ionicon'}}
                        title='患者情報取得'
                        borderRadius={15}
                        onPress={() => {
                            if (this.state.id == null) {
                                this.setState({
                                    id: 1234567890,
                                    name: "東京　太郎",
                                    sex: "男",
                                    age: 40
                                })
                            } else {
                                this.setState({
                                    id: null,
                                    name: null,
                                    sex: null,
                                    age: null
                                })
                            }
                        }}
                    />

                    <FormLabel labelStyle={{color: "white", fontSize: 22, width: 180}}>ID:{this.state.id}</FormLabel>
                    <FormLabel labelStyle={{color: "white", fontSize: 22, width: 180}}>氏名:{this.state.name}</FormLabel>
                    <FormLabel labelStyle={{color: "white", fontSize: 22, width: 100}}>年齢:{this.state.age}</FormLabel>
                    <FormLabel labelStyle={{color: "white", fontSize: 22, width: 100}}>性別:{this.state.sex}</FormLabel>

                </View>
                <View style={{flex: 17, backgroundColor: '#F3F3F3', alignItems: 'center', justifyContent: 'center'}}>
                    <Video
                        source={{uri: this.state.uri}}
                        shouldPlay={this.state.shouldPlay}
                        resizeMode={Expo.Video.RESIZE_MODE_CONTAIN}
                        rate={1.0}
                        volume={this.state.volume}
                        style={{width, height}}
                        isMuted={this.state.mute}
                    />
                </View>
                <View style={{flex: 1, backgroundColor: 'gray', flexDirection: 'row'}}>
                    <Ionicons
                        name={this.state.mute ? "ios-volume-off" : "ios-volume-up-outline"}
                        size={40}
                        color="white"
                        onPress={this._handleVolume}
                        style={{paddingLeft: 25}}
                    />
                    <Ionicons
                        name={this.state.shouldPlay ? "ios-pause-outline" : "ios-play-outline"}
                        size={40}
                        color="white"
                        onPress={this._handlePlayAndPause}
                        style={{paddingLeft: 10}}
                    />
                    <MaterialIcons
                        name={this.state.isFull ? "fullscreen" : "fullscreen-exit"}
                        size={40}
                        color="white"
                        onPress={this._handleViewSize}
                        style={{marginLeft: 'auto', marginRight: 25}}
                    />
                </View>
            </View>
        );
    }
}
