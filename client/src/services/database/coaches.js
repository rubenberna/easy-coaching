import { coaches, storageRef } from '../../config/firebaseConfig'

export const coachesGET = async () => {
  const snapshot = await coaches.get()
  const records = snapshot.docs.map(doc => {
    let coach = doc.data()
    coach.id = doc.id
    return coach
  })
  return records
}

export const coachesSingleGET = async (name) => {
  const snapshot = await coaches.where('name', '==', name).get()
  const record = snapshot.docs.map(doc => doc.data())
  return record
}

export const coachesNEW = async (coach) => {
  const photoURL = await uploadPhoto(coach.photo)
  coach.photo = photoURL
  coaches.add({ ...coach })
  return `Coach ${coach.name} saved`
}

export const coachesPUT = async (coach) => {
  if (coach.img) {
    coach.photo = await uploadPhoto(coach.img)
  }
  const coachRef = coaches.doc(coach.id)
  coachRef.update({
    name: coach.name,
    email: coach.email,
    intro: coach.intro,
    role: coach.role,
    started: coach.started,
    calendarColor: coach.calendarColor,
    photo: coach.photo,
  })
  return `Coach ${coach.name} updated`
}

const uploadPhoto = async photo => {
  const imageRef = storageRef.child(photo.name)
  const upload = await imageRef.put(photo)
  const url = await upload.ref.getDownloadURL()
  return url
}

