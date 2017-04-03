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
    flex: 1
  }
}

export { FooterBar }