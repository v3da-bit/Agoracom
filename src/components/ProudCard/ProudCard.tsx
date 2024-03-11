import React from 'react'
import Card21 from './Card21'

function ProudCard({ data }: any) {
   
    return (
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
            {data.map((value:any)=>{
                return <Card21 
                    key={value.id}
                    id={value.id}
                    img={value.small_logo_url} 
                    title={value.name} 
                    subTitle={`(${value.stock_exchange}:${value.tidy_ticker})`} 
                    content={value.summary}/>
            })}
            
            

        </div>
        
    )
}

export default ProudCard