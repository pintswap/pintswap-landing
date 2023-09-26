import { Section } from '../layouts';

const Footer = () => (
  <Section background="bg-indigo-900" type="wide" padding="y">
    <div>Cold Water Labs &copy; {new Date().getFullYear()}</div>
  </Section>
);

export { Footer };
