import { Base } from '../ui/base';
import { HeroView } from '../ui/views/hero';

const Index = () => {
  return (
    <Base>
      <div className="z-50 relative">
        <HeroView />
      </div>
    </Base>
  );
};

export default Index;
