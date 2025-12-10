import { Alert } from 'react-native';
import { ListItemProps, TodoItemProps } from '../app/list/listSlice';

// Bring in our IP at runtime and give it a type

// Change 'null' variable to the production endpoint
const backendIP = __DEV__ ? `localhost` : 'localhost';
if (__DEV__) {
  console.log(
    'Application Running in Development environment. Current IP is: ' +
      backendIP
  );
} else {
  console.log('Application Running in Production. Current IP is: ' + backendIP);
}

const BASE_URL = `http://${backendIP}:3000`;
console.log('url: ' + BASE_URL);

/**
 * Handles our asynchronous calls to the backend api.
 * awaits for response from server and formats to json
 * @param endPoint Where in the database we want to make a request
 * @param reqType Request Type. The type of request to made at our endpoint
 * @returns {JSON} data objects and errors
 */

const apiRequest = async (endPoint: string, reqType: string) => {
  const url = `${BASE_URL}/${endPoint}`;
  try {
    const response = await fetch(url, {
      method: reqType,
      headers: {
        // This is crucial: tells the backend the request body is JSON
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    // Check if the HTTP status code indicates success (200-299)
    if (response.ok) {
      console.log(
        `"${reqType}" request from "${endPoint}" successful. Response: `,
        data
      );
      return data;
    } else {
      // Handle server-side errors (e.g., 400 Bad Request, 500 Internal Error)
      const errorData = await response.json();
      console.error('API Error:', errorData.error);
      Alert.alert('Error', `Failed to create list: ${errorData.error}`);
    }
  } catch (error) {
    // Handle network errors (e.g., server is offline, incorrect IP)
    console.error('Network Error:', error);
    Alert.alert(
      'Error',
      'Could not connect to the backend server. Check IP and server status.'
    );
  }
};

/**
 * Sends a POST request to the backend to create a new list.
 * @param {ListItemProps[]} lists - The array of Lists to be created on the backed
 * Each object must include 'title' and 'id' (used as tempId).
 * @returns {Promise<Object[]>} A Promise that resolves to an array of backend responses (JSON format).
 * Each response object should contain 'tempId' and 'realId' for reconciliation.
 */

export async function apiCreateList(lists: ListItemProps[]) {
  const url = BASE_URL + '/lists';
  console.log('URL POST: ' + url);
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lists }),
  });

  return response.json(); // Must return array of mappings
}

// TODO: Update this function to perform await promise.all() like the apiCreateList function
// TODO: Observe the apiCreateList error handling, since the try catch statements could. prove useful
// Consider: what is being returned when errors happen
// TODO: Can we refactor code from this method and apiCreateList
export const apiCreateTodo = async (todos: TodoItemProps[], listID: number) => {
  const url = `${BASE_URL}/todos`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todos, listID }), // Pass our array of todos to add and the parent ID
  });

  return response.json(); // Must return array of mappings
};

export const apiLoadLists = async () => {
  return apiRequest('lists', 'GET');
};

export const apiLoadTodos = async () => {
  return apiRequest('todos', 'GET');
};

export const apiFetchAllData = async () => {
  return apiRequest('data/all', 'GET');
};

export const apiDeleteTodo = async (id: string) => {
  return apiRequest(`todos/${id}`, 'DELETE');
};

export const apiDeleteList = async (id: string) => {
  return apiRequest(`lists/${id}`, 'DELETE');
};

export async function apiEditListName(id: string, title: string) {
  const url = BASE_URL + `/lists/${id}`;
  console.log('URL UPDATE: ' + url);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  return response.json(); // Must return array of mappings
}

export async function apiToggleTodo(id: string, isComplete: boolean) {
  const url = BASE_URL + `/todos/${id}`;
  console.log('URL UPDATE: ' + url);
  let boolValue = 0; // default to 0 "FALSE"
  if (!isComplete) {
    // Toggle 0 to 1
    boolValue = 1;
  }
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ boolValue }),
  });

  return response.json();
}
