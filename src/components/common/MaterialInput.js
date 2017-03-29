import React from 'react'
import { View } from 'react-native'
import { TextField } from 'react-native-material-textfield'

const MaterialInput = (props) => {
  return (
    <View style={styles.containerStyle}>
      <TextField
        tintColor='black'
        label={props.label}
        style={styles.textStyle}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  )
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
