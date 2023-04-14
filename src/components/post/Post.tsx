import React from 'react';
import { Post } from '../../shared/types';
import s from './post.module.scss';

type Props = {
  post: Post;
};

const PostComponent: React.FC<Props> = ({ post }) => {
  const { title, image } = post;

  return (
    <div className={s.post}>
       <div className={s.post__image}>
        <img src={image} alt={title} />
      </div>
      <h2 className={s.post__title}>{title}</h2>
    </div>
  );
};

export default PostComponent;