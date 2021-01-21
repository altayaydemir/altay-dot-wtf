export const loadFont = (family: string, fileName: string, weight: number) => `
  @font-face {
    font-family: '${family}';
    font-display: swap;
    src: url('/fonts/${fileName}.woff2') format('woff2'),
        url('/fonts/${fileName}.woff') format('woff');
    font-weight: ${weight};
    font-style: normal;
  }

  @font-face {
    font-family: '${family}';
    font-display: swap;
    src: url('/fonts/${fileName}-Italic.woff2') format('woff2'),
        url('/fonts/${fileName}-Italic.woff') format('woff');
    font-weight: ${weight};
    font-style: italic;
  }
`
