export const changeAnchor = (anchor, styles) => {
    switch (anchor) {
      case "left":
        return styles.left;
      case "right":
        return styles.right;
      default:
        return styles.left;
    }
  };