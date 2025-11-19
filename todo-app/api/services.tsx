// import { BASE_URL } from '../../.env.local';

import { Alert } from 'react-native';
import {
  createListState,
  ListItemProps,
  reconcileListId,
  TodoItemProps,
  loadInitialState,
} from '../app/list/listSlice';
import ListItem, { createListItemProps } from '../app/list/listItem';
import Constants from 'expo-constants'; // 1. Import Constants

const debuggerHost = Constants.manifest?.debuggerHost;

if (!debuggerHost) {
  // This is a safety check for when running outside of Expo Go/CLI environment
  console.warn('Could not find debuggerHost. API calls may fail.');
}

// 3. Split the host to get only the IP address
// debuggerHost format: 'IP_ADDRESS:PORT_NUMBER'
const ipAddress = debuggerHost ? debuggerHost.split(':')[0] : 'localhost';
const BASE_URL = `http://${ipAddress}:3000`;
console.log('url: ' + BASE_URL);

/**
 * Sends a POST request to the backend to create a new list.
 * @param list_id The UUID v6 string for the new list.
 * @param title The title of the list.
 * @param list_order The integer position of the list.
 */

// export type CreateListInput = {
//   title: string;
//   list_order: number;
// };

// export type List = {
//   id: number;
//   title: string;
//   list_order: number;
//   created_at: string;
//   // ... other list properties
// };

export const apiCreateList = async (lists: ListItemProps[]) => {
  console.log('HELLO from api calls');
  const url = `${BASE_URL}/lists`;
  lists.map(async (entry) => {
    try {
      const payload = {
        title: entry.title, // change
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Convert the JavaScript object (payload) into a JSON string
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        // Throw an error with the status for better debugging
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response body into a List object and return it
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating list:', error);
      // Re-throw the error so the calling component can handle it
      throw error;
    }
  });
};

export const apiLoadAllData = async () => {
  const url = `${BASE_URL}/lists`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        // This is crucial: tells the backend the request body is JSON
        'Content-Type': 'application/json',
      },
    });
    const { lists, todos } = await response.json();
    // Check if the HTTP status code indicates success (200-299)
    if (response.ok) {
      const result = await response.json();
      console.log('Successfully retrieved lists from backend api: ', result);
      // state.lists[newList.id] = newList;
      // return result;
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
