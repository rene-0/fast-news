import { initializeApp } from 'firebase/app'
import { CollectionReference, DocumentData, Query, collection, getDocs, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBY_IDsli6aUHUxpkdwK2vYeL2-MEtqwzU',
  authDomain: 'fast-news-a9467.firebaseapp.com',
  projectId: 'fast-news-a9467',
  storageBucket: 'fast-news-a9467.appspot.com',
  messagingSenderId: '754269052647',
  appId: '1:754269052647:web:fcfed6d6f8f336466a0c42',
}

export const app = initializeApp(firebaseConfig)
export const fireStoreDatabase = getFirestore(app)

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(fireStoreDatabase, collectionName) as CollectionReference<T>
}

export const getDocsDataWithId = async <T>(query: Query<T, DocumentData>): Promise<T[]> => {
  const { docs } = await getDocs(query)
  return docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}