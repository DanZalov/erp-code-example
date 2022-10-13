import { submitAndCloseModal } from '../functions/modalFunctions'
import { useActions, useAppSelector } from '../hooks/redux'
import { IProject } from '../models'
import { usePostProjectMutation } from '../Store/TTDatabase/TTDatabase.api'

export default function AddProjectModalBody() {
  const [postProject] = usePostProjectMutation()
  const { customer } = useAppSelector((state) => state.customer)
  const { addProject } = useActions()
  return (
    <div className="container">
      <form
        className="needs-validation"
        noValidate
        id="addProjectForm"
        onSubmit={(event) => {
          const form = event.target as HTMLFormElement
          event.preventDefault()
          if (!form.checkValidity()) {
            event.stopPropagation()
            form.classList.add('was-validated')
          } else {
            const targetEvent = event.target as HTMLFormElement
            const projectName = targetEvent.querySelector(
              '#floatingProjectName'
            ) as HTMLInputElement
            const projectStartDate = targetEvent.querySelector(
              '#floatingStartDate'
            ) as HTMLInputElement
            const projectEndDate = targetEvent.querySelector(
              '#floatingEndDate'
            ) as HTMLInputElement
            addProject({
              id: customer.projectList.length,
              Project_companyId: customer.id,
              Project_name: projectName.value,
              Project_dateStart: projectStartDate.value,
              Project_dateEnd: projectEndDate.value,
              budgetList: [],
            })
            // postProject({
            //   Project_name: projectName.value,
            //   Project_companyId: customer.id,
            //   Project_dateStart: projectStartDate.value,
            //   Project_dateEnd: projectEndDate.value,
            // } as IProject)
            submitAndCloseModal({
              modalId: `${targetEvent.id.slice(0, -4)}Modal`,
            })
          }
        }}
      >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingProjectName"
            placeholder="Project:"
            autoComplete="off"
            required
          />
          <label htmlFor="floatingProjectName">Project:</label>
          <div className="invalid-feedback">This field is required</div>
        </div>
        <div className="row mb-3 mx-0 justify-content-between">
          <div className="col-md-4 form-floating px-0">
            <input
              type="date"
              className="form-control"
              id="floatingStartDate"
              placeholder="Start Date"
              required
            />
            <label htmlFor="floatingStartDate">Start Date</label>
            <div className="invalid-feedback">This field is required</div>
          </div>
          <div className="col-md-4 form-floating px-0">
            <input
              type="date"
              className="form-control"
              id="floatingEndDate"
              placeholder="End Date"
              required
            />
            <label htmlFor="floatingEndDate">End Date</label>
            <div className="invalid-feedback">This field is required</div>
          </div>
          <div className="col-md-3 mt-2">
            <button
              className="btn btn-lg btn-primary"
              type="submit"
              // onSubmit={(e) => e.currentTarget.classList.add('was-validated')}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
