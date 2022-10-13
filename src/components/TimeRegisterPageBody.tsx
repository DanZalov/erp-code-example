import { useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import { IProjectTime } from '../models'
import { useLazyGetSmthQuery } from '../Store/TTDatabase/TTDatabase.api'
import { DateRow } from './GetDataComponents/Row'
import { EnterTimeRowlist, ShowTimeRowlist } from './GetDataComponents/Rowlist'

export default function TimeRegisterPageBody() {
  const { projectList } = useAppSelector((state) => state.projectList)
  const [filledProjectList, setfilledProjectList] = useState<IProjectTime[]>([])
  const [enterTimeErrorMessage, setEnterTimeErrorMessage] = useState('')
  const [fetchData] = useLazyGetSmthQuery()

  function enterTimeSubmitHandler() {
    let counter = 0
    const filledProjectList: IProjectTime[] = []
    projectList.forEach((project) => {
      counter += +project.regTime
      if (+project.regTime + +project.overTime > 0) {
        let tempProject = project
        if (project.regTime.match(/^\d(\.|(\.0))?$/g)?.join('')) {
          tempProject = {
            ...tempProject,
            regTime: project.regTime.slice(0, 1),
          }
        }
        if (project.overTime.match(/^\d(\.|(\.0))?$/g)?.join('')) {
          tempProject = {
            ...tempProject,
            overTime: project.overTime.slice(0, 1),
          }
        }
        filledProjectList.push(tempProject)
      }
    })
    if (counter !== 8) {
      setEnterTimeErrorMessage(
        `Wrong input: Total ${counter} hours. Standard shift is 8.`
      )
      setfilledProjectList([])
    } else {
      setfilledProjectList(filledProjectList)
      setEnterTimeErrorMessage('')
    }
  }

  return (
    <div className="container">
      <div className="button-holder m-3 col-md-3">
        <button
          id="projectListModalButton"
          type="button"
          className="btn btn-primary btn-lg"
          // data-bs-toggle="modal"
          // data-bs-target="#projectListModal"
          onClick={() => {
            // fetchData()
          }}
        >
          Add Project
        </button>
      </div>
      <table className="table table-bordered border-secondary table-light">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Project</th>
            <th scope="col">RT</th>
            <th scope="col">OT</th>
          </tr>
        </thead>
        <tbody>
          <EnterTimeRowlist projectList={projectList} />
        </tbody>
      </table>
      <div className="button-holder m-3 d-flex flex-row justify-content-between">
        <button
          id="timeRegisterSubmitButton"
          type="button"
          className="btn btn-primary btn-lg"
          onClick={enterTimeSubmitHandler}
        >
          Submit
        </button>
        <h3 className="text-danger">{enterTimeErrorMessage}</h3>
      </div>
      <hr />
      <div className="table-responsive mt-5 mb-3" id="JobStatisticsTable">
        <table className="table table-bordered border-light">
          <thead className="table-light w-100">
            <tr>
              <th scope="col" id="ProjectColumn">
                Project
              </th>
              <DateRow />
            </tr>
          </thead>
          <tbody>
            <ShowTimeRowlist projectList={filledProjectList} />
          </tbody>
        </table>
      </div>
    </div>
  )
}
