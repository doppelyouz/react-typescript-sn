import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deletePost, getPostById, updatePost } from '../../service/postsService'
import { Post } from '../../shared/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'


import s from './onePost.module.scss'

const OnePost: React.FC = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { currentUser } = useSelector((state: RootState) => state.user)

    const { data: post, isLoading, error, isSuccess } = useQuery({
        queryFn: () => getPostById(Number(id)),
        queryKey: ['posts', id]
    })

    const client = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);

    const [newTitle, setNewTitle] = useState('');
    const [newAbout, setNewAbout] = useState('');

    const { mutate: EDIT } = useMutation({
        mutationFn: (post: Post) => updatePost(post),
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ['posts', id] })
        }
    });

    const { mutate: DELETE } = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['posts', 'all'] })
        }
    })

    useEffect(() => {
        if (post) {
            setNewTitle(post.title);
            setNewAbout(post.about);
        }
    }, [post])

    if (error) {
        return <div>Something went wrong</div>
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    };

    const handleAboutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAbout(event.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    const deletePostHandler = () => {
        DELETE(id)
        navigate('/');
    }

    const editPost = () => {
        if (newTitle && newAbout) {
          const newPost: Post = {
            ...post!,
            about: newAbout,
            title: newTitle,
          }
          EDIT(newPost)
          setNewAbout('');
          setNewTitle('');
        }
        setIsEditing(false);
    }

    const editingSwitcher = () => {
        setIsEditing(editing => !editing);
    }

    return (
        <div className={s.post}>
            {
                isSuccess &&

                <>
                    <div className={s.post__image}><img src={post?.image} alt="postImage" /></div>
                    <div className={s.post__info}>
                        {
                            isEditing ?

                                <>
                                    <div className={s.formGroup}>
                                        <label>Title: </label>
                                        <input value={newTitle} onChange={handleTitleChange} />
                                    </div>
                                    <div className={s.formGroup}>
                                        <label>About: </label>
                                        <input value={newAbout} onChange={handleAboutChange} />
                                    </div>
                                </>
                                :

                                <>
                                    <div className={s.post__title}>{post?.title}</div>
                                    <div className={s.post__about}>{post?.about}</div>
                                </>
                        }
                        {
                            currentUser?.id === post?.userId &&
                            <div className={s.post__options}>
                                <button className={s.gradientBtn + ' ' + s.delete} onClick={deletePostHandler}>DELETE</button>
                                {
                                    isEditing
                                        ?

                                        <>
                                            <button className={s.gradientBtn + ' ' + s.edit} onClick={editPost}>YES</button>
                                            <button className={s.gradientBtn + ' ' + s.edit} onClick={editingSwitcher}>NO</button>
                                        </>
                                        :
                                        <button className={s.gradientBtn + ' ' + s.edit} onClick={editingSwitcher}>EDIT</button>
                                }
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default OnePost