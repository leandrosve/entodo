import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const brand = {
  DEFAULT: "#38B2A2",
  "50": "#DCF4F1",
  "100": "#C8EEE9",
  "200": "#A1E2D9",
  "300": "#7BD5C9",
  "400": "#54C9BA",
  "500": "#38B2A2",
  "600": "#2C8B7E",
  "700": "#20645B",
  "800": "#133E38",
  "900": "#071715",
};

const breakpoints = createBreakpoints({
  sm : "30em", md : "40em", lg : "62em", xl : "80em"
})

const fonts={
  body: 'Montserrat, sans-serif',
  heading: 'Montserrat, sans-serif',
  mono: 'Montserrat, sans-serif',
}

const theme = extendTheme({
  breakpoints, 
  fonts,
  colors: {
    brand,
  },
  layerStyles: {
    mediaObject: {
      boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      padding:"10px",
    },
  },
});

export default theme;
