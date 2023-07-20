import { useMediumStore } from '../stores/medium';
import { Base } from '../ui/base';
import { PostArticle } from '../ui/components/article';
import { Padding } from '../ui/layouts/padding';

const Blog = () => {
  const { posts } = useMediumStore();
  return (
    <Base>
      <Padding>
        {posts.map((post, i) => (
          <PostArticle key={`medium-article-${i}`} post={post} isPreview />
        ))}
      </Padding>
    </Base>
  );
};

export default Blog;