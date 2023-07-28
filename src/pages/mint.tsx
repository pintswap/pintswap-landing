import { Base } from '../ui/base';
import { Padding } from '../ui/layouts/padding';

const Index = () => {
  return (
    <Base nav>
      <div className="max-w-6xl mx-auto">
        <Padding>
          <h1 className="uppercase text-xl md:text-2xl text-center mb-6">
            Mint TRIS
          </h1>
        </Padding>
      </div>
    </Base>
  );
};

export default Index;
