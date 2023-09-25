import { Base } from '../ui/base';

const Index = () => {
  return (
    <Base>
      <div className="absolute left-0 top-0 w-screen h-[60vh] -z-5 bg-gradient-to-b from-primary via-secondary-black to-secondary-black opacity-25" />

      <div className="relative z-1">
        <h1 className="text-3xl">One place for your investment needs</h1>
      </div>
    </Base>
  );
};

export default Index;
