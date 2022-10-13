import { bindActionCreators } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { customerActions } from '../Store/Slices/customer.slice'
import { jsonphActions } from '../Store/JsonPH/JsonPH.slice'
import { projectListActions } from '../Store/Slices/projects.slice'
import { RootState } from '../Store/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// export const useCustomerSelector: TypedUseSelectorHook<RootState> =
//   customerStateAdapterSelectors

const actions = {
  ...jsonphActions,
  ...projectListActions,
  ...customerActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
