import { useState, useEffect } from 'react'

export const useFormInput = (initialValue) => {
  const [ value, setValue ] = useState(initialValue)

  function handleChange(e) {
    console.log(e.target.value);
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}
