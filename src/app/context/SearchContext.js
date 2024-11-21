'use client'

import { Children, createContext,useEffect,useState } from "react"


const SearchContext = createContext()


export function SearchProvider({children}){
    const [search,setSearch] = useState(null)

    return(
        <SearchContext.Provider value={{search,setSearch}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext