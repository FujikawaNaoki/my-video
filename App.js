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
    Octicons,
    Ionicons
} from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    controlVideo:{
        zIndex:10
    },
    controlUrlBox1: {
        zIndex:1,
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    controlUrlBox2: {
        zIndex:1,
        position: 'absolute',
        bottom: 55,
        left: 0,
        right: 0,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    controlUrlBox3: {
        zIndex:1,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0)",
    }
});

export default class App extends React.Component {

    state = {
        mute: false,
        shouldPlay: false,
        volume: 1.0,
        uri: "",
        selectIndex:0,
        isFull:false,
        inputValue1:'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8',
        inputValue2:'http://techslides.com/demos/sample-videos/small.mp4',
        inputValue3:''
    };

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

    _handleTextChange = inputValue => {
        this.setState({ inputValue });
    };

    _handleVideoSetting1 = () => {
        this.setState({
            uri:this.state.inputValue1,
            selectIndex:1,
            shouldPlay: false
        });
    };
    _handleVideoSetting2 = () => {
        this.setState({
            uri:this.state.inputValue2,
            selectIndex:2,
            shouldPlay: false
        });
    };
    _handleVideoSetting3 = () => {
        this.setState({
            uri:this.state.inputValue3,
            selectIndex:3,
            shouldPlay: false
        });
    };
    render() {
        let {width,height} = Dimensions.get('window');
        console.log(width);
        console.log(height);

        height = this.state.isFull ? height:height/2;

        return (
            <View style={styles.container}>
                <View style={styles.controlVideo}>
                    <Text style={{textAlign: 'center'}}> Play URL: {this.state.uri} </Text>
                    {/*https://docs.expo.io/versions/v25.0.0/sdk/video.html#content*/}
                    <Video
                        source={{uri: this.state.uri}}
                        shouldPlay={this.state.shouldPlay}
                        resizeMode="cover"
                        rate={1.0}
                        volume={this.state.volume}
                        style={{width, height}}
                        isMuted={this.state.mute}
                    />
                    <View style={styles.controlBar}>
                        {/*https://expo.github.io/vector-icons/*/}
                        <Ionicons
                            name={this.state.mute ? "ios-volume-off" : "ios-volume-up-outline"}
                            size={40}
                            color="white"
                            onPress={this._handleVolume}
                            style={{padding:5}}
                        />
                        <Ionicons
                            name={this.state.shouldPlay ? "ios-pause-outline" : "ios-play-outline"}
                            size={40}
                            color="white"
                            onPress={this._handlePlayAndPause}
                            style={{padding:5}}
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
                <View style={styles.controlUrlBox1}>
                    <TextInput
                        value={this.state.inputValue1}
                        onChangeText={this._handleTextChange}
                        style={{ width: '80%', height: 44, padding: 8, borderWidth: 1, borderColor: '#ccc' }}
                    />
                    <Ionicons
                        name={this.state.selectIndex === 1 ? "ios-radio-button-on-outline": "ios-radio-button-off-outline"}
                        size={40}
                        color="black"
                        onPress={this._handleVideoSetting1}
                        style={{padding:5}}
                    />
                </View>
                <View style={styles.controlUrlBox2}>
                    <TextInput
                        value={this.state.inputValue2}
                        onChangeText={this._handleTextChange}
                        style={{ width: '80%', height: 44, padding: 8, borderWidth: 1, borderColor: '#ccc' }}
                    />
                    <Ionicons
                        name={this.state.selectIndex === 2 ? "ios-radio-button-on-outline": "ios-radio-button-off-outline"}
                        size={40}
                        color="black"
                        onPress={this._handleVideoSetting2}
                        style={{padding:5}}
                    />
                </View>
                <View style={styles.controlUrlBox3}>
                    <TextInput
                        value={this.state.inputValue3}
                        onChangeText={this._handleTextChange}
                        style={{ width: '80%', height: 44, padding: 8, borderWidth: 1, borderColor: '#ccc' }}
                    />
                    <Ionicons
                        name={this.state.selectIndex === 3 ? "ios-radio-button-on-outline": "ios-radio-button-off-outline"}
                        size={40}
                        color="black"
                        onPress={this._handleVideoSetting3}
                        style={{padding:5}}
                    />
                </View>
            </View>

        );
    }
}
//http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8
//https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8
