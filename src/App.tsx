import Layout from './components/Layout/Layout';
import React, { createContext, useEffect, useState } from "react";
import { ITicket, TicketGroup } from "./types";


type AppContextProps = {
  data: Map<TicketGroup, ITicket[]>;
  updateData: (newData: Map<TicketGroup, ITicket[]>) => void
}

const initialData: Map<TicketGroup, ITicket[]> = new Map([
  [TicketGroup.Backlog, []],
  [TicketGroup.Ready, []],
  [TicketGroup.InProgress, []],
  [TicketGroup.Finished, []],
]);

export const AppContext = createContext<AppContextProps>({
  data: initialData,
  updateData: () => { },
});

function App() {
  const [data, setData] = useState<Map<TicketGroup, ITicket[]>>(initialData);

  useEffect(() => {
    const storedJson = localStorage.getItem("data");
    if (storedJson) {
      const parsedJson = new Map<TicketGroup, ITicket[]>(JSON.parse(storedJson));
      if (!areMapsEqual(parsedJson, initialData)) {
        setData(parsedJson);
      }
    }
  }, []);

  function areMapsEqual(mapA: Map<any, any>, mapB: Map<any, any>): boolean {
    if (mapA.size !== mapB.size) {
      return false;
    }
  
    let isEqual = true;
  
    mapA.forEach((value, key) => {
      if (!mapB.has(key) || mapB.get(key) !== value) {
        isEqual = false;
      }
    });
  
    return isEqual;
  }
  
  const updateData = (newData: Map<TicketGroup, ITicket[]>) => {
    setData(newData);
    localStorage.setItem("data", JSON.stringify(Array.from(newData.entries())));
  };

  return (
    <AppContext.Provider value={{ data, updateData }}>
      <Layout />
    </AppContext.Provider>
  );
}


export default App;
