import { Link } from 'react-router-dom'
import { usePostAuthMutation } from '../Store/TTDatabase/TTDatabase.api'

export default function LoginPageBody() {
  const [postLoginData] = usePostAuthMutation()
  return (
    <div className="container">
      <div className="col-md-4 mx-auto">
        <h1>Login</h1>
        <form
          className="needs-validation"
          noValidate
          id="loginForm"
          onSubmit={(event) => {
            const form = event.target as HTMLFormElement
            event.preventDefault()
            if (!form.checkValidity()) {
              event.stopPropagation()
              form.classList.add('was-validated')
            } else {
              const targetEvent = event.target as HTMLFormElement
              const username = targetEvent.querySelector(
                '#floatingUsername'
              ) as HTMLInputElement
              const password = targetEvent.querySelector(
                '#floatingPassword'
              ) as HTMLInputElement
              postLoginData({
                username: username.value,
                password: password.value,
              })
              form.reset()
            }
          }}
        >
          <hr />
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingUsername"
              placeholder="Username:"
              autoComplete="off"
              required
            />
            <label htmlFor="floatingUsername">Username:</label>
            <div className="invalid-feedback">This field is required</div>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="Password:"
              autoComplete="off"
              required
            />
            <label htmlFor="floatingPassword">Password:</label>
            <div className="invalid-feedback">This field is required</div>
          </div>
          {/* <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me?
            </label>
          </div> */}
          <div className="form-group mb-3">
            <button id="login-submit" type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          {/* <div className="form-group">
            <p>
              <Link id="forgot-password" to="/Identity/Account/ForgotPassword">
                Forgot your password?
              </Link>
            </p>
            <p>
              <Link to="/Register">Register as a new user</Link>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  )
}
