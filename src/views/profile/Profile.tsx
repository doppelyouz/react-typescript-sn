import React, { useEffect, useMemo, useState } from 'react'

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

  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;
  const dispatch = useDispatch();
  
  const {data, isLoading, error, isSuccess} = useQuery({
    queryFn: getPosts,
    queryKey: ['posts', 'all']
  })
  
  useEffect(() => {
    if(isSuccess) {
      const yourPosts = data.filter(post => post.userId === currentUser?.id)
      setYourPosts(yourPosts);
    }
  }, [currentUser?.id, data, isSuccess])

  useMemo(() => {
    setPosts(yourPosts.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage))
  }, [currentPage, yourPosts])

  if(error) {
    return <div>Something went wrong</div>
  }

  if(isLoading) {
    return <div>Loading...</div>
  }

  const prevPage = () => {
    setCurrentPage(prev => prev - 1)
  }

  const nextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  const nextChecker = Math.ceil(yourPosts.length / 3) - 1 <= currentPage;
  

  return (
    currentUser && 
    <div className={s.profile}>
      <img className={s.profile__image} src={currentUser.image} alt={currentUser.username} />
      <div className={s.profile__username}>{currentUser.username}</div>
      <div className={s.profile__email}>{currentUser.email}</div>
      <button className={s.profile__options} onClick={() => dispatch(logout())}>Log out</button>
      <button className={s.profile__options}>Settings</button>
      {
        posts.length > 0 &&
        <div className={s.profile__posts}>
          {
            posts.map(post =>
              <Post post={post} key={post.id} />
            )
          }
        </div>
      }
      {
        yourPosts.length > 0 && 
        <div className={s.profile__pagination}>
          <button className={s.profile__options} onClick={prevPage} disabled={currentPage === 0}>Prev</button>
          <button className={s.profile__options} onClick={nextPage} disabled={nextChecker}>Next</button>
        </div>
      }
    </div>
  )
}

export default Profile