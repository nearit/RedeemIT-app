import React from 'react'
import { CardSection } from './index'

const FooterBar = ({children}) => {
  const {
    ContainerStyle
  } = styles

  return (
    <CardSection style={ContainerStyle}>
      {children}
    </CardSection>
  )
}

const styles = {
  ContainerStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    elevation: 5
  }
}

export { FooterBar }