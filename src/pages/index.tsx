import { Base } from '../ui/base';
import { Hero } from '../ui/views/hero';

const Index = () => {
  return (
    <Base>
      <div className="z-50 relative">
        <Hero />
      </div>
      {/* <ParticlesContainer /> */}
    </Base>
  );
};

export default Index;
