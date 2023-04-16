import React, { useState } from 'react'

import { createPost } from '../../service/postsService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '../../shared/types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';

import styles from './newPost.module.scss'

const NewPost: React.FC = () => {
  
  const { currentUser } = useSelector((state: RootState) => state.user)

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [about, setAbout] = useState("");
  
  const client = useQueryClient();
  const navigate = useNavigate();

  const {mutate: create} = useMutation({
      mutationFn: createPost,
      onSuccess: () => {
          client.invalidateQueries({queryKey: ['posts', 'all']})
      }
  })

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };

  const handleAboutChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAbout(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const post: Post = {
      title,
      about,
      image,
      userId: Number(currentUser?.id)
    }
    create(post)
    navigate('/');

    setTitle('')
    setAbout('')
    setImage('')
  };

  return (
    <div className={styles.newPost}>
      <div
        className={styles.gradientForm}
        style={{
          background: `linear-gradient(to right bottom, #FDB813, #FF5F00)`,
        }}
      >
        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Title:</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Image:</label>
              <input
                type="text"
                required
                value={image}
                onChange={handleImageChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Сообщение:</label>
              <textarea
                required
                value={about}
                onChange={handleAboutChange}
              />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPost