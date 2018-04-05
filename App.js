import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions
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
    FormInput
} from 'react-native-elements'

export default class App extends React.Component {

    constructor(props, context, updater) {
        super(props, context, updater);

        this.state = {
            mute: false,
            shouldPlay: false,
            volume: 1.0,
            uri: "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
            selectIndex: 0,
            isFull: false,
            inputValue1: 'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8',
            inputValue2: 'http://techslides.com/demos/sample-videos/small.mp4',
            inputValue3: 'http://192.168.1.2/streaming/mystream.m3u8'
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

        width = this.state.isFull ? width * 0.95 : width * 0.75;
        //height = this.state.isFull ? height:height/2;
        height = height * (width / 1520);

        console.log("width", width);
        console.log("height", height);

        return (
                <View style={{flex: 1, }}>
                    <View style={{flex: 2,flexDirection: 'row', backgroundColor: 'gray',paddingTop:25 ,paddingBottom:5}} >
                        <View>
                            <FormLabel>Name</FormLabel>
                            <FormInput />
                        </View>
                    </View>
                    <View style={{flex: 17, backgroundColor: 'black',alignItems:'center',justifyContent: 'center'}} >
                         <Video
                             source={{uri: this.state.uri}}
                             shouldPlay={this.state.shouldPlay}
                             resizeMode="cover"
                             rate={1.0}
                             volume={this.state.volume}
                             style={{width, height}}
                             isMuted={this.state.mute}
                         />
                    </View>
                    <View style={{flex: 1, backgroundColor: 'gray',flexDirection: 'row'}} >
                        <Ionicons
                             name={this.state.mute ? "ios-volume-off" : "ios-volume-up-outline"}
                             size={40}
                             color="white"
                             onPress={this._handleVolume}
                             style={{paddingLeft: 10}}
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
                             style={{marginLeft: 'auto'}}
                         />
                    </View>
                </View>
        );
    }
}
