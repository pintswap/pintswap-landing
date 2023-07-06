import { useMediumStore } from '../stores/medium';
import { Base } from '../ui/base';

const Blog = () => {
  const { posts } = useMediumStore();
  console.log(posts);
  return <Base></Base>;
};

export default Blog;
