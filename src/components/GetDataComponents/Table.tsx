import { IServerData } from '../../models'
import { HeadRow } from './Row'
import { Rowlist } from './Rowlist'

export interface TableProps {
  data: IServerData[]
}

export default function Table({ data }: TableProps) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <HeadRow data={data[0]} />
        </tr>
      </thead>
      <tbody>
        <Rowlist data={data} />
      </tbody>
    </table>
  )
}
