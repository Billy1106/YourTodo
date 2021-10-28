import firebase from "firebase/compat/app";
import { collection, addDoc } from "firebase/firestore";
import {db} from "./firebase"
import { updateDoc,doc, getDoc,getDocs,query,where,orderBy,deleteDoc } from "firebase/firestore";

export const initGet = async(uid) => {
    const q = query(collection(db, "todo"), where("uid", "==", uid), orderBy("createdAt"));
    const docSnap = await getDocs(q);

    let todos = [];
    docSnap.forEach((doc) =>{
        todos.push({
            id:doc.id,
            content:doc.data().content,
            isCompleted:doc.data().isCompleted
        });
    });  
    return todos;
}

export const toggleComplete = async (id)=>{
    const query = doc(db, "todo", id);
    const q = await getDoc(query);
    await updateDoc(query,{
        isCompleted:!q.data().isCompleted,
    })
}

export const addTodo = async (content,uid)=>{
    await addDoc(collection(db, "todo"), {
        content: content,
        uid: uid,
        isCompleted:false,
        createdAt:firebase.firestore.FieldValue.serverTimestamp()
      });
}

export const todoDelete = async (id)=>{
    await deleteDoc(doc(db, "todo", id));
}
