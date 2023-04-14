
import axios from 'axios';
import { Post } from '../shared/types';

const endpoint = "http://localhost:3001/";

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await axios.get(endpoint + 'posts');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPostById(id: string): Promise<Post | undefined> {
    try {
      const response = await axios.get(endpoint + 'posts/' + id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

export async function createPost(post: Post): Promise<Post | undefined> {
  try {
    const response = await axios.post(endpoint + 'posts', post);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}