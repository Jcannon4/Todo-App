// import { BASE_URL } from '../../.env.local';

import { Alert } from 'react-native';
import {
  createListState,
  ListItemProps,
  reconcileListId,
  TodoItemProps,
} from '../app/list/listSlice';
import { DEV_IP_ADDRESS } from '@env';

// Change 'null' variable to the production endpoint
const backendIP = __DEV__ ? `${DEV_IP_ADDRESS}` : null;
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

interface ListMapping {
  tempId: string;
  realId: number;
  order: number;
}

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

  // todos.map(async (entry) => {
  //   try {
  //     const payload = {
  //       list_id: listID, //TODO change to dynamic data not a static variable
  //       msg: entry.msg,
  //     };
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       // Convert the JavaScript object (payload) into a JSON string
  //       body: JSON.stringify(payload),
  //     });
  //     if (!response.ok) {
  //       // Throw an error with the status for better debugging
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     // Parse the JSON response body into a List object and return it
  //     const data = await response.json();

  //     return data;
  //   } catch (error) {
  //     console.error('Error creating list:', error);
  //     // Re-throw the error so the calling component can handle it
  //     throw error;
  //   }
  // });
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

export const deleteTodo = async (id: number) => {};
