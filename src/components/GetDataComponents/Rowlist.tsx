import { IProjectTime, IServerData } from '../../models'
import { EnterTimeRow, Row, TimeRow } from './Row'

export interface RowListProps {
  data: IServerData[]
}

export function Rowlist({ data }: RowListProps) {
  return (
    <>
      {data.map((item) => {
        return (
          <tr key={item.id}>
            <Row data={item} key={item.id} />
          </tr>
        )
      })}
    </>
  )
}

export interface EnterTimeRowListProps {
  projectList: IProjectTime[]
}

export function EnterTimeRowlist({ projectList }: EnterTimeRowListProps) {
  return (
    <>
      {projectList.map((project) => {
        return (
          <tr key={project.id}>
            <EnterTimeRow project={project} key={project.id} />
          </tr>
        )
      })}
    </>
  )
}

export function ShowTimeRowlist({ projectList }: EnterTimeRowListProps) {
  return (
    <>
      {projectList.map((project) => {
        return (
          <tr key={project.id}>
            <th scope="row" id="ProjectColumn" key={-project.id}>
              {project.projectName}
            </th>
            <TimeRow project={project} key={project.id} />
          </tr>
        )
      })}
    </>
  )
}
