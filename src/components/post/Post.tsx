import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to={`/posts/` + post.id}>
          <img src={image} alt={title} />
        </Link>
      </div>
      <h2 className={s.post__title}>{title}</h2>
    </div>
  );
};

export default PostComponent;