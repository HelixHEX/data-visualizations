import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const colors = {
  brandpurple: {
    100: '#9D8DF1',
    200: '#31283C',
    300: '#271B2D'
  }
}

// 3. extend the theme
const theme = extendTheme({ config, colors });

export default theme;
