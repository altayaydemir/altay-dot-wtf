import { Link as RebassLink } from 'rebass'
import styled from './theme/styled'

const Link = styled(RebassLink)(
  ({ theme }) => `
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: ${theme.colors.primary}!important;
      text-decoration: underline;
    }
  `,
)

export default Link
