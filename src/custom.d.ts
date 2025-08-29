declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
// khai báo các module ảnh để TypeScript hiểu

declare module "@mui/icons-material/*" {
  import { SvgIconProps } from "@mui/material/SvgIcon";
  import * as React from "react";

  const Icon: React.ComponentType<SvgIconProps>;
  export default Icon;
}