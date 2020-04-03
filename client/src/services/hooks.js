import { useState } from 'react'

export const useFormInput = (initialValue) => {
  const [ value, setValue ] = useState(initialValue)

  function handleChange(e) {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}
