interface ModalProps {
  modalId: string
}

export function openModal({ modalId }: ModalProps) {
  const modal = document.querySelector(`#${modalId}`) as HTMLElement
  const backdrop = document.querySelector('.modal-backdrop') as HTMLElement
  document.body.classList.add('modal-open')
  modal.classList.remove('hidden')
  modal.classList.add('show')
  backdrop.classList.remove('hidden')
  backdrop.classList.add('show')
  document
    .querySelector(`#${modalId.slice(0, -5)}Form`)
    ?.classList.remove('was-validated')
}

export function closeModal({ modalId }: ModalProps) {
  const modal = document.querySelector(`#${modalId}`) as HTMLElement
  modal.classList.add('hidden')
  modal.classList.remove('show')
  const backdrop = document.body.querySelector('.modal-backdrop') as HTMLElement
  backdrop.classList.add('hidden')
  backdrop.classList.remove('show')
  document.body.classList.remove('modal-open')
}

export function submitAndCloseModal({ modalId }: ModalProps) {
  const modal = document.querySelector(`#${modalId}`) as HTMLElement
  modal.classList.remove('show')
  document.body.classList.remove('modal-open')
  const backdrop = document.body.querySelector('.modal-backdrop') as HTMLElement
  backdrop.classList.remove('show')
  setTimeout(() => {
    const form = document.querySelector(
      `#${modalId.slice(0, -5)}Form`
    ) as HTMLFormElement
    form.reset()
    backdrop.classList.add('hidden')
    modal.classList.add('hidden')
  }, 150)
}
