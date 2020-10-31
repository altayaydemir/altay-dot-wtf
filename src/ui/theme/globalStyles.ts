import { Theme } from './create'

export const createGlobalStyles = (theme: Theme) => `
  * {
    box-sizing: border-box;
  }

  html {
    padding: 0;
    margin: 0;
  }

  body {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.4;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  hr {
    border-color: ${theme.colors.borderPrimary};
    opacity: 0.5;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: ${theme.colors.linkPrimary};

    &:hover {
      color: ${theme.colors.linkPrimary}!important;
      text-decoration: underline;
    }
  }

  ul, ol {
    padding: 0;
    margin: 16px 0 0 24px;
    color: ${theme.colors.textSecondary};
  }

  li {
    line-height: 1.4;
    margin-top: 16px;
  }
`
