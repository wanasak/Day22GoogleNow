import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Util from "./src/utils";

export default class extends Component {
    constructor() {
        super();
        this.state = {
            scale: new Animated.Value(1),
            on: 0,
            scaleOn: 0
        };
    }

    _onMic = () => {
        this.setState({ on: 1 });
        // Scale mic button from 1 to 20
        Animated.timing(this.state.scale, {
            toValue: 20,
            duration: 200,
            easing: Easing.elastic(1)
        }).start(() => {
            this.setState({ scaleOn: 1 });
        });
    };

    _offMic = () => {
        this.setState({ scaleOn: 0 });
        Animated.timing(this.state.scale, {
            toValue: 1,
            duration: 200,
            easing: Easing.elastic(1)
        }).start(() => {
            this.setState({ on: 0 });
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <Icon name="ios-settings" size={25} color="#969696" />
                    <Text style={styles.navText}>SIGN IN</Text>
                    <Icon name="ios-settings" size={25} color="#969696" />
                </View>
                <View style={styles.content}>
                    <Image source={{ uri: "google" }} style={styles.logo} />
                    <View style={styles.btn}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} />
                        </View>
                    </View>
                    <View style={styles.btn}>
                        <TouchableOpacity onPress={this._onMic}>
                            <Animated.View
                                style={[
                                    styles.btnContent,
                                    {
                                        transform: [{ scale: this.state.scale }]
                                    }
                                ]}
                            >
                                {this.state.on ? (
                                    <View
                                        style={[
                                            styles.btnContent,
                                            {
                                                backgroundColor: "#ff3b3e",
                                                top: 8,
                                                transform: [{ scale: 0.05 }]
                                            }
                                        ]}
                                    >
                                        <Icon
                                            name="ios-mic-outline"
                                            size={25}
                                            color="#fff"
                                        />
                                    </View>
                                ) : (
                                    <Icon
                                        name="ios-mic"
                                        size={25}
                                        color="#4285f4"
                                    />
                                )}
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.scaleOn ? (
                    <View style={styles.scaleContainer}>
                        <Text style={styles.scaleText}>Speak Now</Text>
                        <TouchableOpacity
                            style={styles.closeContainer}
                            onPress={() => this._offMic()}
                        >
                            <Icon
                                name="md-close"
                                color="#969696"
                                size={25}
                            />
                            
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Util.size.height,
        width: Util.size.width,
        paddingTop: 30,
        backgroundColor: "#f2f2f2"
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 30,
        paddingHorizontal: 25
    },
    navText: {
        fontSize: 18,
        color: "#969696"
    },
    content: {
        paddingTop: 120
    },
    logo: {
        height: 50,
        resizeMode: "contain"
    },
    btn: {
        width: Util.size.width,
        alignItems: "center",
        justifyContent: "center"
    },
    inputContainer: {
        width: Util.size.width - 80,
        height: 40,
        marginVertical: 40,
        backgroundColor: "#fff",
        shadowColor: "#888",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    input: {
        width: Util.size.width - 100,
        height: 40,
        paddingLeft: 10
    },
    btnContent: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    scaleContainer: {
        position: "absolute",
        height: Util.size.height,
        width: Util.size.width,
        top: 0,
        left: 0,
        alignItems: "center"
    },
    scaleText: {
        color: "#969696",
        fontSize: 25,
        paddingTop: 50,
        backgroundColor: "#fff"
    },
    closeContainer: {
        height: 80,
        width: Util.size.width,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "flex-start"
    }
});
