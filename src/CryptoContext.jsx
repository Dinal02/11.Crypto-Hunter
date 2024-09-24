import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext()

const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("Rs.");

    useEffect(() => {
        if (currency === "INR") setSymbol("Rs.");
        else if (currency === "USD") setSymbol("$");
    }, [currency]);

  return (
    <div>
      <Crypto.Provider value={{currency, symbol, setCurrency}}>
        {children}
      </Crypto.Provider>
    </div>
  )
}

export default CryptoContext;

export const CryptoState = () => {
   return useContext(Crypto);
}
