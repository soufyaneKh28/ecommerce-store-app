import { useFonts } from 'expo-font';

export const useSatoshiFonts = () => {
  // Font loading is disabled until font files are added
  // To enable: Uncomment the font requires below and add font files to assets/fonts/
  
  const fontMap: Record<string, any> = {};
  
  // Uncomment these lines once you've added the Satoshi font files:
  /*
  fontMap['Satoshi-Regular'] = require('../../assets/fonts/Satoshi-Regular.otf');
  fontMap['Satoshi-Medium'] = require('../../assets/fonts/Satoshi-Medium.otf');
  fontMap['Satoshi-Bold'] = require('../../assets/fonts/Satoshi-Bold.otf');
  fontMap['Satoshi-Black'] = require('../../assets/fonts/Satoshi-Black.otf');
  fontMap['Satoshi-Light'] = require('../../assets/fonts/Satoshi-Light.otf');
  */

  const [fontsLoaded] = useFonts(fontMap);

  // If no fonts to load, return true immediately
  return { 
    fontsLoaded: Object.keys(fontMap).length === 0 ? true : fontsLoaded, 
    fontError: null 
  };
};
