import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { z } from "zod";

export const fetchOrdersHistoric = async (
  userId: string,
  pageSize = 5,
  lastVisible: any,
) => {
  try {
    const baseQuery = query(
      collection(db, "orders"),
      where("clientId", "==", userId),
      orderBy("date", "desc"),
      ...(lastVisible ? [startAfter(lastVisible)] : []),
      limit(pageSize),
    );

    const documentSnapshots = await getDocs(baseQuery);

    if (!documentSnapshots.size) {
      return { orders: [], lastVisible: null };
    }

    const orders = documentSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { orders, lastVisible: lastDoc };
  } catch (error) {
    console.error("Error fetching paginated orders:", error);
    throw error;
  }
};
