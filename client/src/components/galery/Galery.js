import React, { Component } from 'react'

import ImageCard from '../cards/ImageCard'
import Loader from '../loader/Loader'

class Galery extends Component {

  renderGallery = () => {
    const {coaches} = this.props
    if (!coaches.length) return <Loader/>
    else {
      return coaches.map(coach => {
        return (<ImageCard coach={coach} key={coach.name} flashy={true} />)
      })
    }
  }

  render() {
    return(
      <div className='gallery'>
        <h2>Meet our team</h2>
        <div className='gallery-images'>
          { this.renderGallery() }
        </div>
      </div>
    )
  }
}

export default Galery;
