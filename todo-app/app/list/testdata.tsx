import { TodoState } from "./listSlice";

export const feederData: TodoState = {
  data: [
    { id: "a1", msg: "updated mapping", isComplete: false },
    { id: "b2", msg: "Item B", isComplete: false },
    { id: "c3", msg: "Item C", isComplete: false },
    { id: "d4", msg: "Item Deez nutz", isComplete: true },
  ],
  count: 0,
};
