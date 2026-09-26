import type { Metadata } from "next"

import MyPlanClient from "@/components/MyPlanClient";

export const metadata: Metadata = {
  title: "My Plan - FitLog",
}



const MyPlanPage = () => {
  return (
    <MyPlanClient />
  )
}

export default MyPlanPage

