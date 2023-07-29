import { parseEther, keccak256 } from 'viem';
import { CONTRACT_ADDRESSES, NETWORK, padBuffer, publicClient } from '../utils';
import { useAccount, useWalletClient } from 'wagmi';
import { useState } from 'react';
import { MerkleTree } from 'merkletreejs';
import { WHITELISTED } from '../utils/whitelisted';

const abi = [
  {
    inputs: [{ name: 'merkleRoot', type: 'bytes32[]' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

export const useNftMint = () => {
  const [txHash, setTxHash] = useState('');
  const { address } = useAccount();
  const { data: signer } = useWalletClient();

  const [isLoading, setIsLoading] = useState(false);

  // Merkle Root
  const leaves = WHITELISTED.map((account) => padBuffer(account));
  const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });

  const mint = async () => {
    if (!signer || !address) return;
    setIsLoading(true);

    try {
      const proof: any = merkleTree.getHexProof(padBuffer(address));
      // TRIS Contract
      const { request } = await publicClient({}).simulateContract({
        account: address,
        address: CONTRACT_ADDRESSES[NETWORK].tris,
        abi,
        functionName: 'mint',
        args: [proof],
        value: parseEther('0.27'),
      });
      const tx = await signer.writeContract(request);
      setTxHash(tx);
      return tx;
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  return {
    mint,
    isLoading,
    txHash,
  };
};
