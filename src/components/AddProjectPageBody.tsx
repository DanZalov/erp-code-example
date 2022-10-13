import { useEffect, useState } from 'react'
import { useActions, useAppSelector } from '../hooks/redux'
import { openModal } from '../functions/modalFunctions'
import CustomModal from './CustomModal'
import AddProjectModalBody from './AddProjectModalBody'
import AddCustomerModalBody from './AddCustomerModalBody'
import AddBudgetModalBody from './AddBudgetModalBody'
import AddChargelineModalBody from './AddChargelineModalBody'

export default function AddProjectPageBody() {
  // const initialActiveState = {
  //   customer: '',
  //   project: '',
  //   budget: '',
  // }
  // const { selectAll } = customerStateAdapterSelectors(
  //   (state: RootState) => state.customer
  // )

  const { customer, activeState } = useAppSelector((state) => state.customer)

  const { setActiveState: setCustomerActiveState } = useActions()
  // const [activeState, setActiveState] = useState(initialActiveState)

  // useEffect(() => {
  //   document
  //     .querySelector('#addCustomerModalButton')
  //     ?.addEventListener('click', (event) => {
  //       document.querySelector('.modal-backdrop')?.classList.toggle('show')
  //       document.querySelector('#addCustomerModal')?.classList.toggle('show')
  //     })
  // }, [])

  // console.log(selectAll(store.getState()))
  // console.log(useAppSelector(selectAll)[0]?.customer)
  // console.log(useSelector(selectAll))
  // console.log(store.getState())

  return (
    <div className="container">
      <div id="tree-holder">
        <table className="table table-bordered border-white text-center align-middle text-break">
          <thead>
            <tr>
              <td className="col-md-3">
                <button
                  id="treecustomerButton"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {}}
                >
                  Customer search
                </button>
              </td>
              <td className="col-md-3">
                <button
                  id="treeProjectButton"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {}}
                >
                  Project search
                </button>
              </td>
              <td className="col-md-3">
                <button
                  id="treeBudgetButton"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {}}
                >
                  Budget search
                </button>
              </td>
              <td className="col-md-3">
                <button
                  id="treeChargeLineButton"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {}}
                >
                  Chargeline search
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-md-3 align-top">
                <ul id="treeCustomerList" className="list-group">
                  <li
                    id="Customer#0"
                    className={`list-group-item ${
                      activeState.customer && 'active'
                    }`}
                    role="button"
                    onClick={(event) => {
                      event.currentTarget.classList.toggle('active')
                      const element = event.target as HTMLElement
                      const tempCustomer = `${element.id.split('#')[1]}`
                      if (activeState.customer === tempCustomer) {
                        setCustomerActiveState({
                          customer: '',
                          project: '',
                          budget: '',
                        })
                      } else {
                        setCustomerActiveState({
                          customer: tempCustomer,
                          project: '',
                          budget: '',
                        })
                      }
                    }}
                  >
                    {customer.Company_name}
                  </li>
                  <hr />
                  <li
                    className="list-group-item d-flex flex-row justify-content-evenly"
                    role="button"
                    id="addCustomerModalButton"
                    onClick={(event) => {
                      const eventTarget = event.target as HTMLElement
                      const bugCheckLine = eventTarget.parentElement?.id.slice(
                        0,
                        -6
                      )!
                      if (bugCheckLine === 'treeCustom') {
                        openModal({
                          modalId: eventTarget?.id.slice(0, -6)!,
                        })
                      } else {
                        openModal({
                          modalId: bugCheckLine,
                        })
                      }
                    }}
                  >
                    <i className="bi bi-person-plus fs-5"></i>
                    <p className="m-1"> Add New Customer</p>
                  </li>
                </ul>
              </td>
              <td className="col-md-3 align-top">
                <ul id="treeProjectList" className="list-group">
                  {activeState.customer &&
                    customer.projectList.map((project, index) => {
                      return (
                        <li
                          className={`list-group-item ${
                            activeState.project === index.toString() && 'active'
                          }`}
                          key={index}
                          id={`Project#${index}`}
                          role="button"
                          onClick={(event) => {
                            const element = event.target as HTMLElement
                            const tempProject = `${element.id.split('#')[1]}`
                            const styleElement = document.querySelector(
                              '#treeBudgetList'
                            ) as HTMLElement
                            styleElement.style.paddingTop = `${
                              element.offsetTop - 137
                            }px`
                            if (activeState.project === tempProject) {
                              setCustomerActiveState({
                                ...activeState,
                                project: '',
                                budget: '',
                              })
                            } else {
                              setCustomerActiveState({
                                ...activeState,
                                project: tempProject,
                                budget: '',
                              })
                            }
                          }}
                        >
                          {project.Project_name}
                        </li>
                      )
                    })}
                  {activeState.customer && (
                    <>
                      <hr />
                      <li
                        className="list-group-item d-flex flex-row justify-content-evenly"
                        role="button"
                        id="addProjectModalButton"
                        onClick={(event) => {
                          const eventTarget = event.target as HTMLElement
                          const bugCheckLine =
                            eventTarget.parentElement?.id.slice(0, -6)!
                          if (bugCheckLine === 'treeProje') {
                            openModal({
                              modalId: eventTarget?.id.slice(0, -6)!,
                            })
                          } else {
                            openModal({
                              modalId: bugCheckLine,
                            })
                          }
                        }}
                      >
                        <i className="bi bi-file-earmark-plus fs-5"></i>
                        <p className="m-1"> Add New Project</p>
                      </li>
                    </>
                  )}
                </ul>
              </td>
              <td className="col-md-3 align-top">
                <ul id="treeBudgetList" className="list-group">
                  {activeState.project &&
                    customer.projectList[+activeState.project].budgetList.map(
                      (budget, index) => {
                        return (
                          <li
                            className={`list-group-item ${
                              activeState.budget === index.toString() &&
                              'active'
                            }`}
                            key={index}
                            id={`Budget#${index}`}
                            role="button"
                            onClick={(event) => {
                              const element = event.target as HTMLElement
                              const tempBudget = `${element.id.split('#')[1]}`
                              const styleElement = document.querySelector(
                                '#treeChargeLineList'
                              ) as HTMLElement
                              styleElement.style.paddingTop = `${
                                element.offsetTop - 137
                              }px`
                              if (activeState.budget === tempBudget) {
                                setCustomerActiveState({
                                  ...activeState,
                                  budget: '',
                                })
                              } else {
                                setCustomerActiveState({
                                  ...activeState,
                                  budget: tempBudget,
                                })
                              }
                            }}
                          >
                            {budget.Budget_name}
                          </li>
                        )
                      }
                    )}
                  {activeState.project && (
                    <>
                      <hr />
                      <li
                        className="list-group-item d-flex flex-row justify-content-evenly"
                        role="button"
                        id="addBudgetModalButton"
                        onClick={(event) => {
                          const eventTarget = event.target as HTMLElement
                          const bugCheckLine =
                            eventTarget.parentElement?.id.slice(0, -6)!
                          if (bugCheckLine === 'treeBudg') {
                            openModal({
                              modalId: eventTarget?.id.slice(0, -6)!,
                            })
                          } else {
                            openModal({
                              modalId: bugCheckLine,
                            })
                          }
                        }}
                      >
                        <i className="bi bi-journal-plus fs-5"></i>
                        <p className="m-1"> Add New Budget</p>
                      </li>
                    </>
                  )}
                </ul>
              </td>
              <td className="col-md-3 align-top">
                <ul id="treeChargeLineList" className="list-group">
                  {activeState.budget &&
                    customer.projectList[+activeState.project].budgetList[
                      +activeState.budget
                    ].chargeLineList.map((chargeLine, index) => {
                      return (
                        <li
                          className="list-group-item"
                          key={index}
                          id={`ChargeLine#${index}`}
                        >
                          {chargeLine.Line_name}
                        </li>
                      )
                    })}
                  {activeState.budget && (
                    <>
                      <hr />
                      <li
                        className="list-group-item d-flex flex-row justify-content-evenly"
                        role="button"
                        id="addChargelineModalButton"
                        onClick={(event) => {
                          const eventTarget = event.target as HTMLElement
                          const bugCheckLine =
                            eventTarget.parentElement?.id.slice(0, -6)!
                          if (bugCheckLine === 'treeChargeLi') {
                            openModal({
                              modalId: eventTarget?.id.slice(0, -6)!,
                            })
                          } else {
                            openModal({
                              modalId: bugCheckLine,
                            })
                          }
                        }}
                      >
                        <i className="bi bi-window-plus fs-5"></i>
                        <p className="m-1"> Add New Chargeline</p>
                      </li>
                    </>
                  )}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="display-holder"></div>
      <CustomModal id="addProjectModal" name="Add Project">
        <AddProjectModalBody />
      </CustomModal>
      <CustomModal id="addCustomerModal" name="Add Customer">
        <AddCustomerModalBody />
      </CustomModal>
      <CustomModal id="addBudgetModal" name="Add Budget">
        <AddBudgetModalBody />
      </CustomModal>
      <CustomModal id="addChargelineModal" name="Add Chargeline">
        <AddChargelineModalBody />
      </CustomModal>
    </div>
  )
}
