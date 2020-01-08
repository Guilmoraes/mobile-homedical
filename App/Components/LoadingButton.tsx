import * as React from "react";
import {Image, Text, TouchableOpacity, View, Animated, Easing} from "react-native";
import styles from "./Styles/LoadingButtonStyle";

export interface Props {
  title: string,
  onButtonPressed: () => void,
  viewStyle: any,
  buttonStyle?: any,
  icon?: any,
  iconStyle?: any,
  textStyle?: any,
  isLoading?: boolean,
  loadingImage?: any
}

export interface State {
}

export default class LoadingButton extends React.Component<Props, State> {


  constructor(props: Props) {
    super(props);
  }

  componentWillMount(){
    this._angle = new Animated.Value(0);
  }

  componentDidMount() {
    this._animate();
  }

  _animate() {
    this._angle.setValue(0);
    Animated.timing(this._angle, {
      toValue: 360,
      duration: 2000,
      easing: Easing.linear
    }).start(() => this._animate());
  }

  public render() {
    const {title, onButtonPressed, icon, iconStyle, buttonStyle, textStyle, isLoading, loadingImage} = this.props;
    return (

      <View style={this.props.viewStyle}>
        <TouchableOpacity
          style={buttonStyle ? [styles.buttonStyle, buttonStyle] : styles.buttonStyle}
          onPress={() => onButtonPressed()}>

          {
            isLoading ?
              <Animated.Image
                style={[
                  styles.loading,
                  {transform: [
                      {rotate: this._angle.interpolate({inputRange: [0, 360],outputRange: ["0deg", "360deg"]})},
                    ]},
                ]}
                source ={loadingImage ? loadingImage : require("../Images/loading-icon.png")}
              />
              :
            icon ?
              <Image style={iconStyle ? [styles.iconStyle, iconStyle] : styles.iconStyle} source={icon}/> : <View/>
          }

          {
            !isLoading ?
            <Text style={textStyle ? [styles.buttonText, textStyle] : styles.buttonText}>{title}</Text> : <Text/>
          }

        </TouchableOpacity>
      </View>
    );
  }
}
