import {
  GetButton,
  ModalGetButton,
} from '../components/GetDataComponents/GetButton'
import GetDataModal from '../components/GetDataComponents/GetDataModal'
import Table from '../components/GetDataComponents/Table'
import { useActions, useAppSelector } from '../hooks/redux'
import { useLazyGetTodosQuery } from '../Store/JsonPH/JsonPH.api'

export default function GetDataPage() {
  const [fetchData] = useLazyGetTodosQuery()
  const { showTable, addData, addModalData } = useActions()

  const { dataVisible, dataList, modalDataList } = useAppSelector(
    (state) => state.jsonph
  )

  async function fetchDataHandler(isModal: boolean) {
    // const { isLoading, isError, data } = useGetTodosQuery(20)
    const response = await fetchData(20).unwrap()
    if (isModal === true) {
      addModalData(response)
    } else {
      showTable()
      addData(response)
    }
  }

  return (
    <div className="container text-center">
      <GetButton handler={fetchDataHandler} />
      <ModalGetButton handler={fetchDataHandler} />
      {dataVisible && <Table data={dataList} />}
      <GetDataModal data={modalDataList} />
    </div>
  )
}
