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
    | 'success';
  height?: number;
  width?: number;
  loop?: boolean;
};

export const RenderLottie = ({
  animation,
  height,
  width,
  loop = true,
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
        style={{ cursor: 'default' }}
      />
    </div>
  );
};
