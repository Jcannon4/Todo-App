import { TodoState } from "../todo/todoSlice";

export const feederData: TodoState = {
  data: [
    { id: "a1", msg: "Item A", isComplete: false },
    { id: "b2", msg: "Item B", isComplete: false },
    { id: "c3", msg: "Item C", isComplete: false },
    { id: "d4", msg: "Item D", isComplete: true },
  ],

  completed: [{ id: "d4", msg: "Item D", isComplete: true }],
  incomplete: [
    { id: "a1", msg: "Item A", isComplete: false },
    { id: "b2", msg: "Item B", isComplete: false },
    { id: "c3", msg: "Item C", isComplete: false },
  ],
  count: 0,
};
