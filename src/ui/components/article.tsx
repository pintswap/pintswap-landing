import { IMediumPost } from '../../stores/medium';
import parse from 'react-html-parser';
import { formatDomNode } from '../../styles/html-parser';
import Link from 'next/link';
import { convertToUrl } from '../../utils/helpers';
import { Button } from './button';

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
      <Link href={`/blog/${convertToUrl(post?.title)}`}>
        <article>
          <h2 className="text-2xl">{post?.title}</h2>
          <div className="flex flex-col gap-2 my-2">
            {post?.thumbnail ? (
              <img src={post?.thumbnail} alt={post?.title} />
            ) : (
              <>{formatDomNode(thumbnail)}</>
            )}
            <span className="text-xs text-neutral-300">
              Published on: {new Date(post?.pubDate).toLocaleDateString()}
            </span>
            <div className="max-h-24 h-24 overflow-hidden">
              {formatDomNode(description)}
            </div>
          </div>
          <Button link>Read More</Button>
        </article>
      </Link>
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
