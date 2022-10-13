import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { submitAndCloseModal } from '../functions/modalFunctions'
import { IEmployee } from '../models'
import { usePostUserMutation } from '../Store/TTDatabase/TTDatabase.api'

export default function AddUserPageBody() {
  const todayDate = new Date().toLocaleDateString('en-ca')
  const mockdataExample: IEmployee = {
    Employee_name: 'Ivan',
    Employee_lastname: 'Ivanov',
    Employee_middlename: 'Ivanovich',
    Employee_id: '2658833',
    Employee_position: 'high',
    Employee_skill: 'expert',
    Employee_level: '4',
    Employee_qualification_category: 'Expert',
    Employee_qualification_level: '4',
    Employee_entry_date: '2010-01-01',
    Employee_department: '10',
    Employee_phone: '+7 (777) 777-77-77',
    Employee_email: 'mail@mail.ru',
    Employee_email_company: 'mail@company.ru',
  }
  const mockdataEmpty: IEmployee = {
    Employee_name: '',
    Employee_lastname: '',
    Employee_middlename: '',
    Employee_id: '',
    Employee_position: '',
    Employee_skill: '',
    Employee_level: '',
    Employee_qualification_category: '',
    Employee_qualification_level: '',
    Employee_entry_date: '',
    Employee_department: '',
    Employee_phone: '+7 (___) ___-__-__',
    Employee_email_company: 'example@company.ru',
    Employee_email: 'example@smth.here',
  }
  const mockdata = mockdataEmpty
  const [phone, setPhone] = useState(mockdata.Employee_phone)
  const [cursorPos, setCursorPos] = useState(4)
  const [telFlag, setTelFlag] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployee>()
  const [addUser, { data }] = usePostUserMutation()

  useEffect(() => {
    const form = document.querySelector('#addUserForm') as HTMLFormElement
    form.addEventListener('submit', () => {
      form.classList.add('was-validated')
    })

    // Loop over them and prevent submission
    // Array.prototype.slice.call(forms).forEach((form: HTMLInputElement) => {
    //   form.addEventListener(
    //     'submit',
    //     (event: SubmitEvent) => {
    //       form.classList.add('was-validated')
    //     },
    //     false
    //   )
    // })
  }, [])

  useEffect(() => {
    const element = document.querySelector('#floatingPhone') as HTMLInputElement
    element.setSelectionRange(cursorPos, cursorPos)
  }, [telFlag, cursorPos])

  function telChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const tempValue = event.target.value.split(' ').join('')
    let tempNumberValue = tempValue.slice(3).match(/\d/g)?.join('') || ''
    // if (/^\+7\(.*$/.exec(tempValue)) {
    //   console.log(tempValue)
    //   tempNumberValue = tempValue.slice(3).match(/\d/g)?.join('') || ''
    // } else {
    //   tempNumberValue = tempValue.match(/\d/g)?.join('') || ''
    // }
    if (!tempNumberValue) {
      setPhone(`+7 (___) ___-__-__`)
      setCursorPos(4)
    } else {
      const length = tempNumberValue.length
      if (length < 10) {
        for (let i = 0; i < 10 - length; i++) {
          tempNumberValue += '_'
        }

        // if (tempNumberValue === '7_________') {
        //   tempNumberValue = '__________'
        //   setCursorPos(length + 3)
        // } else
        if (length < 4) {
          setCursorPos(length + 4)
        } else if (length < 7) {
          setCursorPos(length + 6)
        } else if (length < 9) {
          setCursorPos(length + 7)
        } else {
          setCursorPos(length + 8)
        }
      } else {
        tempNumberValue = tempNumberValue.slice(0, 10)
        setCursorPos(19)
      }
      setPhone(
        `+7 (${tempNumberValue.slice(0, 3)}) ${tempNumberValue.slice(
          3,
          6
        )}-${tempNumberValue.slice(6, 8)}-${tempNumberValue.slice(-2)}`
      )
    }
    setTelFlag((prev) => !prev)
  }

  return (
    <div className="container m-0">
      <form
        // action="http://website.ru"
        // method="post"
        className="needs-validation"
        noValidate
        id="addUserForm"
        onSubmit={handleSubmit((data) => {
          const tempPhone = data.Employee_phone
          data.Employee_phone = tempPhone.replace(/-/g, ' ')
          // Array.prototype.slice.call(forms).forEach((form) => {
          //   form.classList.remove('was-validated')
          // })
          // addUser(JSON.stringify({ Employee_email_company: data.Employee_email_company }))
          // console.log(
          //   JSON.stringify({ Employee_email_company: data.Employee_email_company })
          // )
          // addUser({
          //   title: data.Employee_lastname,
          //   body: data.Employee_position,
          // } as IPost)
          addUser(data)
          // console.log(JSON.stringify(data))
          submitAndCloseModal({ modalId: `addUserModal` })
        })}
      >
        <div className="row mb-3 mx-0">
          <div className="col form-floating px-0">
            <input
              {...register('Employee_name', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              type="text"
              className="form-control"
              // className={`form-control ${
              //   errors.Employee_name ? 'is-invalid' : ''
              // }`}
              id="floatingFirstName"
              placeholder="First name"
              defaultValue={mockdata.Employee_name}
              required
              autoComplete="off"
            />
            <label htmlFor="floatingFirstName">First name*</label>
            <div className="invalid-feedback">
              {errors.Employee_name?.message}
            </div>
          </div>
          <div className="col form-floating mx-2 px-0">
            <input
              {...register('Employee_lastname', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              type="text"
              className="form-control"
              id="floatingLastName"
              placeholder="Last name"
              defaultValue={mockdata.Employee_lastname}
              required
              autoComplete="off"
            />
            <label htmlFor="floatingLastName">Last name*</label>
            <div className="invalid-feedback">
              {errors.Employee_lastname?.message}
            </div>
          </div>
          <div className="col form-floating px-0">
            <input
              {...register('Employee_middlename')}
              type="text"
              className="form-control"
              id="floatingMiddleName"
              placeholder="Middle name"
              defaultValue={mockdata.Employee_middlename}
              autoComplete="off"
            />
            <label htmlFor="floatingMiddleName">Middle name</label>
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-md-2 form-floating px-0">
            <input
              {...register('Employee_id')}
              type="number"
              className="form-control"
              id="floatingBemsid"
              placeholder="BEMS ID"
              defaultValue={mockdata.Employee_id}
              autoComplete="off"
            />
            <label htmlFor="floatingBemsid">ID</label>
          </div>
          <div className="col-md-2 form-floating ms-2 px-0" id="divFloating">
            <input
              {...register('Employee_skill')}
              type="text"
              className="form-control"
              id="floatingSkill"
              placeholder="Skill Code"
              defaultValue={mockdata.Employee_skill}
              autoComplete="off"
            />
            <label htmlFor="floatingSkill">Skill Code</label>
            {(errors.Employee_qualification_category?.message ||
              errors.Employee_qualification_level?.message) && (
              <div className="hidden" id="addUserFormHiddenDiv"></div>
            )}
          </div>
          <div className="input-group col ms-2 px-0" id="divLevelSelector">
            <label className="input-group-text" htmlFor="levelSelector">
              Level
            </label>
            <select
              className="form-select"
              aria-label="Level selector"
              defaultValue={mockdata.Employee_level}
              id="levelSelector"
              {...register('Employee_level')}
            >
              <option value=""></option>
              <option value="">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="input-group col mx-2 px-0">
            <label
              className="input-group-text"
              htmlFor="Qualification category selector"
              id="qualificationCategorySelector"
            >
              Role*
            </label>
            <select
              className="form-select"
              aria-label="Qualification category selector"
              defaultValue={mockdata.Employee_qualification_category}
              id="qualificationCategorySelector"
              {...register('Employee_qualification_category', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              required
            >
              <option value=""></option>
              <option value="Beginner">Beginner</option>
              <option value="Exp. p.">Exp. p.</option>
              <option value="H. Exp. p.">H. Exp. p.</option>
              <option value="Un. Exp. p.">Un. Exp. p.</option>
              <option value="Expert">Expert</option>
            </select>
            <div className="invalid-tooltip">
              {errors.Employee_qualification_category?.message}
            </div>
          </div>
          <div
            className="input-group col px-0"
            id="divQualificationLevelSelector"
          >
            <label
              className="input-group-text"
              htmlFor="Qualification level selector"
            >
              Value*
            </label>
            <select
              className="form-select"
              aria-label="Qualification level selector"
              defaultValue={mockdata.Employee_qualification_level}
              {...register('Employee_qualification_level', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              required
            >
              <option value=""></option>
              <option value="N/A">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <div className="invalid-tooltip">
              {errors.Employee_qualification_level?.message}
            </div>
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-md-2 form-floating px-0">
            <input
              {...register('Employee_entry_date', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              type="date"
              className="form-control"
              id="floatingEntryDate"
              placeholder="Entry Date"
              defaultValue={mockdata.Employee_entry_date}
              required
              min="1990-01-01"
              max={todayDate}
            />
            <label htmlFor="floatingEntryDate">Entry Date*</label>
            <div className="invalid-feedback">
              {errors.Employee_entry_date?.message}
            </div>
          </div>
          <div className="col-md-2 form-floating mx-2 px-0" id="divFloating">
            <input
              {...register('Employee_department', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              type="text"
              className="form-control"
              id="floatingDepartment"
              placeholder="Department"
              defaultValue={mockdata.Employee_department}
              required
              autoComplete="off"
            />
            <label htmlFor="floatingDepartment">Department*</label>
            <div className="invalid-feedback">
              {errors.Employee_department?.message}
            </div>
          </div>
          <div className="col form-floating px-0">
            <input
              {...register('Employee_position', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              type="text"
              className="form-control"
              id="floatingPosition"
              placeholder="Position"
              defaultValue={mockdata.Employee_position}
              required
              autoComplete="off"
            />
            <label htmlFor="floatingPosition">Position*</label>
            <div className="invalid-feedback">
              {errors.Employee_position?.message}
            </div>
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-md-3 form-floating px-0">
            <input
              {...register('Employee_phone', {
                pattern: {
                  value: /\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/,
                  message: 'Enter all numbers',
                },
              })}
              type="tel"
              className="form-control"
              id="floatingPhone"
              placeholder="Phone number"
              value={phone}
              pattern="\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
              onInput={telChangeHandler}
              autoComplete="off"
            />
            <label htmlFor="floatingPhone">Phone number*</label>
            <div className="invalid-feedback">
              {errors.Employee_phone?.message}
            </div>
          </div>
          <div className="col-md-4 form-floating mx-2 px-0">
            <input
              {...register('Employee_email', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
                pattern: {
                  value: /^(?!example@).*@\w+\.\w+$/,
                  message: 'Format "mail@mail.ru"',
                },
              })}
              type="email"
              className="form-control"
              id="floatingPrivateEmail"
              placeholder="Private Email"
              defaultValue={mockdata.Employee_email}
              required
              pattern="^(?!example@).*@\w+\.\w+$"
              autoComplete="off"
            />
            <label htmlFor="floatingPrivateEmail">Private Email*</label>
            <div className="invalid-feedback">
              {errors.Employee_email?.message}
            </div>
          </div>
          <div className="col form-floating px-0">
            <input
              {...register('Employee_email_company', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
                pattern: {
                  value: /^(?!.*example).*@company\.ru$/,
                  message: 'Format "mail@company.ru"',
                },
              })}
              type="email"
              className="form-control"
              id="floatingCompanyEmail"
              placeholder="Company Email"
              defaultValue={mockdata.Employee_email_company}
              required
              pattern="^(?!.*example).*@company\.ru$"
              autoComplete="off"
            />
            <label htmlFor="floatingCompanyEmail">Company Email*</label>
            <div className="invalid-feedback">
              {errors.Employee_email_company?.message}
            </div>
          </div>
          {/* <div className="col px-0 d-grid m-2">
            <button className="btn btn-lg btn-primary" type="submit">
              Submit form
            </button>
          </div> */}
        </div>
        <button
          className="btn btn-lg btn-primary"
          type="submit"
          // onSubmit={(e) => e.currentTarget.classList.add('was-validated')}
        >
          Submit form
        </button>
      </form>
    </div>
  )
}

// function telChangeHandler(event: ChangeEvent<HTMLInputElement>) {
//   const tempValue = event.target.value
//   console.log('telHandler,', cursorPos)

//   if (tempValue.length < 16) {
//     const index = event.target.selectionStart!
//     setCursorPos(index)
//     if (
//       (2 < index && index < 6) ||
//       (6 < index && index < 10) ||
//       (10 < index && index < 13) ||
//       (13 < index && index < 15)
//     ) {
//       // const newTempValue = `+7(${tempValue.slice(2, 5)})${tempValue.slice(6, 9)}-${tempValue.slice(10, 12)}-${tempValue.slice(-3)}`
//       const newTempValue = `${
//         tempValue.slice(0, index - 15) + '_' + phone.slice(index - 15)
//       }`
//       setPhone(newTempValue)
//     } else if (index === 15) {
//       const newTempValue = `${tempValue + '_'}`
//       setPhone(newTempValue)
//     } else if (index === 6) {
//       const newTempValue = `${
//         tempValue.slice(0, index - 16) + '_' + ')' + phone.slice(index - 15)
//       }`
//       setPhone(newTempValue)
//       setCursorPos((prev) => prev - 1)
//     } else if ([10, 13].includes(index)) {
//       const newTempValue = `${
//         tempValue.slice(0, index - 16) + '_' + '-' + phone.slice(index - 15)
//       }`
//       setPhone(newTempValue)
//       setCursorPos((prev) => prev - 1)
//     } else if (index < 3) {
//       setCursorPos(3)
//     }

//     if ([7, 11, 14].includes(index)) {
//       setCursorPos((prev) => prev - 1)
//     }
//     // else {
//     //   setCursorPos(index)
//     // }
//   } else {
//     const index = event.target.selectionStart! - 1
//     setCursorPos(index)

//     if (!/[0-9]/.exec(tempValue[index])) {
//       setTelFlag((prev) => !prev)
//       return
//     }

//     if (
//       (2 < index && index < 6) ||
//       (6 < index && index < 10) ||
//       (10 < index && index < 13) ||
//       (13 < index && index < 15)
//     ) {
//       // const newTempValue = `+7(${tempValue.slice(2, 5)})${tempValue.slice(6, 9)}-${tempValue.slice(10, 12)}-${tempValue.slice(-3)}`
//       const newTempValue = `${
//         tempValue.slice(0, index - 17) +
//         tempValue[index] +
//         phone.slice(index - 15)
//       }`
//       setPhone(newTempValue)
//     } else if (index === 15) {
//       const newTempValue = `${
//         tempValue.slice(0, index - 17) + tempValue[index]
//       }`
//       setPhone(newTempValue)
//     } else if (index === 6) {
//       const newTempValue = `${
//         tempValue.slice(0, index - 17) +
//         ')' +
//         tempValue[index] +
//         phone.slice(index - 14)
//       }`
//       setPhone(newTempValue)
//       setCursorPos((prev) => prev + 1)
//     } else if ([10, 13].includes(index)) {
//       const newTempValue = `${
//         tempValue.slice(0, index - 17) +
//         '-' +
//         tempValue[index] +
//         phone.slice(index - 14)
//       }`
//       setPhone(newTempValue)
//       setCursorPos((prev) => prev + 1)
//     } else if (index < 3) {
//       setCursorPos(3)
//     }

//     if ([5, 9, 12].includes(index)) {
//       setCursorPos((prev) => prev + 2)
//     } else {
//       setCursorPos((prev) => prev + 1)
//     }
//   }
//   setTelFlag((prev) => !prev)
// }
