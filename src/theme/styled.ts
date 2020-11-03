import baseStyled, { CreateStyled } from '@emotion/styled'
import type { Theme } from './create'

export const styled = baseStyled as CreateStyled<Theme>
