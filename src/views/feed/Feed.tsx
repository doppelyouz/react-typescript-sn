import React, { useEffect, useState } from 'react'
import Post from '../../components/post/Post'
import { Post as PostType} from '../../shared/types'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../service/postsService'

import s from './feed.module.scss'
const Feed: React.FC = () => {

  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const itemsPerPage = 3;

  const { data, isLoading, error, isSuccess} = useQuery({
    queryFn: () => getPosts(9, currentPage),
    queryKey: ['posts', 'all']
  })
  useEffect(() => {
    if(isSuccess && currentPage === 1) {
      setPosts(data)
      setCurrentPage(prev => prev + 3)
    }
  }, [currentPage, data, isSuccess])

  useEffect(() => {
    if(fetching) {
      getPosts(itemsPerPage, currentPage)
        .then(newPosts => {
          setPosts([...posts, ...newPosts])
          setCurrentPage(prev => prev + 1)
        })
        .finally(() => setFetching(false))
    }
  }, [currentPage, fetching, posts])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return function() {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e: Event) => {
    if (!(e.target instanceof Document)) return;
    const { scrollTop, scrollHeight } = e.target.documentElement;
    const windowHeight = window.innerHeight;
    if (scrollTop + windowHeight >= scrollHeight) {
      setFetching(true)
    }
  };

  if(error) {
    return <div>Something went wrong</div>
  }
  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={s.feed}>
      <div className={s.feed__content}>
        {
          isSuccess && posts.map(post =>
            <Post post={post} key={post.id} />
          )
        }
      </div>
    </div>
  )
}

export default Feed