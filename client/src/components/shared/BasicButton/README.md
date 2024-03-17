# BasicButton Component

This document provides information about the `BasicButton` component.

## Props

- `variant`: (string) The variant of the button. Defaults to "solid".
- `color`: (string) The color of the button. Defaults to "crimson".
- `label`: (string) The label text inside the button. Defaults to "label".

## Example Usage

```jsx
import BasicButton from "./BasicButton";

function MyComponent() {
  const handleClick = () => {
    alert("I was clicked");
  };

  return (
    <BasicButton
      variant="solid"
      color="crimson"
      label="Click Me!"
      onClick={handleClick}
    />
  );
}
```
