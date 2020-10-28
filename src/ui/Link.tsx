import { Link as RebassLink } from 'rebass'
import styled from './theme/styled'

const Link = styled(RebassLink)`
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export default Link
