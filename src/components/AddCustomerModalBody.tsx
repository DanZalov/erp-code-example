import { submitAndCloseModal } from '../functions/modalFunctions'
import { useActions } from '../hooks/redux'
import { ICustomer } from '../models'
import { usePostCustomerMutation } from '../Store/TTDatabase/TTDatabase.api'

export default function AddCustomerModalBody() {
  const [postCustomer] = usePostCustomerMutation()
  const { addCustomer } = useActions()
  return (
    <div className="container">
      <form
        className="needs-validation"
        noValidate
        id="addCustomerForm"
        onSubmit={(event) => {
          const form = event.target as HTMLFormElement
          event.preventDefault()
          if (!form.checkValidity()) {
            event.stopPropagation()
            form.classList.add('was-validated')
          } else {
            const targetEvent = event.target as HTMLFormElement
            const element = targetEvent.querySelector(
              '#floatingCustomerName'
            ) as HTMLInputElement
            addCustomer(element.value)
            // postCustomer({ Company_name: element.value } as ICustomer)
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
            id="floatingCustomerName"
            placeholder="Customer:"
            autoComplete="off"
            required
          />
          <label htmlFor="floatingCustomerName">Customer:</label>
          <div className="invalid-feedback">This field is required</div>
        </div>
        <button className="btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
