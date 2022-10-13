import { useActions, useAppSelector } from '../../hooks/redux'
import { IProjectTime, IServerData } from '../../models'
import { Cell, HeadCell } from './Cell'

interface RowProps {
  data: IServerData
}

export function Row({ data }: RowProps) {
  return (
    <>
      {Object.values(data).map((cellData, index) => {
        return <Cell data={cellData} key={index} />
      })}
    </>
  )
}

export function HeadRow({ data }: RowProps) {
  return (
    <>
      {Object.keys(data).map((cellData, index) => {
        return <HeadCell data={cellData} key={index} />
      })}
    </>
  )
}

export function DateRow() {
  const { month, daysInMonth } = useAppSelector((state) => state.date)

  let html = []
  let currentMonthString: string
  if (month < 10) {
    currentMonthString = `0${month}`
  } else {
    currentMonthString = month.toString()
  }
  for (let i = 0; i < daysInMonth; i++) {
    html.push(
      <th key={i} scope="col">
        {i < 9
          ? `0${i + 1}/${currentMonthString}`
          : `${i + 1}/${currentMonthString}`}
      </th>
    )
  }
  return <>{html}</>
}

interface TimeRowProps {
  project: IProjectTime
}

export function TimeRow({ project }: TimeRowProps) {
  const { date, daysInMonth } = useAppSelector((state) => state.date)
  let html = []
  // console.log(currentDate)
  for (let i = 0; i < daysInMonth; i++) {
    html.push(
      <td key={i} scope="col">
        {i === date - 1 && (project.regTime || '0')}
        {i === date - 1 && project.overTime && `/${project.overTime}`}
      </td>
    )
  }
  return <>{html}</>
}

export function EnterTimeRow({ project }: TimeRowProps) {
  const { enterRegTime, enterOverTime } = useActions()
  function enterTimeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const eventTarget = event.target
    const eventTargetvalue = eventTarget.value
    let eventTargetNoNullvalue: string | undefined
    if (eventTargetvalue) {
      eventTargetNoNullvalue = eventTargetvalue
        .match(/^\d(\.|(\.\d))?$/g)
        ?.join('')
      if (eventTargetNoNullvalue) {
        if (eventTarget.id === 'regTime') {
          enterRegTime({
            id: project.id,
            value: eventTargetNoNullvalue,
          })
        } else {
          enterOverTime({
            id: project.id,
            value: eventTargetNoNullvalue,
          })
        }
      }
    } else {
      if (eventTarget.id === 'regTime') {
        enterRegTime({
          id: project.id,
          value: '',
        })
      } else {
        enterOverTime({
          id: project.id,
          value: '',
        })
      }
    }

    // console.log(eventTarget.value.match(/\d|\./g)?.join(''))
  }
  return (
    <>
      <th scope="row">{project.projectName}</th>
      <td>
        <input
          className="border border-0 w-100"
          type="text"
          id="regTime"
          value={project.regTime}
          onChange={enterTimeHandler}
          autoComplete="off"
        />
      </td>
      <td>
        <input
          className="border border-0 w-100"
          type="text"
          id="overTime"
          value={project.overTime}
          onChange={enterTimeHandler}
          autoComplete="off"
        />
      </td>
    </>
  )
}
