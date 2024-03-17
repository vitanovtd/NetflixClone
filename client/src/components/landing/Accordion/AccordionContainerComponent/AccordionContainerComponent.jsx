import React, { useState } from 'react'
import './AccordionContainerComponent.css'
import AccordionSectionComponent from '../AccordionSectionComponent/AccordionSectionComponent'

const AccordionContainerComponent = ({
  accordionData
}) => {

  const [activeId, setActiveId] = useState(null)
  
  return (
    <div className='AccordionContainerComponent'>
      <h1 className='AccordionContainerComponent__title'>
        Frequently Asked Questions
      </h1>
        {accordionData.map((data) => (
           <AccordionSectionComponent 
             key={data.id}
             id={data.id}
             title={data.title}
             paragraphs={data.paragraphs}
             activeId={activeId}
             setActiveId={setActiveId}
           />
        ))}
    </div>
  )
}

export default AccordionContainerComponent