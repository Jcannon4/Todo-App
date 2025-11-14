import { TodoItemProps } from "./list/listSlice";

export default function consoleLog(a: string) {
  console.log(a);
}

export function logWarn(msg: string) {
  console.warn(msg);
}

export function logObject(obj: any) {
  console.log(obj);
}

export function moveItem<T extends { isComplete: boolean }>(
  items: Record<string, T>,
  order: string[],
  targetId: string,
): string[] {
  const item = items[targetId];
  if (!item) return order;

  // Remove targetId from current order
  const currentIndex = order.indexOf(targetId);
  if (currentIndex === -1) return order;

  const newOrder = [...order];
  newOrder.splice(currentIndex, 1); // remove current position

  // Now decide new position
  if (item.isComplete) {
    // Move to bottom
    newOrder.push(targetId);
  } else {
    // Move to just above first complete item (or bottom if none)
    const firstCompleteIndex = newOrder.findIndex(
      (id) => items[id]?.isComplete,
    );
    if (firstCompleteIndex === -1) {
      newOrder.push(targetId);
    } else {
      newOrder.splice(firstCompleteIndex, 0, targetId);
    }
  }

  return newOrder;
}

export function sortTodoOrder(
  items: Record<string, TodoItemProps>,
  order: string[],
): string[] {
  const incomplete: string[] = [];
  const complete: string[] = [];

  for (const id of order) {
    const item = items[id];
    if (!item) continue;
    if (item.isComplete) complete.push(id);
    else incomplete.push(id);
  }

  return [...incomplete, ...complete];
}
