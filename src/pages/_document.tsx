import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GTWalsheim } from '../utils';

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
          fontFamily: GTWalsheim.style.fontFamily,
        }}
      >
        <Head />
        <body className={GTWalsheim.className}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
