# Accordion functionality

The accordion functionality is composed of several main things

- JSON file for the data

- Accordion folder containing the logic and styles

-- AccordionContainerComponent: This folder has two files with the same name. The JSX file holds the title and maps through the JSON data. The CSS is for the styling.

It has the activeId state to track which component has been clicked.

-- AccordionHelperFunctions: This folder has a AccordionFormatParagraph.jsx file which has a function that formats the paragraph the correct way (by correct -> as the netflix has it in their website)

-- AccordionSelectComponent: This folder has two files with the same. The JSX file accepts
activeId state as props and the accordion data which is displayed there.
The handleClick function basically do one of the two things, checks if you click the same accordion twice (if that happens, you just close it). The CSS is for the styling.

The second possibility is when you click a new accordion OR you haven't clicked anything -> you are just 
going to show the accordion you want to click.  

The showing and hiding of accordion happens with adding a className through a ternary operator.
The className then removes/adds certain styles.
