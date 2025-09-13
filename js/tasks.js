// js/tasks.js
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* Collection ref */
const tasksCol = collection(db, "tasks");

/* Add task */
export async function addTask({ title, description = "", assignedTo = "", deadlineISO, status = "ongoing" }) {
  const deadline = deadlineISO ? Timestamp.fromDate(new Date(deadlineISO)) : null;
  const docRef = await addDoc(tasksCol, {
    title,
    description,
    assignedTo,
    deadline,
    status,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

/* Update task status or fields */
export async function updateTask(taskId, updates) {
  const ref = doc(db, "tasks", taskId);
  if (updates.deadline) updates.deadline = Timestamp.fromDate(new Date(updates.deadline));
  await updateDoc(ref, updates);
}

/* Delete task */
export async function deleteTask(taskId) {
  await deleteDoc(doc(db, "tasks", taskId));
}

/* Single-time fetch (not realtime) */
export async function fetchAllTasks() {
  const q = query(tasksCol, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* Realtime listener: call cb on changes with array of tasks */
export function subscribeTasks(cb) {
  const q = query(tasksCol, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(d => {
      const data = d.data();
      // convert Firestore Timestamps to Date strings for UI
      const deadline = data.deadline?.toDate ? data.deadline.toDate().toISOString() : null;
      return { id: d.id, ...data, deadline };
    });
    cb(tasks);
  }, (err) => {
    console.error("Realtime listener error:", err);
  });
}

/* Utility to check overdue */
export function isOverdue(task) {
  if (!task.deadline) return false;
  const dl = new Date(task.deadline);
  return (task.status !== "completed") && (dl < new Date());
}
