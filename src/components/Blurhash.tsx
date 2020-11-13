import { BlurhashCanvas } from 'react-blurhash'

const Blurhash: React.FC<{ value: string }> = ({ value }) => (
  <BlurhashCanvas
    hash={value}
    width={32}
    height={32}
    punch={1}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
    }}
  />
)

export default Blurhash
