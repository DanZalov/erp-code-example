interface GetButtonProps {
  handler(isModal: boolean): Promise<void>
}

export function GetButton({ handler }: GetButtonProps) {
  return (
    <div className="button-holder m-3">
      <button
        id="jsonGetButton"
        type="button"
        className="btn btn-primary btn-lg"
        onClick={handler.bind(null, false)}
      >
        Get data!
      </button>
    </div>
  )
}

export function ModalGetButton({ handler }: GetButtonProps) {
  return (
    <div className="button-holder m-3">
      <button
        id="jsonModalGetButton"
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#getDataModal"
        onClick={handler.bind(null, true)}
      >
        Get modal data!
      </button>
    </div>
  )
}
