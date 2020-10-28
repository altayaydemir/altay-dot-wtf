import { Text } from 'rebass'

type Props = {
  name: string
  value: React.ReactNode
  fontSize?: number | number[]
}

const BookInfoText: React.FC<Props> = ({ name, value, fontSize }) => (
  <Text sx={{ color: 'textGray' }} fontSize={fontSize}>
    {name}: <b>{value}</b>
  </Text>
)

export default BookInfoText
