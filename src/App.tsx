import Layout from './components/Layout/Layout';
import React, { createContext, useEffect, useState } from "react";
import { ITicketGroup } from "./types";


type AppContextProps = {
  data: ITicketGroup[] | null;
  updateData: (newData: ITicketGroup[]) => void
}

const initialData: ITicketGroup[] = [
  {
    groupName: "Backlog",
    tickets: [],
  },
  {
    groupName: "Ready",
    tickets: [],
  },
  {
    groupName: "In Progress",
    tickets: [],
  },
  {
    groupName: "Finished",
    tickets: [],
  },
];

export const AppContext = createContext<AppContextProps>({
  data: initialData,
  updateData: () => { },
});

function App() {
  const [data, setData] = useState<ITicketGroup[] | null>(initialData);
  useEffect(() => {
    const storedJson = localStorage.getItem("data");
    if (storedJson) {
      const parsedJson = JSON.parse(storedJson);
      if (JSON.stringify(parsedJson) !== JSON.stringify(initialData)) {
        setData(parsedJson);
      }
    }
  }, []);

  const updateData = (newData: ITicketGroup[]) => {
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  return (

      <AppContext.Provider value={{ data, updateData }}>
        <Layout />
      </AppContext.Provider>
  );
}

export default App;
