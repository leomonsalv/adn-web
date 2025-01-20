import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { UserCollectionResponse, UserProfileData } from '@/types/user';

export const getUserById = async (userId: string): Promise<UserCollectionResponse> => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('User not found');
    }

    return {
      id: docSnap.id,
      data: docSnap.data() as UserProfileData,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<UserCollectionResponse> => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('User not found');
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      data: doc.data() as UserProfileData,
    };
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};
