/*
 * A smart barcode scanner for react-native apps
 * https://github.com/react-native-component/react-native-smart-barcode/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */


import React, {
    Component,
    ViewPropTypes
} from 'react'
import {
    View,
    requireNativeComponent,
    NativeModules,
    AppState,
    Platform,
} from 'react-native'

const BarcodeManager = Platform.OS == 'ios' ? NativeModules.Barcode : NativeModules.CaptureModule


export default class Barcode extends Component {

    static defaultProps = {
        barCodeTypes: Object.values(BarcodeManager.barCodeTypes),
        scannerRectWidth: 255,
        scannerRectHeight: 255,
        scannerRectTop: 0,
        scannerRectLeft: 0,
        scannerLineInterval: 3000,
        scannerRectCornerColor: `#09BB0D`,
    }

    static propTypes = {
        ...ViewPropTypes,
        onBarCodeRead: React.PropTypes.func.isRequired,
        barCodeTypes: React.PropTypes.array,
        scannerRectWidth: React.PropTypes.number,
        scannerRectHeight: React.PropTypes.number,
        scannerRectTop: React.PropTypes.number,
        scannerRectLeft: React.PropTypes.number,
        scannerLineInterval: React.PropTypes.number,
        scannerRectCornerColor: React.PropTypes.string,
    }

    render() {
        return (
            <NativeBarCode
                {...this.props}
            />
        )
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    startScan() {
        BarcodeManager.startSession()
    }

    stopScan() {
        BarcodeManager.stopSession()
    }

    _handleAppStateChange = (currentAppState) => {
        if(currentAppState !== 'active' ) {
            this.stopScan()
        }
        else {
            this.startScan()
        }
    }
}

const NativeBarCode = requireNativeComponent(Platform.OS == 'ios' ? 'RCTBarcode' : 'CaptureView', Barcode)
