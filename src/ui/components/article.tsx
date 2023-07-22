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
    const thumbnail = domNodes.find((el) => el.type === 'figure');
    const description = domNodes.find((el) => el.type === 'p');
    return (
      <article>
        <h2 className="text-2xl mb-2">{post?.title}</h2>
        <div className="flex flex-col gap-3">
          {formatDomNode(thumbnail)}
          <div className="max-h-24 h-24 overflow-hidden">
            {formatDomNode(description)}
          </div>
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
