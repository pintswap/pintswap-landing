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
] as const;

export const useNftMint = () => {
  const [txHash, setTxHash] = useState('');
  const { address } = useAccount();
  const { data: signer } = useWalletClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [contract, setContract] = useState({
    address: '',
    publicMintEnabled: false,
    mintStarted: false,
    totalSupply: '0',
  });

  // TRIS Contract
  const tris = getContract({
    address: CONTRACT_ADDRESSES[NETWORK].tris,
    abi,
    publicClient: publicClient({}),
  });

  // Merkle Root
  const leaves = WHITELISTED.map((account) => padBuffer(account));
  const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });

  // Mint NFT
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
      const errorMsg = String(err).includes(`reverted`) ? String(err) : '';
      if (errorMsg) {
        if (errorMsg.includes('Minting is not enabled'))
          setError('Minting is not enabled');
        else if (errorMsg.includes('Not enough ETH sent'))
          setError('Not enough ETH');
        else if (errorMsg.includes('Exceeds token supply'))
          setError('TRIS is sold out');
        else if (errorMsg.includes('User already claimed'))
          setError('You have already claimed your TRIS NFT');
        else if (errorMsg.includes('Invalid merkle proof'))
          setError('You are not on the whitelist');
      }
      console.error(err);
    }
    setIsLoading(false);
  };

  // Reset error
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  // Get contract data
  useEffect(() => {
    if (tris && !contract.address) {
      (async () => {
        await Promise.all([
          tris.read.totalSupply(),
          tris.read.publicMint(),
          tris.read.mintingEnabled(),
        ]).then((data) => {
          setContract({
            address: tris.address,
            publicMintEnabled: data[1],
            mintStarted: data[2],
            totalSupply: data[0].toString(),
          });
        });
      })().catch((err) => console.error(err));
    }
  }, [tris]);

  return {
    mint,
    isLoading,
    txHash,
    contract,
    error,
  };
};
