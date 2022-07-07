import { CSSProperties } from "react";
// export const applyStyles = ({ styles }: Props) => {
//   return function (selection) {
//     for (var property in styles) {
//       selection.style(property, styles[property]);
//     }
//   };
// };

export function applyStyles(styles: any) {
  return function (selection: any) {
    for (var property in styles) {
      selection.style(property, styles[property]);
    }
  };
}
