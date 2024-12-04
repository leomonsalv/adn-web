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
  pageSize = 25,
  lastVisible: any,
) => {
  try {
    const baseQuery = query(
      collection(db, "orders"),
      where("clientId", "==", userId),
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
    console.log("ORDENES", orders, "LASTODOC", lastDoc);
    return { orders, lastVisible: lastDoc };
  } catch (error) {
    console.error("Error fetching paginated orders:", error);
    throw error;
  }
};

// export const fetchOrdersHistoric = async (userId: string) => {
//   try {
//     const first = query(
//       collection(db, "orders"),
//       where("clientId", "==", userId),
//     );
//     const documentSnapshots = await getDocs(first);
//     if (!documentSnapshots.size) throw new Error("No tiene ordenes");
//     return documentSnapshots.docs.map((doc) => doc.data()) ?? initialOrderState;
//   } catch (error) {
//     // if error is zod error, log the error
//     if (error instanceof z.ZodError) {
//       console.error("Invalid Orders:", error.errors);
//     } else {
//       return initialOrderState;
//     }
//     return initialOrderState;
//   }
// };
