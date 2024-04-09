"use client"

import CoworkingCatalog from "./CoworkingCatalog"
import SearchBar from "./SearchBar"
import { useEffect,useState } from "react"

export default function Coworking() {
    const [data,setData] = useState<Coworking[]>([])
    const [query,setQuery] = useState("")
    const [isLoading, setLoading] = useState(true)
    const [sort,setSort] = useState("asc")

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coworkings/?name[regex]=${query}`)
          .then((res) => res.json())
          .then((data) => {

            setLoading(false)
            if(sort === "asc"){
                setData(data.data)
            }
            else if(sort === "desc"){
                setData(data.data.reverse())
            }
            
          })

      }, [query,sort])


    return (
        <div className=" w-full min-h-[82vh] bg-white rounded-md">
            <SearchBar sort={setSort} search={setQuery} />
            <CoworkingCatalog isLoading={isLoading} coworking={ data}/>
        </div>
    )
}