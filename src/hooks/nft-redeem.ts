import { parseEther, keccak256, getContract } from 'viem';
import { CONTRACT_ADDRESSES, NETWORK, padBuffer, publicClient } from '../utils';
import { useAccount, useWalletClient } from 'wagmi';
import { useEffect, useState } from 'react';
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
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintingEnabled',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'publicMint',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const useNftRedeem = () => {
  const [txHash, setTxHash] = useState('');
  const { address } = useAccount();
  const { data: signer } = useWalletClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // TRIS Contract
  const tris = getContract({
    address: CONTRACT_ADDRESSES[NETWORK].tris,
    abi,
    publicClient: publicClient({}),
  });

  // Merkle Root
  const cleanedUpWhitelist = WHITELISTED.map((el) => el.replace(/\s/g, ''));
  const leaves = cleanedUpWhitelist.map((account) => padBuffer(account));
  const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });

  // Redeem NFT
  const redeem = async () => {
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
      setIsLoading(false);
      return tx;
    } catch (err) {
      setIsLoading(false);
      const errorMsg =
        String(err).includes(`reverted`) ||
        String(err).includes('exceeds the balance')
          ? String(err)
          : '';
      if (errorMsg) {
        if (errorMsg.includes('Minting is not enabled'))
          setError('Minting not enabled');
        else if (
          errorMsg.includes('Not enough ETH sent') ||
          errorMsg.includes('exceeds the balance of the account')
        )
          setError('Not enough ETH');
        else if (errorMsg.includes('Exceeds token supply'))
          setError('TRIS is sold out');
        else if (errorMsg.includes('User already claimed'))
          setError('Already claimed');
        else if (errorMsg.includes('Invalid merkle proof'))
          setError('Not on whitelist');
      }
      console.error(err);
    }
  };

  // Reset error
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return {
    redeem,
    isLoading,
    txHash,
    error,
  };
};
