import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/user';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../service/postsService';
import { Post as PostType } from '../../shared/types';
import Post from '../../components/post/Post';

import { useDispatch } from 'react-redux';

import s from './profile.module.scss'


const Profile: React.FC = () => {

  const [yourPosts, setYourPosts] = useState<PostType[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.user)

  const {data: posts, isLoading, error, isSuccess} = useQuery({
    queryFn: () => getPosts(3, 1),
    queryKey: ['posts', 'all']
  })

  useEffect(() => {
    if(isSuccess && !isLoading && !error) {
      setYourPosts(posts.filter(post => post.userId === currentUser?.id))
    }
  }, [currentUser?.id, error, isLoading, isSuccess, posts])

  const dispatch = useDispatch();

  console.log(yourPosts);

  if(error) {
    return <div>Something went wrong</div>
  }
  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    currentUser && 
    <div className={s.profile}>
      <img className={s.profile__image} src={currentUser.image} alt={currentUser.username} />
      <div className={s.profile__username}>{currentUser.username}</div>
      <div className={s.profile__email}>{currentUser.email}</div>
      <button className={s.profile__options} onClick={() => dispatch(logout())}>Log out</button>
      <button className={s.profile__options}>Settings</button>
      {
        yourPosts.length > 0 &&
        <div className={s.profile__posts}>
          {
            yourPosts.map(post =>
              <Post post={post} key={post.id} />
            )
          }
        </div>
      }
    </div>
  )
}

export default Profile