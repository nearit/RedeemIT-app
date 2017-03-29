import React, { Component } from 'react'
import { View } from 'react-native'
import { TextField } from 'react-native-material-textfield'

class MaterialInput extends Component {

  render () {
    return (
      <View style={styles.containerStyle}>
        <TextField
          tintColor='black'
          style={styles.textStyle}
          {...this.props}
          ref={this.props.internalRef}
      />
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
  textStyle: {
    fontSize: 14
  }
}

export { MaterialInput }
