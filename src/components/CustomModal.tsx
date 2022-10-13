import { ReactNode } from 'react'
import { closeModal } from '../functions/modalFunctions'

interface ModalProps {
  children: ReactNode
  id: string
  name: string
}

export default function CustomModal({ children, id, name }: ModalProps) {
  return (
    <div
      className="modal fade hidden"
      id={`${id}`}
      aria-labelledby={`${id}Label`}
      aria-modal="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered" id={`${id}Container`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {name}
            </h5>
            <button
              type="button"
              className="btn-close"
              id={`${id}CloseButton`}
              onClick={(event) => {
                const eventTarget = event.target as HTMLElement
                closeModal({ modalId: eventTarget.id.slice(0, -11) })
              }}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  )
}
