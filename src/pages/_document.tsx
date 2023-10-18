import Document, { Html, Head, Main, NextScript } from 'next/document';
import { AllRoundGothic } from '../utils';

import { AppConfig } from '../utils/app-config';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html
        lang={AppConfig.locale}
        className="scroll-smooth"
        style={{
          scrollBehavior: 'smooth',
          fontFamily: AllRoundGothic.style.fontFamily,
        }}
      >
        <Head />
        <body className={AllRoundGothic.className}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
