import Link from 'next/link';
import { useNftMint } from '../../hooks/nft-mint';
import { Button, DataDisplay } from '../components';
import { Padding } from '../layouts';
import { EXPLORER_URLS, NETWORK, truncate } from '../../utils';
import Image from 'next/image';
import { useAccount } from 'wagmi';

export const MintView = () => {
  const { mint, isLoading, txHash, contract, error } = useNftMint();
  const { address } = useAccount();
  return (
    <Padding>
      <div className="flex flex-col items-center justify-center gap-12 mt-12 md:mt-16 lg:mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center justify-center items-center gap-2 gap-y-4 w-full max-w-2xl">
          <DataDisplay text="Address" value={truncate(contract.address)} />
          <DataDisplay text="Minted" value={`${contract.totalSupply} / 1000`} />
          <DataDisplay
            text="Private Mint"
            value={contract.mintStarted ? 'ENABLED' : 'DISABLED'}
            color={contract.mintStarted ? 'text-green-400' : 'text-red-400'}
          />
          <DataDisplay
            text="Public Mint"
            value={contract.publicMintEnabled ? 'ENABLED' : 'DISABLED'}
            color={
              contract.publicMintEnabled ? 'text-green-400' : 'text-red-400'
            }
          />
        </div>

        {address ? (
          <Button onClick={mint} loading={isLoading} loadingText="Pouring up">
            {error || 'GET TRIS'}
          </Button>
        ) : (
          <Button wallet>Connect Wallet</Button>
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
        <Image
          src="/assets/ps-syrup.png"
          alt="TRIS Pour"
          width="200"
          height="250"
        />
      </div>
    </Padding>
  );
};
