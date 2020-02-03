import React from 'react';
import { Button, Icon } from 'react-materialize'

export const AddProfileBtn = ({ setView }) => {
  return (
    <>
      <Button
        className="red floating-btn"
        floating
        icon={<Icon>add</Icon>}
        large
        node="button"
        waves="light"
        fab={{
          direction: 'right'
        }}
        onClick={e => setView('newCoach')}
      />
    </>
  )
}

export const AdminBtn = ({ setView }) => {
  return (
    <>
      <Button
        className="red floating-btn"
        floating
        icon={<Icon>insert_chart</Icon>}
        large
        node="button"
        waves="light"
        fab={{
          direction: 'right'
        }}
        onClick={e => setView('edit')}
      />
    </>
  )
}
