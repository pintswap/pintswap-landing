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
    const description = domNodes.find((el) => el.type === 'p');
    return (
      <Link href={`/blog/${convertToUrl(post?.title)}`}>
        <article
          className="rounded-lg h-52 flex flex-col justify-end overflow-hidden transition duration-200 group cursor-pointer"
          style={{
            backgroundImage: `url("${post?.thumbnail}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className="bg-gradient-to-b from-[rgba(0,0,0,0.3)] via-[rgba(0,0,0,0.6)] to-black h-48 transition duration-200 translate-y-32 group-hover:translate-y-10 p-1.5">
            <h2 className="text-xl">{post?.title}</h2>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-neutral-300">
                Published on: {new Date(post?.pubDate).toLocaleDateString()}
              </span>
              <div className=" line-clamp-2">{formatDomNode(description)}</div>
            </div>
            <Button type="link">
              <span className="mt-1">Read More</span>
            </Button>
          </div>
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
      <br />
      <Link href="/blog">
        <a>
          <Button type="link">Back to all blog posts</Button>
        </a>
      </Link>
    </article>
  );
};
