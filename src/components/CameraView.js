import React, { Component } from 'react'
import { StatusBar, Text, BackAndroid } from 'react-native'
import Camera from 'react-native-camera'
import { connect } from 'react-redux'
import { BorderView, CardSection, FooterBar, IconButton } from './common'
import { logoutUser, couponDetected } from '../actions'

class CameraView extends Component {

  constructor (props) {
    super(props)

    this.handleBack = this.handleBack.bind(this)
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    //Forgetting to remove the listener will cause pop executes multiple times
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack () {
    this.onLogoutPress()
    return true
  }

  onLogoutPress () {
    this.props.logoutUser()
  }

  onBarCodeRead ({data}) {
    const {serialCode, couponDetected} = this.props

    if (!serialCode) {
      couponDetected(data)
    }
  }

  render () {
    const {
      PageStyle,
      HintContainerStyle,
      HintStyle,
      ViewFinderContainerStyle,
      ViewFinderStyle
    } = styles

    return (
      <Camera
        style={PageStyle}
        aspect={Camera.constants.Aspect.fill}
        onBarCodeRead={(event) => this.onBarCodeRead(event)}>

        <StatusBar barStyle='light-content'
                   translucent={true}
                   backgroundColor={'rgba(0, 0, 0, 0.1)'}/>

        <CardSection style={HintContainerStyle}>
          <Text style={HintStyle}>Inquadra il QR code con la fotocamera</Text>
        </CardSection>

        <CardSection style={ViewFinderContainerStyle}>
          <BorderView style={ViewFinderStyle}/>
        </CardSection>

        <FooterBar>
          <IconButton
            onPress={this.onLogoutPress.bind(this)}
            label='Logout'
            icon={require('../assets/unlock.png')}
          />
        </FooterBar>
      </Camera>
    )
  }

}

const styles = {
  PageStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  HintContainerStyle: {
    flex: 1
  },
  HintStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: 'center'
  },
  ViewFinderContainerStyle: {
    flex: 2
  },
  ViewFinderStyle: {
    alignSelf: 'center',
    width: 300,
    height: 300
  }
}

const mapStateToProps = ({coupon}) => {
  const {serialCode} = coupon

  return {
    serialCode
  }
}

export default connect(mapStateToProps, {logoutUser, couponDetected})(CameraView)