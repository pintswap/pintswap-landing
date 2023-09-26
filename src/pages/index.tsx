import { Base } from '../ui/base';
import { Button, DataDisplay } from '../ui/components';
import { Section } from '../ui/layouts';

const Index = () => {
  return (
    <Base>
      <div className="absolute left-0 top-0 w-screen h-[60vh] bg-gradient-to-b from-primary via-secondary-black to-secondary-black opacity-25" />

      <Section id="home" padding="y">
        <div className="flex flex-col md:items-end md:flex-row justify-between">
          <div className="flex flex-col gap-3 md:gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
                <span>One place for</span>
                <br />
                <span className="text-accent-light">
                  all your investment needs
                </span>
              </h1>
              <p className="text-lg text-neutral-300">
                In pintswap we make sure you are up to In pintswap we make sure
                you are up to
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 lg:gap-4">
              <Button type="outline" size="lg" className="w-full md:w-fit">
                Explore Markets
              </Button>
              <Button
                type="outline"
                size="lg"
                className="w-full md:w-fit"
                borderColor="border-accent"
              >
                Explore Peers
              </Button>
            </div>
          </div>
          <div className="hidden md:block w-[300px] h-[300px]" />
        </div>
      </Section>
      <Section padding="y">
        <div className="flex flex-col md:grid md:grid-cols-3 md:mt-6 gap-4">
          <DataDisplay value="$1,000,000" text="Daily Volume" type="fancy" />
          <DataDisplay value="1,852,124" text="Transactions" type="fancy" />
          <DataDisplay value="8" text="Peers" type="fancy" />
        </div>
      </Section>
    </Base>
  );
};

export default Index;
