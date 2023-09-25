import { Base } from '../ui/base';
import { Section } from '../ui/layouts';

const Index = () => {
  return (
    <Base>
      <div className="absolute left-0 top-0 w-screen h-[60vh] bg-gradient-to-b from-primary via-secondary-black to-secondary-black opacity-25" />

      <Section id="home">
        <h1 className="text-4xl font-medium">
          <span>One place for</span>
          <br />
          <span className="text-accent-light">all your investment needs</span>
        </h1>
      </Section>
    </Base>
  );
};

export default Index;
