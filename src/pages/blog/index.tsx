import { useMediumStore } from '../../stores/medium';
import { Base } from '../../ui/base';
import { PostArticle } from '../../ui/components/article';
import { Padding } from '../../ui/layouts/padding';

const Blog = () => {
  const { posts } = useMediumStore();
  console.log(posts);
  return (
    <Base nav>
      <div className="max-w-6xl mx-auto">
        <Padding>
          {posts.map((post, i) => (
            <PostArticle key={`medium-article-${i}`} post={post} isPreview />
          ))}
        </Padding>
      </div>
    </Base>
  );
};

export default Blog;
