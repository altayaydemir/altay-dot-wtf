type Props = { identifier: number; label: string }

const MDFootnoteReference: React.FC<Props> = (props) => (
  <sup>
    <a href={`#${props.identifier}`}>{props.identifier}</a>
  </sup>
)

export default MDFootnoteReference
