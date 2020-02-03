import React from 'react'
import { withRouter } from 'react-router-dom'

import './card.scss'

const ImageCard = (props) => {
  const { coach, flashy, bigger } = props

  const greyScale = flashy ? 'flashy' : '';
  const bigFrame = bigger ? 'bigger' : '';
  const classes = `img-frame ${greyScale} ${bigFrame}`

  return(
    <>
      <div
        className={ classes }
        onClick={ e => props.history.push(`/profile/${coach.name}`) }>
        <img alt={ coach.name } src={ coach.photo } />
        <span>{ coach.name }</span>
      </div>
    </>
  )
}

export default withRouter(ImageCard);
