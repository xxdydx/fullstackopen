import { useState, useEffect } from "react";
import axios from 'axios'
import Rendering from './components/Rendering'



const App = () => {

    const[data, setData] = useState ([])
    const [filteredList, setFilter] = useState(data)
    
    useEffect(() => {
        console.log('effect')
        axios
          .get('https://restcountries.com/v3.1/all')
          .then(response => {
            console.log('(country)promise fulfilled')
            setData(response.data)
          })
      }, [])

      const filtering = (event) => {
        const query = event.target.value
    
        const filterexp = new RegExp(query, "i");
        const xxxs = data.filter(function (value) {
            return filterexp.test(value.name.common);
          });
        
        setFilter(xxxs)
       
    
    }

 

      return (
        <div>
            search <input onChange={filtering} />
            <ul>
            <Rendering filter={filteredList} />
            
            </ul>
            


        </div>



      )
}

export default App;
