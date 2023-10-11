import { useState } from 'react';
import { Base } from '../ui/base';
import { Section } from '../ui/layouts';
import { Button, DataDisplay } from '../ui/components';

const Token = () => {
  const [tokenStats, setTokenStats] = useState<any>({
    'Market Cap': '1000000',
    Price: '0.001',
    Liquidity: '150000',
    Volume: '500',
  });
  return (
    <Base>
      <div className="absolute left-0 top-0 w-full h-[50vh] bg-gradient-to-b from-primary to-secondary-black opacity-25" />
      <Section padding="y" wrapperClass={`!z-[99]`}>
        <h1 className="font-semibold flex items-center gap-0.5">
          <span className="text-2xl md:text-3xl">$</span>
          <span className="text-accent-light text-5xl">PINT</span>
          <span className="text-5xl ml-3">Launch</span>
        </h1>
        <h3 className="text-2xl md:text-3xl font-medium">
          For degens. By degens.
        </h3>
      </Section>
      <Section padding="y">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          <div className="md:col-span-2">
            <h4 className="text-3xl mb-8">Redeem your NFT</h4>
            <p className="text-lg">
              PintSwap NFTs are redeemable for $PINT tokens which enables
              holders to benefit from the PintSwap system mechanisms. This
              includes earning $PINT from the upside of MEV captured by the OPPS
              smart contract, earning fees from swap emissions, governing the
              DAO, and other exclusive benefits.
            </p>
            <br />
            <p className="text-lg">
              With the launch of $PINT, the proprietary PintSwap P2P system can
              make trading more equitable and permisionless for everyone.
            </p>
            <br />
            <ul className="list-disc pl-8">
              <li>WOCK: 100,000 - 1,000,000 tokens</li>
              <li>TRIS: 100,000 tokens</li>
            </ul>
            <br />
            <Button size="lg">Redeem</Button>
          </div>
          <div className="md:col-span-1">
            <h4 className="text-3xl mb-8">Token Stats</h4>
            <div className="text-lg grid grid-cols-1 gap-x-2 gap-y-6 px-4">
              {Object.keys(tokenStats).map((stat, i) => (
                <DataDisplay
                  key={`token-stat-${i}`}
                  text={stat}
                  value={tokenStats[stat]}
                  type="fancy"
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-8">
              <Button>Buy on PintSwap</Button>
              <Button type="outline" className="!w-fit">
                Buy on Uniswap
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Base>
  );
};

export default Token;
