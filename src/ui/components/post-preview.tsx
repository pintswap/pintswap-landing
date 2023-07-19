import { IMediumPost } from '../../stores/medium';
import parse from 'react-html-parser';
import { formatDomNode } from '../../styles/html-parser';

export const PostPreview = ({ post }: { post: IMediumPost }) => {
  const domNodes = parse(post?.content);
  // console.log(domNodes)
  return (
    <article>
      <h2 className="text-2xl">{post?.title}</h2>
      {domNodes.map((el) => (
        <>
          <br />
          {formatDomNode(el)}
        </>
      ))}
    </article>
  );
};
