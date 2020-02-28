import React from 'react'
import PieChart from 'react-minimal-pie-chart';

const legendFrame = {
  width: '15px',
  color: 'transparent',
  borderRadius: '50%',
  marginRight: '3px'
}

const textStyle = {
  fontSize: '12px',
  fontWeight: 300
}

const Chart = ({tasks}) => {

  const getCount = title => {
    const count = tasks.filter(t => t.status === title)
    return count.length
  }

  const data = [
    { title: 'Not started', value: getCount('not started'), color: '#35495e'},
    { title: 'Planned', value: getCount('planned'), color: '#63b7af'},
    { title: 'Feedback call', value: getCount('feedback call'), color: '#ee8572'},
    { title: 'Completed', value: getCount('completed'), color: '#347474'},
    { title: 'Cancelled', value: getCount('cancelled'), color: '#b71c1c'},
  ]

  return(
    <>
      <PieChart
        data={data}
        animate={false}
        cx={50}
        cy={50}
        label
        labelPosition={60}
        labelStyle={{
          fontFamily: 'sans-serif',
          fontSize: '5px'
        }}
        lengthAngle={360}
        lineWidth={20}
        onClick={undefined}
        onMouseOut={undefined}
        onMouseOver={undefined}
        paddingAngle={18}
        radius={50}
        rounded
        startAngle={0}
        viewBoxSize={[
          100,
          100
        ]}
      />
      <div className='legends'>
        <div>
          <p style={textStyle}><span style={{...legendFrame, ...{backgroundColor: '#35495e'}}}>he</span>Not started</p>
          <p style={textStyle}><span style={{...legendFrame, ...{backgroundColor: '#63b7af'}}}>he</span>Planned</p>
          <p style={textStyle}><span style={{...legendFrame, ...{backgroundColor: '#ee8572'}}}>he</span>Feedback call</p>
        </div>
        <div>
          <p style={textStyle}><span style={{...legendFrame, ...{backgroundColor: '#347474'}}}>he</span>Completed</p>
          <p style={textStyle}><span style={{...legendFrame, ...{backgroundColor: '#b71c1c'}}}>he</span>Cancelled</p>
        </div>
      </div>
    </>
  )
}

export default Chart;
