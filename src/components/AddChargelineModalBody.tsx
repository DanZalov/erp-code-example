import { submitAndCloseModal } from '../functions/modalFunctions'
import { useActions, useAppSelector } from '../hooks/redux'
import { IChargeLine } from '../models'
import { usePostChargelineMutation } from '../Store/TTDatabase/TTDatabase.api'

export default function AddChargelineModalBody() {
  const [postChargeline] = usePostChargelineMutation()
  const { customer, activeState } = useAppSelector((state) => state.customer)
  const { addChargeLine } = useActions()
  return (
    <div className="container">
      <form
        className="needs-validation"
        noValidate
        id="addChargelineForm"
        onSubmit={(event) => {
          const form = event.target as HTMLFormElement
          event.preventDefault()
          if (!form.checkValidity()) {
            event.stopPropagation()
            form.classList.add('was-validated')
          } else {
            const targetEvent = event.target as HTMLFormElement
            const chargelineName = targetEvent.querySelector(
              '#floatingChargelineName'
            ) as HTMLInputElement
            const budget =
              customer.projectList[+activeState.project].budgetList[
                +activeState.budget
              ]
            let chargelineCounter = 0
            customer.projectList.map((project) =>
              project.budgetList.map(
                (budget) => (chargelineCounter += budget.chargeLineList.length)
              )
            )
            addChargeLine({
              id: chargelineCounter,
              Line_name: chargelineName.value,
              Line_budgetId: budget.id,
            })
            // postChargeline({
            //   Line_name: chargelineName.value,
            //   Line_budgetId: budget.id,
            // } as IChargeLine)
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
            id="floatingChargelineName"
            placeholder="Chargeline:"
            autoComplete="off"
            required
          />
          <label htmlFor="floatingChargelineName">Chargeline:</label>
          <div className="invalid-feedback">This field is required</div>
        </div>
        <button className="btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
