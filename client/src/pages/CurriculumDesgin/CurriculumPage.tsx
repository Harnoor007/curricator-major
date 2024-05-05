import { Outlet } from "react-router-dom"
import DefaultSidebar from "../Layout/LeftNav"

export default function CurriculumPage(){
  return(
    <>
      <div className="container-fluid flex flex-row ">
      <DefaultSidebar/>
      <Outlet/>
      </div>
    </>
  )
}
