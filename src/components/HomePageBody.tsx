import { Link } from 'react-router-dom'
import { openModal } from '../functions/modalFunctions'
import AddUserPageBody from './AddUserPageBody'
import CustomModal from './CustomModal'

export default function HomePageBody() {
  return (
    <div className="container">
      <main role="main" className="pb-3">
        <div className="text-center">
          <section className="content-wrapper main-content clear-fix">
            <h2 className="mb-5">Рабочее время в текущем месяце:</h2>
            <h4 className="mb-5">
              <Link className="nav-link text-dark" to="/TimeRegister">
                Новая запись
              </Link>
            </h4>

            <div
              role="button"
              className="nav-link text-dark mb-5"
              id="addUserModalButton"
              onClick={(event) => {
                const eventTarget = event.target as HTMLElement
                openModal({ modalId: eventTarget.id.slice(0, -6) })
              }}
            >
              Добавить пользователя
            </div>

            <h6 className="mb-5">
              <Link className="nav-link text-dark" to="/AddProject">
                Добавить проект
              </Link>
            </h6>
          </section>
        </div>
      </main>
      <CustomModal id="addUserModal" name="Add User">
        <AddUserPageBody />
      </CustomModal>
    </div>
  )
}
