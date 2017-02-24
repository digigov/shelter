import React, { PropTypes, Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Camera from 'react-native-camera';
import IconButton from '../IconButton/IconButton';
import color from '../../assist/color';
import size from '../../assist/size';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  maskCover: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: color.mask,
  },
  maskCoverTop: {
    top: 0,
  },
  maskCoverBottom: {
    bottom: 0,
  },
  marginCover: {
    position: 'absolute',
    width: size.margin * 1.5,
    backgroundColor: color.mask,
  },
  marginCoverLeft: {
    left: 0,
  },
  marginCoverRight: {
    right: 0,
  },
  scanner: {
    position: 'absolute',
    left: size.margin * 1.5,
    right: size.margin * 1.5,
  },
  aligner: {
    position: 'absolute',
    width: size.input,
    height: size.input * 0.8,
    borderColor: color.background,
    borderWidth: 4,
  },
  alignerTopLeft: {
    top: -2,
    left: -2,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  alignerTopRight: {
    top: -2,
    right: -2,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  alignerBottomLeft: {
    bottom: -2,
    left: -2,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  alignerBottomRight: {
    bottom: -2,
    right: -2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  scanline: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EC4B3A',
  },
  scanlineBottom: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: size.input,
    marginHorizontal: size.margin * 1.5,
  },
});

export default class extends Component {

  static displayName = 'ScanMask';

  static propTypes = {
    ratio: PropTypes.number,
    onBarCodeRead: PropTypes.func.isRequired,
  }

  static defaultProps = {
    ratio: 1,
  }

  state = {
    torch: Camera.constants.TorchMode.off,
    width: 100,
    height: 100,
    scannerWidth: 50,
    scannerHeight: 50,
  }

  componentDidMount = () => this.scanlineAnimated();

  onLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    const scanner = width - (size.margin * 1.5 * 2);

    this.setState({
      width,
      height,
      scannerWidth: scanner,
      scannerHeight: scanner / this.props.ratio,
    });
  }

  onTorchPress = () => {
    const { torch } = this.state;

    this.setState({
      torch: torch === Camera.constants.TorchMode.off ?
        Camera.constants.TorchMode.on : Camera.constants.TorchMode.off,
    });
  }

  scanlineAnimated = () => {
    this.scanline.setValue(0);
    Animated
      .timing(this.scanline, { toValue: 1, duration: 1000 })
      .start(() => this.scanlineAnimated());
  }

  scanline = new Animated.Value(0);

  render() {
    const { onBarCodeRead } = this.props;
    const { torch, width, height, scannerWidth, scannerHeight } = this.state;

    return (
      <View style={sh.viewport} onLayout={this.onLayout}>
        <Camera
          keepAwake
          style={sh.camera}
          torchMode={torch}
          onBarCodeRead={onBarCodeRead}
        />
        <View
          style={[
            sh.maskCover,
            sh.maskCoverTop,
            { width, height: (height - scannerHeight) / 2 },
          ]}
        />
        <View
          style={[
            sh.maskCover,
            sh.maskCoverBottom,
            { width, height: (height - scannerHeight) / 2 },
          ]}
        />
        <View
          style={[
            sh.marginCover,
            sh.marginCoverLeft,
            { height: scannerHeight, top: (height - scannerHeight) / 2 },
          ]}
        />
        <View
          style={[
            sh.marginCover,
            sh.marginCoverRight,
            { height: scannerHeight, top: (height - scannerHeight) / 2 },
          ]}
        />
        <View
          style={[
            sh.scanner,
            { width: scannerWidth, height: scannerHeight, top: (height - scannerHeight) / 2 },
          ]}
        >
          <Animated.View
            style={[sh.scanline, { opacity: this.scanline.interpolate({
              inputRange: [0, 0.2, 0.6, 1],
              outputRange: [0, 1, 0.4, 1],
            }) }]}
          />
          <View style={sh.scanlineBottom} />
          <View style={[sh.aligner, sh.alignerTopLeft]} />
          <View style={[sh.aligner, sh.alignerTopRight]} />
          <View style={[sh.aligner, sh.alignerBottomLeft]} />
          <View style={[sh.aligner, sh.alignerBottomRight]} />
        </View>
        <View style={sh.toolbar}>
          <IconButton name="highlight" size={size.input} onPress={this.onTorchPress} />
        </View>
      </View>
    );
  }
}
