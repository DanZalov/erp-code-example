export interface IServerData {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface IServerDataState {
  dataVisible: boolean
  dataList: IServerData[]
  modalDataList: IServerData[]
}

export interface IEmployee {
  Employee_name: string
  Employee_lastname: string
  Employee_middlename: string
  Employee_id: string
  Employee_position: string
  Employee_skill: string
  Employee_level: string
  Employee_qualification_category: string
  Employee_qualification_level: string
  Employee_entry_date: string
  Employee_department: string
  Employee_phone: string
  Employee_email_company: string
  Employee_email: string
}

export interface IProjectTime {
  projectName: string
  regTime: string
  overTime: string
  id: number
}

export interface ICustomer {
  id: number
  Company_name: string
  projectList: IProject[]
}

export interface IProject {
  id: number
  Project_name: string
  Project_companyId: number
  budgetList: IBudget[]
  Project_dateStart: string
  Project_dateEnd: string
}

export interface IBudget {
  id: number
  Budget_name: string
  Budget_projectId: number
  Budget_hoursStarted: number
  chargeLineList: IChargeLine[]
}

export interface IChargeLine {
  id: number
  Line_name: string
  Line_budgetId: number
}

export interface IPost {
  id: number
  title: string
  body: string
}

export interface ILoginData {
  username: string
  password: string
}
