import { createContext, useState } from "react";

const Context = createContext();

function Provider({ children }) {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("item")) || []);

    return (
        <Context.Provider value={{ items, setItems }}>
            {children}
        </Context.Provider>
    )
}

export {
    Context,
    Provider
}

