import React, { createContext } from "react";


export type FitnessContext = {
    userId:string
    selectedSport: string
    setSelectedSport: React.Dispatch<React.SetStateAction<string>>
  }

  export const FitnessContext = createContext<FitnessContext>({
    userId:"69b3785d-1c5a-4f1a-9d6f-d8f630faff1a",
    selectedSport:"",
    setSelectedSport:()=>{}
  })
