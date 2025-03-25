import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore';

export const createPost = async ({ photos, location, text }) => {
  const { uid, displayName, photoURL } = getAuth().currentUser;
  const collectionRef = collection(getFirestore(), 'posts');
  const documentRef = doc(collectionRef);
  const id = documentRef.id;
  await setDoc(documentRef, {
    id,
    photos,
    location,
    text,
    user: { uid, displayName, photoURL },
    createdTs: Date.now(),
  });
};

const getOption = ({ after, isMine }) => {
  const collectionRef = collection(getFirestore(), 'posts');

  if (isMine) {
    console.log('isMine', isMine);

    const uid = getAuth().currentUser.uid;
    console.log('uid', uid);
    console.log('after', after);

    return after
      ? query(
          collectionRef,
          where('user.uid', '==', uid),
          orderBy('createdTs', 'desc'),
          startAfter(after),
          limit(10)
        )
      : query(
          collectionRef,
          where('user.uid', '==', uid),
          orderBy('createdTs', 'desc'),
          limit(10)
        );
  } else {
    return after
      ? query(
          collectionRef,
          orderBy('createdTs', 'desc'),
          startAfter(after),
          limit(10)
        )
      : query(collectionRef, orderBy('createdTs', 'desc'), limit(10));
  }
};

export const getPosts = async ({ after, isMine }) => {
  const option = getOption({ after, isMine });
  console.log('option', option);

  const documentSnapshot = await getDocs(option);
  console.log('documentSnapshot', documentSnapshot);

  const list = documentSnapshot.docs.map((doc) => doc.data());
  const last = documentSnapshot.docs[documentSnapshot.docs.length - 1];
  console.log('list', list);
  console.log('last', last);

  return { list, last };
};
