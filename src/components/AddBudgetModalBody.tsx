import { submitAndCloseModal } from '../functions/modalFunctions'
import { useActions, useAppSelector } from '../hooks/redux'
import { IBudget } from '../models'
import { usePostBudgetMutation } from '../Store/TTDatabase/TTDatabase.api'

export default function AddBudgetPageBody() {
  const [postBudget] = usePostBudgetMutation()
  const { customer, activeState } = useAppSelector((state) => state.customer)
  const { addBudget } = useActions()
  return (
    <div className="container">
      <form
        className="needs-validation"
        noValidate
        id="addBudgetForm"
        onSubmit={(event) => {
          const form = event.target as HTMLFormElement
          event.preventDefault()
          if (!form.checkValidity()) {
            event.stopPropagation()
            form.classList.add('was-validated')
          } else {
            const targetEvent = event.target as HTMLFormElement
            const budgetName = targetEvent.querySelector(
              '#floatingBudgetName'
            ) as HTMLInputElement
            const budgetHours = targetEvent.querySelector(
              '#floatingBudgetHours'
            ) as HTMLInputElement
            const project = customer.projectList[+activeState.project]
            let budgetCounter = 0
            customer.projectList.map(
              (project) => (budgetCounter += project.budgetList.length)
            )
            addBudget({
              id: budgetCounter,
              Budget_projectId: project.id,
              Budget_name: budgetName.value,
              Budget_hoursStarted: +budgetHours.value,
              chargeLineList: [],
            })
            // postBudget({
            //   Budget_name: budgetName.value,
            //   Budget_hoursStarted: +budgetHours.value,
            //   Budget_projectId: project.id,
            // } as IBudget)
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
            id="floatingBudgetName"
            placeholder="budget:"
            autoComplete="off"
            required
          />
          <label htmlFor="floatingProjectName">Budget:</label>
          <div className="invalid-feedback">This field is required</div>
        </div>
        <div className="row mb-3 mx-0 justify-content-between">
          <div className="col-md-4 form-floating px-0">
            <input
              type="number"
              className="form-control"
              id="floatingBudgetHours"
              placeholder="Hours"
              required
            />
            <label htmlFor="floatingBudgetHours">Hours</label>
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
