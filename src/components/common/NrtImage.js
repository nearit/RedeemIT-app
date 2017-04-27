import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { readResource } from '../../services/ApiManager'

class NrtImage extends Component {
  state = {imageUrl: ''}

  componentDidMount () {
    readResource('/media/images/' + this.props.imageId)
      .then(({data}) => {
        const {image} = data
        this.setState({imageUrl: image.square_300.url})
      })
      .catch((error) => {
        this.setState({imageUrl: ''})
      })
  }

  renderImage () {
    const {imageUrl} = this.state
    const {defaultImage, style} = this.props

    if (imageUrl) {
      return (
        <Image
          source={{uri: imageUrl}}
          style={style}
        />
      )
    }

    return (
      <Image
        source={defaultImage}
        style={style}
      />
    )

  }

  render () {
    return (
      <View>
        {this.renderImage()}
      </View>
    )
  }
}

export { NrtImage }