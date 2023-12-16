import Lottie from 'react-lottie';
import wallet from '../../lotties/wallet.json';
import hashing from '../../lotties/hashing-bytes.json';
import blockchainGlobal from '../../lotties/blockchain-global.json';
import blockchainNetwork from '../../lotties/blockchain-network.json';
import blockchainWorks from '../../lotties/blockchain-works.json';
import globalTransfer from '../../lotties/global-transfer.json';
import decentralize from '../../lotties/decentralize.json';
import loading from '../../lotties/loading.json';
import success from '../../lotties/success.json';
import telegram from '../../lotties/telegram.json';
import discord from '../../lotties/discord.json';

type IRenderLottie = {
  animation:
    | 'wallet'
    | 'hashing'
    | 'blockchainGlobal'
    | 'blockchainNetwork'
    | 'blockchainWorks'
    | 'globalTransfer'
    | 'decentralize'
    | 'loading'
    | 'success'
    | 'discord'
    | 'telegram';
  height?: number;
  width?: number;
  loop?: boolean;
  cursor?: 'pointer' | 'default';
};

export const RenderLottie = ({
  animation,
  height,
  width,
  loop = true,
  cursor = 'default',
}: IRenderLottie) => {
  const determineLottieFile = () => {
    switch (animation) {
      case 'blockchainGlobal':
        return blockchainGlobal;
      case 'blockchainWorks':
        return blockchainWorks;
      case 'blockchainNetwork':
        return blockchainNetwork;
      case 'decentralize':
        return decentralize;
      case 'globalTransfer':
        return globalTransfer;
      case 'hashing':
        return hashing;
      case 'wallet':
        return wallet;
      case 'loading':
        return loading;
      case 'success':
        return success;
      case 'discord':
        return discord;
      case 'telegram':
        return telegram;
      default:
        return wallet;
    }
  };
  const defaultOptions = {
    autoplay: true,
    animationData: determineLottieFile(),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="w-full flex">
      <Lottie
        options={{
          ...defaultOptions,
          loop,
        }}
        height={height || 300}
        width={width || 300}
        isClickToPauseDisabled
        style={{ cursor }}
      />
    </div>
  );
};
