import HomeContainer from "@/containers/home";
import { Suspense } from "react";


export default function Home() {
  
  return (
    <Suspense>
      <HomeContainer />
    </Suspense>
  )
}
