import React,  {useState} from 'react'
import styled from 'styled-components'
import { Checkbox } from 'react-materialize'

const StyledCheckboxGroup = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 35px;
`

const WeekdaysCheckbox = () => {
  let [weekdays, setWeekdays] = useState([
    { name: 'maandag', value: false },
    { name: 'dinsdag', value: false },
    { name: 'woensdag', value: false },
    { name: 'donderdag', value: false },
    { name: 'vrijdag', value: false }
  ])

  const handleChange = (e) => {
    let day = e.target.value
    let newList = weekdays.map(d => {
      if (d.name === day) d.value = !d.value
      return d
    })
    setWeekdays(newList)
  }

  return(
    <StyledCheckboxGroup>
    { weekdays.map((day, i) =>
      <Checkbox
        label={day.name.substring(0, 2)}
        key={i}
        id={day.name}
        value={day.name}
        checked={day.value}
        onChange={handleChange}
      />
    )}
    </StyledCheckboxGroup>
  )
}

export default WeekdaysCheckbox;
