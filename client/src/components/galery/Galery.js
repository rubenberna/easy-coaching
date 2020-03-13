import React, { useContext } from 'react'
import { AuthContext } from '../../auth/Auth'

import ImageCard from '../cards/ImageCard'
import Loader from '../loader/Loader'

const Galery = () => {
  const { coaches } = useContext(AuthContext)
  const renderGallery = () => {
    if (!coaches.length) return <Loader/>
    else {
      return coaches.map(coach => {
        return (<ImageCard coach={coach} key={coach.name} flashy={true} />)
      })
    }
  }

    return(
      <div className='gallery'>
        <div className='gallery-inner'>
          <h1>Meet our coaching team</h1>
          <div className='gallery-images'>
          { renderGallery() }
          </div>
        </div>
      </div>
    )
}

export default Galery;
