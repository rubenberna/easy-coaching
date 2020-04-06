import { offices } from '../../config/firebaseConfig'

export const officesGET = async () => {
  const snapshot = await offices.get()
  const records = snapshot.docs.map(doc => {
    let office = doc.data()
    office.id = doc.id
    return office
  })

  return records
}

export const officesNEW = async (office) => {
  offices.add({ ...office })
  return  `Office ${office.name} saved`
}