interface CellProps {
  data: any
}

export function Cell({ data }: CellProps) {
  const string = data.toString()
  return <td>{string}</td>
}

export function HeadCell({ data }: CellProps) {
  const string = data.toString()
  return <th scope="col">{string}</th>
}
