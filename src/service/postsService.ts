
import axios from 'axios';
import { Post } from '../shared/types';

const endpoint = "http://localhost:3001/";

export async function getPosts(): Promise<Post[]> {
  try {
      const response = await axios.get(endpoint + `posts`);
      return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPostsByFirstTime(): Promise<Post[]> {
  try {
      const response = await axios.get(endpoint + `posts?_limit=9`);
      return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function getPostsByPages(limit: number, page: number): Promise<Post[]> {
  try {
      const response = await axios.get(endpoint + `posts?_limit=${limit}&_page=${page}`);
      return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPostById(id: number): Promise<Post> {
    try {
      const response = await axios.get(endpoint + 'posts/' + id);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to getPostById.');
    }
}

export async function createPost(post: Post): Promise<Post> {
  try {
    const response = await axios.post(endpoint + 'posts', post);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create post.');
  }
}

export async function deletePost(id: string | undefined): Promise<void> {
  try {
    if(id) {
      axios.delete(endpoint + 'posts/' + id);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete post.');
  }
}

export async function updatePost(post: Post): Promise<Post> {
  try {
    const response = await axios.put(endpoint + 'posts/' + post.id, post);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update post.');
  }
}