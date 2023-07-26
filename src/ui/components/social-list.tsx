import Link from 'next/link';
import { FaTwitter } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../../utils/constants';

export const SocialList = ({
  direction = 'vertical',
  size = '30px',
  absolute,
}: {
  direction?: 'vertical' | 'horizontal';
  className?: string;
  size?: `${string}px`;
  absolute?: 'right-center' | 'bottom-right' | 'left-center' | 'bottom-left';
}) => {
  const directionClass = direction === 'vertical' ? 'flex-col' : 'flex-row';
  const locatedAt = () => {
    const baseClass = `absolute`;
    let customClass = '';
    switch (absolute) {
      case 'bottom-left': {
        customClass = 'bottom-4 left-4';
        break;
      }
      case 'bottom-right': {
        customClass = 'bottom-4 right-4';
        break;
      }
      case 'left-center': {
        customClass = 'bottom-1/2 left-4';
        break;
      }
      default: {
        customClass = 'bottom-1/2 right-4';
        break;
      }
    }
    return `${baseClass} ${customClass}`;
  };
  return (
    <div className={locatedAt()}>
      <div
        className={`flex ${directionClass} items-center justify-center gap-4 md:gap-6`}
      >
        {/* <button className="transition duration-200 group relative z-10 cursor-pointer">
          <Link href="" target="_blank">
            <a>
              <FaDiscord
                size={`${size}`}
                className="group-hover:fill-pink-400 transition duration-200"
              />
            </a>
          </Link>
        </button> */}
        <button className="transition duration-200 group relative z-10 cursor-pointer">
          <Link href={SOCIAL_LINKS.twitter} target="_blank">
            <a target="_blank">
              <FaTwitter
                size={`${size}`}
                className="group-hover:fill-pink-400 transition duration-200"
              />
            </a>
          </Link>
        </button>
      </div>
    </div>
  );
};
