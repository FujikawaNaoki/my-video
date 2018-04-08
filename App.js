import React from 'react';
import {
    View,
    Dimensions,
    Text
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
    Button,
    ButtonGroup
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
            age: null,
            cnt: "  ",
            selected0Index: null,
            selectedIndex: 0,
            selected2Index: null,
            selected3Index: 0
        };

        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);

        this.update0Index = this.update0Index.bind(this);
        this.updateIndex = this.updateIndex.bind(this);
        this.update2Index = this.update2Index.bind(this);
        this.update3Index = this.update3Index.bind(this);
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

    update0Index(selected0Index) {
        if (this.state.selected0Index === null) {
            this.setState({
                selected0Index: 0,
                id: 1234567890,
                name: "東京　太郎",
                sex: "男",
                age: 40,
                cnt: " 1"
            })
        } else {
            this.setState({
                selected0Index: null,
                id: null,
                name: null,
                sex: null,
                age: null,
                cnt: "  "
            })
        }
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    update2Index(selected2Index) {
        this.state.selected2Index === null ? this.setState({selected2Index: 0}) : this.setState({selected2Index: null})

    }

    update3Index(selected3Index) {
        this.setState({selected3Index})
    }

    render() {
        let {width, height} = Dimensions.get('window');

        const buttons = ['記録', '取消', '終了'];
        const buttons2 = ["1", "2", "3", "4"];

        const {selected0Index, selectedIndex, selected2Index, selected3Index} = this.state;

        width = this.state.isFull ? width * 0.99 : width * 0.8;
        height = height * (width / 1520);

        return (
            <View style={{flex: 1}}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'gray',
                        paddingTop: 25,
                        paddingBottom: 5
                    }}>
                    <ButtonGroup
                        textStyle={{color: "white"}}
                        onPress={this.update0Index}
                        selectedIndex={selected0Index}
                        buttons={["患者情報取得"]}
                        containerStyle={{height: 35, width: 150, borderRadius: 10, backgroundColor: "gray"}}
                    />
                    <FormLabel labelStyle={{color: "white", fontSize: 22, width: 180}}>ID:{this.state.id}</FormLabel>
                    <FormLabel labelStyle={{color: "white", fontSize: 22, width: 180}}>氏名:{this.state.name}</FormLabel>
                    <FormLabel labelStyle={{color: "white", fontSize: 22, width: 100}}>年齢:{this.state.age}</FormLabel>
                    <FormLabel labelStyle={{color: "white", fontSize: 22, width: 100}}>性別:{this.state.sex}</FormLabel>
                    <FormLabel labelStyle={{color: "white", fontSize: 22, width: 100}}>{this.state.cnt}枚</FormLabel>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'gray',
                        paddingTop: 10,
                        paddingBottom: 10
                    }}>
                    <ButtonGroup
                        textStyle={{color: "white"}}
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 35, width: 250, borderRadius: 10, backgroundColor: "gray"}}
                    />
                    <ButtonGroup
                        textStyle={{color: "white"}}
                        onPress={this.update2Index}
                        selectedIndex={selected2Index}
                        buttons={["Voice"]}
                        containerStyle={{height: 35, width: 80, borderRadius: 10, backgroundColor: "gray"}}
                    />
                    <ButtonGroup
                        textStyle={{color: "white"}}
                        onPress={this.update3Index}
                        selectedIndex={selected3Index}
                        buttons={buttons2}
                        containerStyle={{height: 35, width: 250, borderRadius: 10, backgroundColor: "gray"}}
                    />

                </View>
                <View style={{flex: 17, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
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
