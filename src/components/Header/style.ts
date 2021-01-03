import { SxStyleProp } from 'rebass'

export const headerStyle: SxStyleProp = {
  position: 'fixed',
  zIndex: 1,
  width: '100%',
  left: 0,
  top: 0,
  paddingX: 0,
  paddingY: 2,
  borderBottom: '1px solid',
  borderColor: 'borderMenu',
  backgroundColor: 'backgroundHeader',
  backdropFilter: 'saturate(200%) blur(20px)',
  '& > *': {
    lineHeight: 1,
  },
}
