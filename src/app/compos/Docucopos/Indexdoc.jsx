import { Outlet } from 'react-router-dom'
import Createdoc from '../Dashcompos/Createdoc'
import Switchdocs from '../Dashcompos/Switchdocs'
import { useSelector } from 'react-redux'

const Indexdoc = () => {
  const { compo } = useSelector(state => state.dashstore.randers)

  return (
    <>
      {compo}
      <Createdoc />
      <Switchdocs />
      <Outlet />
    </>
  )
}

export default Indexdoc