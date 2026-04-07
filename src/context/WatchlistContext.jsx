import React, { createContext, useContext, useEffect, useState } from 'react'


const WatchlistContext = createContext()

export const WatchlistProvider = ({children}) => {
    
    const [watchlist, setWatchlist] = useState ([])





const [loaded, setLoaded] = useState(false)

useEffect(() => {
  const stored = localStorage.getItem("watchlist")
  if (stored) setWatchlist(JSON.parse(stored))
  setLoaded(true)  // load ho gaya
}, [])

useEffect(() => {
  if (!loaded) return  // load nahi hua abhi toh mat likho
  localStorage.setItem("watchlist", JSON.stringify(watchlist))
}, [watchlist, loaded])





    
    const toggleWatchlist = (movie)=>{
        const exists = watchlist.find ((item)=> item.id === movie.id)

        if (exists){
            // remove
            setWatchlist(watchlist.filter((item)=>item.id !==movie.id))
        }else{
            // add
            setWatchlist([...watchlist, movie])
        }
    }

    const isInWatchlist = (id)=>{
        return watchlist.some((item)=> item.id === id)
    }
    
  return (
    <WatchlistContext.Provider value={{watchlist, toggleWatchlist, isInWatchlist}}>
        {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = ()=>useContext(WatchlistContext);