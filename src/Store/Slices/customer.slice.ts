import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { IBudget, IChargeLine, ICustomer, IProject } from '../../models'
import { RootState } from '../store'

const customer: ICustomer = {
  id: 0,
  Company_name: 'ООО Рога и Копыта',
  projectList: [],
}
const Project1: IProject = {
  id: 0,
  Project_name:
    'Project1 Project1 Project1 Project1 Project1 Project1 Project1 Project1 Project1',
  Project_companyId: customer.id,
  budgetList: [],
  Project_dateStart: new Date(2000, 0, 1).toLocaleDateString('en-ca'),
  Project_dateEnd: new Date(2030, 0, 1).toLocaleDateString('en-ca'),
}
const Project2: IProject = {
  id: 1,
  Project_name: 'Project2',
  Project_companyId: customer.id,
  budgetList: [],
  Project_dateStart: new Date(2000, 0, 1).toLocaleDateString('en-ca'),
  Project_dateEnd: new Date(2030, 0, 1).toLocaleDateString('en-ca'),
}
const budget11: IBudget = {
  id: 0,
  Budget_name: 'budget11',
  Budget_projectId: Project1.id,
  Budget_hoursStarted: 100,
  chargeLineList: [],
}
const budget12: IBudget = {
  id: 1,
  Budget_name: 'budget12',
  Budget_projectId: Project1.id,
  Budget_hoursStarted: 1000,
  chargeLineList: [],
}
const budget21: IBudget = {
  id: 2,
  Budget_name: 'budget21',
  Budget_projectId: Project2.id,
  Budget_hoursStarted: 100,
  chargeLineList: [],
}
const budget22: IBudget = {
  id: 3,
  Budget_name: 'budget22',
  Budget_projectId: Project2.id,
  Budget_hoursStarted: 1000,
  chargeLineList: [],
}
const chargeLine111: IChargeLine = {
  id: 0,
  Line_name: 'chargeLine111',
  Line_budgetId: budget11.id,
}
const chargeLine112: IChargeLine = {
  id: 1,
  Line_name: 'chargeLine112',
  Line_budgetId: budget11.id,
}
const chargeLine121: IChargeLine = {
  id: 2,
  Line_name: 'chargeLine121',
  Line_budgetId: budget12.id,
}
const chargeLine122: IChargeLine = {
  id: 3,
  Line_name: 'chargeLine122',
  Line_budgetId: budget12.id,
}
const chargeLine211: IChargeLine = {
  id: 4,
  Line_name: 'chargeLine211',
  Line_budgetId: budget21.id,
}
const chargeLine212: IChargeLine = {
  id: 5,
  Line_name: 'chargeLine212',
  Line_budgetId: budget21.id,
}
const chargeLine221: IChargeLine = {
  id: 6,
  Line_name: 'chargeLine221',
  Line_budgetId: budget22.id,
}
const chargeLine222: IChargeLine = {
  id: 7,
  Line_name: 'chargeLine222',
  Line_budgetId: budget22.id,
}
customer.projectList = [Project1, Project2]
Project1.budgetList = [budget11, budget12]
Project2.budgetList = [budget21, budget22]
budget11.chargeLineList = [chargeLine111, chargeLine112]
budget12.chargeLineList = [chargeLine121, chargeLine122]
budget21.chargeLineList = [chargeLine211, chargeLine212]
budget22.chargeLineList = [chargeLine221, chargeLine222]

interface CustomerActiveState {
  customer: string
  project: string
  budget: string
}

interface CustomerState {
  customer: ICustomer
  activeState: CustomerActiveState
}

const initialActiveState: CustomerActiveState = {
  customer: '',
  project: '',
  budget: '',
}

const initialState: CustomerState = {
  customer,
  activeState: initialActiveState,
}

const customerStateAdapter = createEntityAdapter<CustomerState>({
  selectId: (customerState) => customerState.customer.id,
  sortComparer: (a, b) =>
    a.customer.Company_name.localeCompare(b.customer.Company_name),
})

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  // initialState: customerStateAdapter.getInitialState(),
  reducers: {
    // init(state) {
    //   customerStateAdapter.setOne(state, initialState)
    // },
    // addCustomer(state, action: PayloadAction<string>) {
    //   customerStateAdapter.setOne(state,{activeState:initialActiveState, customer: {id:0, name: action.payload, projectList:[]}})
    // },
    // addProject(state, action: PayloadAction<IProject>) {
    //   customerStateAdapter.upsertOne(state,{activeState, customer})
    //   state.customer.projectList.push(action.payload)
    // },
    addCustomer(state, action: PayloadAction<string>) {
      state.customer.Company_name = action.payload
      state.customer.projectList = []
      state.activeState = initialActiveState
    },
    addProject(state, action: PayloadAction<IProject>) {
      state.customer.projectList.push(action.payload)
    },
    addBudget(state, action: PayloadAction<IBudget>) {
      state.customer.projectList.map(
        (project) =>
          project.id === action.payload.Budget_projectId &&
          project.budgetList.push(action.payload)
      )
    },
    addChargeLine(state, action: PayloadAction<IChargeLine>) {
      state.customer.projectList.map((project) =>
        project.budgetList.map(
          (budget) =>
            budget.id === action.payload.Line_budgetId &&
            budget.chargeLineList.push(action.payload)
        )
      )
    },
    setActiveState(state, action: PayloadAction<CustomerActiveState>) {
      state.activeState = action.payload
    },
    // setActiveState(state, action: PayloadAction<CustomerState>) {
    //   customerStateAdapter.upsertOne(state,action.payload)
    // },
  },
})

export const customerActions = customerSlice.actions
export const customerReducer = customerSlice.reducer
// export const customerStateAdapterSelectors = customerStateAdapter.getSelectors
