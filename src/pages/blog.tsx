import { useMediumStore } from '../stores/medium';
import { Base } from '../ui/base';
import { PostPreview } from '../ui/components/post-preview';
import { Padding } from '../ui/layouts/padding';

const Blog = () => {
  const { posts } = useMediumStore();
  console.log(posts);
  return (
    <Base>
      <Padding>
        {posts.map((post, i) => (
          <PostPreview key={`medium-article-${i}`} post={post} />
        ))}
      </Padding>
    </Base>
  );
};

export default Blog;
