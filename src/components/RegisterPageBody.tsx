import { usePostAuthMutation } from '../Store/TTDatabase/TTDatabase.api'

export default function RegisterPageBody() {
  const [postLoginData] = usePostAuthMutation()
  return (
    <div className="container">
      <div className="col-md-4 mx-auto">
        <h1>Register</h1>
        <form
          id="registerForm"
          className="needs-validation"
          noValidate
          onSubmit={(event) => {
            const form = event.target as HTMLFormElement
            event.preventDefault()
            if (!form.checkValidity()) {
              event.stopPropagation()
              form.classList.add('was-validated')
            } else {
              const targetEvent = event.target as HTMLFormElement
              const username = targetEvent.querySelector(
                '#floatingNewUsername'
              ) as HTMLInputElement
              const password = targetEvent.querySelector(
                '#floatingNewPassword'
              ) as HTMLInputElement
              postLoginData({
                username: username.value,
                password: password.value,
              })
              form.reset()
            }
          }}
        >
          <h4>Create a new account.</h4>
          <hr />
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingNewUsername"
              placeholder="Username:"
              autoComplete="off"
              required
            />
            <label htmlFor="floatingNewUsername">Username:</label>
            <div className="invalid-feedback">This field is required</div>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingNewPassword"
              placeholder="Password:"
              autoComplete="off"
              required
            />
            <label htmlFor="floatingNewPassword">Password:</label>
            <div className="invalid-feedback">This field is required</div>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingConfirmPassword"
              placeholder="Confirm Password:"
              autoComplete="off"
              required
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password:</label>
            <div className="invalid-feedback">This field is required</div>
          </div>
          {/* <div className="form-group">
            <label htmlFor="Input_Email">Email</label>
            <input
              className="form-control"
              type="email"
              data-val="true"
              data-val-email="The Email field is not a valid e-mail address."
              data-val-required="The Email field is required."
              id="Input_Email"
              name="Input.Email"
              defaultValue=""
            />
            <span
              className="text-danger field-validation-valid"
              data-valmsg-for="Input.Email"
              data-valmsg-replace="true"
            ></span>
          </div>
          <div className="form-group">
            <label htmlFor="Input_Password">Password</label>
            <input
              className="form-control"
              type="password"
              data-val="true"
              data-val-length="The Password must be at least 6 and at max 100 characters long."
              data-val-length-max="100"
              data-val-length-min="6"
              data-val-required="The Password field is required."
              id="Input_Password"
              maxLength={100}
              name="Input.Password"
            />
            <span
              className="text-danger field-validation-valid"
              data-valmsg-for="Input.Password"
              data-valmsg-replace="true"
            ></span>
          </div>
          <div className="form-group">
            <label htmlFor="Input_ConfirmPassword">Confirm password</label>
            <input
              className="form-control"
              type="password"
              data-val="true"
              data-val-equalto="The password and confirmation password do not match."
              data-val-equalto-other="*.Password"
              id="Input_ConfirmPassword"
              name="Input.ConfirmPassword"
            />
            <span
              className="text-danger field-validation-valid"
              data-valmsg-for="Input.ConfirmPassword"
              data-valmsg-replace="true"
            ></span>
          </div> */}
          <button id="registerSubmit" type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
