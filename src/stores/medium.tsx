import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SOCIAL_LINKS } from '../utils/constants';

// Types
export type IMediumPost = {
  author: string;
  categories: string[];
  content: any;
  description: any;
  enclosure: any;
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  title: string;
};

type IStoreProps = {
  posts: IMediumPost[];
  isLoading: boolean;
  isError: boolean;
};

// Context
const MediumContext = createContext<IStoreProps>({
  posts: [],
  isLoading: false,
  isError: false,
});

// Wrapper
export function MediumStore(props: { children: ReactNode }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getPosts() {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${SOCIAL_LINKS.medium}`
    );
    const json = await res.json();
    if (json.status === 'ok' && json.items.length) {
      setPosts(json.items);
      setIsError(false);
    } else setIsError(true);
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!posts.length) await getPosts();
      setIsLoading(false);
    })().catch((err) => console.error(err));
  });

  const sharedState: IStoreProps = {
    posts,
    isLoading,
    isError,
  };

  return (
    <MediumContext.Provider value={sharedState}>
      {props.children}
    </MediumContext.Provider>
  );
}

// Independent
export function useMediumStore() {
  return useContext(MediumContext);
}
