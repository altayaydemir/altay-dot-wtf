import type { Theme } from '.'

const loadFont = (family: string, fileName: string, weight: number) => `
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

const TYPEFACE = `please-dont-download-these-fonts-buy-a-license-instead`
const FOLDER = `${TYPEFACE}/${TYPEFACE}`

export const createTypographyCSS = (theme: Theme) => `
  ${loadFont(TYPEFACE, `${FOLDER}-Regular`, 400)}
  ${loadFont(TYPEFACE, `${FOLDER}-Bold`, 600)}

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;

    font-size: ${(theme.fontSizes as string[])[1]}px;
    letter-spacing: 0.015em;
    word-spacing: 0.001em;
  }
`
