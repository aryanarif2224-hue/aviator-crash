import React, { useEffect, useState } from "react";
import { config } from "./config";

export const Context = React.createContext<any>(null);

export const Provider = ({ children }: any) => {
  const [gameState, setGameState] = useState<any>({
    currentNum: 1.00,
    GameState: "FLYING", // FLYING, CRASHED
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev: any) => {
        if (prev.GameState === "FLYING") {
          let nextNum = prev.currentNum + 0.02;
          
          // 🎯 यहाँ से क्रैश पॉइंट कंट्रोल होगा (जैसे 3.50x पर क्रैश)
          if (nextNum >= 3.50) { 
            setTimeout(() => {
              setGameState({ currentNum: 1.00, GameState: "FLYING" });
            }, 4000); // क्रैश होने के 4 सेकंड बाद दोबारा शुरू होगा
            return { currentNum: nextNum, GameState: "CRASHED" };
          }
          
          return { ...prev, currentNum: nextNum };
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const value = {
    gameState,
    unityContext: {},
    update: () => {},
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
            
