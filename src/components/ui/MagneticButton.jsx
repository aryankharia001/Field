import { Link } from "react-router-dom";
import { useMagnetic } from "../../hooks/useMagnetic";
import { cursorHoverProps } from "../../lib/cursorBus";

/**
 * Shared magnetic interactive element. Renders as a Link, <a>, or
 * <button> depending on props, always keyboard-operable regardless of
 * the magnetic effect layered on top.
 */
export default function MagneticButton({
  as,
  to,
  href,
  onClick,
  children,
  className = "",
  cursor = "view",
  strength = 0.35,
  type = "button",
  ...props
}) {
  const magneticRef = useMagnetic(strength);
  const hoverProps = cursor ? cursorHoverProps(cursor) : {};

  const Component = as || (to ? Link : href ? "a" : "button");
  const componentProps = {
    ref: magneticRef,
    className,
    ...hoverProps,
    ...props,
  };

  if (Component === Link) {
    componentProps.to = to;
  } else if (Component === "a") {
    componentProps.href = href;
  } else {
    componentProps.type = type;
    componentProps.onClick = onClick;
  }
  if (Component === Link && onClick) componentProps.onClick = onClick;

  return <Component {...componentProps}>{children}</Component>;
}
