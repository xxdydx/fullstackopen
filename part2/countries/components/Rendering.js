import React from 'react'
import {useState} from 'react'
import Country from './Country'

const Subrender = ({country, index}) => {
    const [show, setShow] = useState(false)

    const buttonText = show ? "hide" : "show";

    return (
        <div>
        <li key={index}>
            {country.name.common} 
        </li>

        <button onClick={() => setShow(!show)}>
            {buttonText}
            </button>
            {
                show ? (
                    <div>
                    <Country country={country} />
                    <br />
                    </div>
                )

                : null
            }

        </div> 
        )
}


const Rendering = ({filter}) => {



    if (filter.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    else if (filter.length <= 10 && filter.length > 1) {
        
        return (
            
            filter.map((country,index) => {

            return (
                <div>
                    <Subrender country={country} index={index} />
                    
                </div>


            )
            
            }
            )


        
        )
        
        
    }
    else if (filter.length === 1) {
        return (
            <Country country= {filter[0]} />

            
        )
    }


}

export default Rendering;
