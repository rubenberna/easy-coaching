import React, {useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { getDelightedData, getDelightedTrend } from '../modules/delightedQueries'
import { getAllAccounts } from '../modules/sfQueries'

const Nps = () => {
  const [npsData, setNPSData] = useState([])
  const [accountsList, setAccountsList] = useState([])

  useEffect(() => {
    async function getData() {
      const nps = await getDelightedTrend()
      console.log(nps);
      setNPSData(nps)
    }
    getData()
  }, [])

  useEffect(() => {
    async function getAccounts() {
      const res = await getAllAccounts()
      setAccountsList(res)
    }
    getAccounts()
  }, [])

  const renderTableBody = () => {
    return accountsList.map((acc, i) => {
      return (
        <tr key={i}>
          <td>{i}</td>
          <td>{acc}</td>
          <td>{acc}</td>
          <td>{acc}</td>
          <td>{acc}</td>
        </tr>
      )
    })
  }

  // const getPromoters = async accountName => {
  //   if (npsData) {
  //     let promoters = await npsData.filter(item => item.score >= 8 && item.person_properties.kantoor === 'Middelkerke')
  //     console.log(promoters.length);
  //   }
  // }

  return(
    <div className='container'>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Account</th>
          <th>Promoters</th>
          <th>Passive</th>
          <th>Detractors</th>
        </tr>
      </thead>
      <tbody>
        {renderTableBody()}
      </tbody>
      </Table>
    </div>
  )
}

export default Nps;
