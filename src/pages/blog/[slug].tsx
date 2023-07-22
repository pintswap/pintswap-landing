import { useRouter } from 'next/router';
import { useMediumStore } from '../../stores/medium';
import { Base } from '../../ui/base';
import { PostArticle } from '../../ui/components/article';
import { Padding } from '../../ui/layouts/padding';
import { convertToUrl } from '../../utils/helpers';
import { useEffect } from 'react';

const Blog = () => {
  const { query, push } = useRouter();
  const { posts } = useMediumStore();
  const foundPost = posts.find((el) => convertToUrl(el.title) === query.slug);

  useEffect(() => {
    if (!foundPost) {
      const timeout = setTimeout(() => push('/'), 3000);
      return () => clearTimeout(timeout);
    }
  }, [foundPost]);

  return (
    <Base nav>
      <div className="max-w-6xl mx-auto">
        <Padding>
          {foundPost ? (
            <PostArticle post={foundPost} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <span>404 Page Not Found.</span>
              <span>Stay calm and we&apos;ll take you home.</span>
            </div>
          )}
        </Padding>
      </div>
    </Base>
  );
};

export default Blog;
