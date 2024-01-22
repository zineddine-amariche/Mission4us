// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#fafafa",
    200: "#f6f6f6",
    300: "#f1f1f1",
    400: "#ededed",
    500: "#e8e8e8",
    600: "#bababa",
    700: "#8b8b8b",
    800: "#5d5d5d",
    900: "#2e2e2e",
    1000: "#000000",
  },
  primary: {
    // blue
    100: "#d5dceb",
    200: "#aab9d7",
    300: "#8096c2",
    400: "#5573ae",
    500: "#2b509a",
    600: "#22407b",
    700: "#1a305c",
    800: "#11203e",
    900: "#09101f",
  },
  secondary: {
    // teal
    100: "#d2f2ef",
    200: "#a5e5de",
    300: "#78d8ce",
    400: "#4bcbbd",
    500: "#1ebead",
    600: "#18988a",
    700: "#127268",
    800: "#0c4c45",
    900: "#062623",
  },
  thirdly: {
    100: "#d2d4d7",
    200: "#a5a9ae",
    300: "#797f86",
    400: "#4c545d",
    500: "#1f2935",
    600: "#19212a",
    700: "#131920",
    800: "#0c1015",
    900: "#06080b",
  },
};

// yellow: {
//     100: "#fff3d8",
//     200: "#ffe7b0",
//     300: "#ffdc89",
//     400: "#ffd061",
//     500: "#ffc43a",
//     600: "#cc9d2e",
//     700: "#997623",
//     800: "#664e17",
//     900: "#33270c"
// },

// function that reverses color
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              ...tokensDark.grey,
              main: tokensDark.primary[500],
              light: tokensDark.grey[0],
              dark: tokensDark.primary[700],
              contrastText: tokensDark.grey[300],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[500],
              light: tokensDark.grey[100],
              dark: tokensDark.grey[100],
              contrastText: tokensDark.grey[100],
            },
            neutral: {
              ...tokensDark.grey,
              ...tokensDark.thirdly,
              ...tokensDark.secondary,
              main: tokensDark.thirdly[900],
              dark: tokensDark.grey[0],
            },
            background: {
              ...tokensDark.grey,
              ...tokensDark.thirdly,
              ...tokensDark.secondary,
              ...tokensDark.primary,
              default: tokensDark.secondary[800],
              alt: tokensDark.primary[900],
              main: tokensDark.secondary[300],
              
            },
          }
        : {
            primary: {
              ...tokensLight.primary,
              ...tokensLight.grey,
              main: tokensDark.grey[50],
              light: tokensDark.primary[500],
              dark: tokensDark.grey[0],
              contrastText: tokensDark.grey[900],
            },
            secondary: {
              ...tokensLight.secondary,
              ...tokensLight.grey,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
              dark: tokensDark.grey[0],
              contrastText: tokensDark.grey[100],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[0],
              dark: tokensDark.thirdly[400],
            },
            background: {
              default: tokensDark.grey[50],
              alt: tokensDark.grey[50],
              main: tokensDark.primary[300],

            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
