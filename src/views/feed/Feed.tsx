import React from 'react'
import Post from '../../components/post/Post'

import s from './feed.module.scss'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../service/postsService'

const Feed: React.FC = () => {
  const {data,isLoading,error,isSuccess} = useQuery({
    queryFn: getPosts,
    queryKey: ['posts', 'all']
  })


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
          isSuccess && data.map(post =>
            <Post post={post} key={post.id} />
          )
        }
      </div>
    </div>
  )
}

export default Feed