// Lets TypeScript treat `import X from "./foo.svg"` as a React component
// (paired with react-native-svg-transformer in metro.config.js).
declare module "*.svg" {
  import type React from "react";
  import type { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;
  export default content;
}
