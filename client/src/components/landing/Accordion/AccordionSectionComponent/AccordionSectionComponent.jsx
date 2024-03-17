import React from 'react'
import './AccordionSectionComponent.css'
import { formatParagraph } from '../AccordionHelperFunctions/AccordionFormatParagraph'

const AccordionSectionComponent = ({
    id,
    title,
    paragraphs,
    activeId,
    setActiveId
}) => {

    const handleClick = () => {

        // if you click the same accordion again
        if (activeId === id) {
            setActiveId(prevState => null)
        }

        // if you click another accordion or you haven't clicked anything previously
        if (activeId !== id) {
            setActiveId(prevState => id)
        }

    }

    return (
        <div className="AccordionSectionComponent">
            <div onClick={handleClick} className="AccordionSectionComponent__top">
                <h3 className="AccordionSectionComponent__title">
                    {title}
                </h3>
                <button
                    className={
                        `AccordionSectionComponent__toggle-btn${activeId === id
                            ? " show"
                            : " hide"}`
                    }
                />
            </div>
            <div className={`AccordionSectionComponent__bottom-wrapper${
                activeId === id
                    ? " show"
                    : " hide"
                }`}>
                <div className="AccordionSectionComponent__bottom">
                    {formatParagraph(paragraphs)}   
                </div>
            </div>
        </div>
    )
}

export default AccordionSectionComponent