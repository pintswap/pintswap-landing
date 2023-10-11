import { useMediumStore } from '../../stores/medium';
import { Base } from '../../ui/base';
import { PostArticle } from '../../ui/components';
import { Padding } from '../../ui/layouts';

const Blog = () => {
  const { posts } = useMediumStore();
  return (
    <Base>
      <div className="absolute left-0 top-0 w-full h-[50vh] bg-gradient-to-b from-primary to-secondary-black opacity-25" />

      <div className="max-w-6xl mx-auto !z-[99] relative">
        <Padding>
          <h1 className="text-3xl font-medium text-center mb-6">Blog</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post, i) => (
              <PostArticle key={`medium-article-${i}`} post={post} isPreview />
            ))}
          </div>
        </Padding>
      </div>
    </Base>
  );
};

export default Blog;
