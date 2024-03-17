# IconButton Component

This document provides information about the `IconButton` component.

## Props

- `icon`: (string) The name of the bootstrap-icon. Defaults to "".
- `color`: (string) The color of the icon font. Defaults to "white".
- `size`: (string) The size of icon inside the button. Defaults to "1rem".
- `type`: (string) The type of the button. Defaults to "button".

## Example Usage

```jsx
import IconButton from "./IconButton";

function MyComponent() {
  const handleClick = () => {
    alert("I was clicked");
  };
  const handleMouseDown = () => {
    alert("I was clicked");
  };

  return (
    <IconButton
      icon="bi bi-search"
      color="#bcbcbc"
      size="Click Me!"
      type="button"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    />
  );
}
```
