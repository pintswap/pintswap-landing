import { IMediumPost } from '../../stores/medium';
import parse from 'react-html-parser';
import { formatDomNode } from '../../styles/html-parser';

export const PostArticle = ({
  post,
  isPreview,
}: {
  post: IMediumPost;
  isPreview?: boolean;
}) => {
  const domNodes = parse(post?.content);
  if (isPreview) {
    return (
      <article>
        <h2 className="text-2xl">{post?.title}</h2>
        <div className="h-[300px] max-h-[300px] overflow-y-hidden">
          {domNodes.slice(0, 2).map((el) => (
            <>
              <br />
              {formatDomNode(el)}
            </>
          ))}
        </div>
      </article>
    );
  }
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
