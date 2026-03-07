import { createContext, useContext, useState } from "react";

type StockData = {
  stock1: number[];
  stock2: number[];
};

type StockContextType = {
  data: StockData;
};

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider = ({ children }: { children: React.ReactNode }) => {

  // dynamic stock values
  const [data] = useState<StockData>({
    stock1: [120, 130, 150, 170, 160],
    stock2: [80, 90, 100, 110, 105],
  });

  return (
    <StockContext.Provider value={{ data }}>
      {children}
    </StockContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStock = () => {
  const context = useContext(StockContext);

  if (!context) {
    throw new Error("useStock must be used inside StockProvider");
  }

  return context;
};