import Link from 'next/link';
import { useNftMint } from '../../hooks/nft-mint';
import { Button } from '../components';
import { Padding } from '../layouts';
import { EXPLORER_URLS, NETWORK } from '../../utils';

export const MintView = () => {
  const { mint, isLoading, txHash } = useNftMint();
  console.log(txHash);
  return (
    <Padding>
      <h1 className="uppercase text-xl md:text-2xl text-center mb-6">
        Mint TRIS
      </h1>
      <Button onClick={mint}>Make it rain</Button>
      {txHash && (
        <Link href={`${EXPLORER_URLS[NETWORK]}/tx/${txHash}`} target="_blank">
          <a target="_blank" className="underline">
            {txHash}
          </a>
        </Link>
      )}
    </Padding>
  );
};
