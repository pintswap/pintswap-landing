import Link from 'next/link';
import { useNftMint } from '../../hooks/nft-mint';
import { Button, DataDisplay } from '../components';
import { Padding } from '../layouts';
import {
  CONTRACT_ADDRESSES,
  EXPLORER_URLS,
  NETWORK,
  truncate,
} from '../../utils';
import { useAccount, useNetwork } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { useWindowSize } from '../../hooks';

export const MintView = () => {
  const { height } = useWindowSize();
  const { mint, isLoading, txHash, getTrisData, error } = useNftMint();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { isLoading: trisDataLoading, data: trisData } = useQuery({
    queryKey: [`tris-data`],
    queryFn: getTrisData,
    refetchInterval: 5000,
  });

  const renderButtonText = () => {
    if (error) return error;
    if (trisData?.userMinted) return 'Already claimed';
    return 'GET TRIS';
  };

  return (
    <Padding>
      <div className="flex flex-col items-center justify-center gap-6 lg:gap-8 mt-6 md:mt-12 lg:mt-20">
        <div className="flex flex-col items-center justify-center gap-3 md:gap-6 lg:gap-12 w-full">
          {height > 750 && (
            <div className="flex justify-center items-center w-72 h-72 bg-white rainbow-animation rounded">
              <img
                src="https://i.ibb.co/BVqTyS7/tris.png"
                alt="tris"
                height="360"
                width="180"
              />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 text-center justify-center items-center gap-2 gap-y-4 w-full max-w-2xl mt-2">
            <DataDisplay
              link={`${EXPLORER_URLS[NETWORK]}/address/${CONTRACT_ADDRESSES[NETWORK].tris}`}
              text="Address"
              value={truncate(trisData?.address) || 'N/A'}
              loading={trisDataLoading}
            />
            <DataDisplay
              text="Minted"
              value={`${trisData?.totalSupply || 0} / 1000`}
              loading={trisDataLoading}
            />
            <DataDisplay
              text="Private Mint"
              value={trisData?.privateMintEnabled ? 'ENABLED' : 'DISABLED'}
              color={
                trisData?.privateMintEnabled ? 'text-green-400' : 'text-red-400'
              }
              loading={trisDataLoading}
            />
            <DataDisplay
              text="Public Mint"
              value={trisData?.publicMintEnabled ? 'ENABLED' : 'DISABLED'}
              color={
                trisData?.publicMintEnabled ? 'text-green-400' : 'text-red-400'
              }
              loading={trisDataLoading}
            />
          </div>
        </div>

        {Number(trisData?.totalSupply) === 1000 ? (
          <span className="text-xl font-bold">SOLD OUT</span>
        ) : (
          <>
            {address && !chain?.unsupported ? (
              <Button
                onClick={mint}
                loading={isLoading}
                loadingText="Pouring up"
                disabled={trisData?.userMinted}
              >
                {renderButtonText()}
              </Button>
            ) : (
              <Button wallet>Connect Wallet</Button>
            )}
          </>
        )}

        {txHash && (
          <Link href={`${EXPLORER_URLS[NETWORK]}/tx/${txHash}`} target="_blank">
            <a target="_blank" className="underline">
              View transaction on Etherscan
            </a>
          </Link>
        )}
      </div>

      <div className="absolute bottom-0 right-0 sm:right-2 md:right-4 lg:right-6">
        <img
          src={'https://i.ibb.co/1G7ZMg6/ps-syrup.png'}
          alt="TRIS Pour"
          width="200"
          height="250"
        />
      </div>
    </Padding>
  );
};
