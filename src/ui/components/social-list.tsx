import Link from 'next/link';
import { FaDiscord, FaMedium, FaTelegram, FaTwitter } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../../utils/constants';

export const SocialList = ({
  direction,
  size = '24px',
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
      case 'right-center': {
        customClass = 'bottom-1/2 right-4';
        break;
      }
      default:
        return '';
    }
    return `${baseClass} ${customClass}`;
  };
  return (
    <div className={locatedAt()}>
      <div
        className={`flex ${directionClass} items-center justify-center gap-4 md:gap-6`}
      >
        <button className="transition duration-150 group relative z-10 cursor-pointer">
          <Link href={SOCIAL_LINKS.discord} target="_blank">
            <FaDiscord
              size={`${size}`}
              className="group-hover:fill-neutral-300 transition duration-150"
            />
          </Link>
        </button>
        <button className="transition duration-150 group relative z-10 cursor-pointer">
          <Link href={SOCIAL_LINKS.telegram} target="_blank">
            <FaTelegram
              size={`${size}`}
              className="group-hover:fill-neutral-300 transition duration-150"
            />
          </Link>
        </button>
        <button className="transition duration-150 group relative z-10 cursor-pointer">
          <Link href={SOCIAL_LINKS.twitter} target="_blank">
            <FaTwitter
              size={`${size}`}
              className="group-hover:fill-neutral-300 transition duration-150"
            />
          </Link>
        </button>
        <button className="transition duration-150 group relative z-10 cursor-pointer">
          <Link href={SOCIAL_LINKS.medium} target="_blank">
            <FaMedium
              size={`${size}`}
              className="group-hover:fill-neutral-300 transition duration-150"
            />
          </Link>
        </button>
      </div>
    </div>
  );
};
