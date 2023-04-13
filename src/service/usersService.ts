
import axios from 'axios';
import { User } from '../shared/types';

const endpoint = "http://localhost:3001/";

export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get(endpoint + 'users');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createUser(user: User): Promise<User | undefined> {
  try {
    const response = await axios.post(endpoint + 'users', user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}