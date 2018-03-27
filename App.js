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
    controlUrlBox: {
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
        shouldPlay: true,
        volume: 1.0,
        uri: "",
        inputValue:'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8',
    };

    _handlePlayAndPause = () => {
        this.setState((prevState) => ({
            shouldPlay: !prevState.shouldPlay
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

    _handleVideoSetting = () => {
        this.setState({uri:this.state.inputValue})
    };

    render() {
        const {width} = Dimensions.get('window');

        return (
            <View style={styles.container}>
                <View>
                    <Text style={{textAlign: 'center'}}> Video-Player </Text>
                    {/*https://docs.expo.io/versions/v25.0.0/sdk/video.html#content*/}
                    <Video
                        source={{uri: this.state.uri}}
                        shouldPlay={this.state.shouldPlay}
                        resizeMode="cover"
                        rate={1.0}
                        volume={this.state.volume}
                        style={{width, height: 300}}
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
                    </View>
                </View>
                <View style={styles.controlUrlBox}>
                    <TextInput
                        value={this.state.inputValue}
                        onChangeText={this._handleTextChange}
                        style={{ width: 200, height: 44, padding: 8, borderWidth: 1, borderColor: '#ccc' }}
                    />
                    <Ionicons
                        name="ios-attach-outline"
                        size={40}
                        color="black"
                        onPress={this._handleVideoSetting}
                        style={{padding:5}}
                    />
                </View>
            </View>

        );
    }
}
//http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8
//https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8
