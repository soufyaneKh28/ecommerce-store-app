import { useFonts } from 'expo-font';

export const useSatoshiFonts = () => {
  const [fontsLoaded, fontError] = useFonts({
    'Satoshi-Regular': require('../../assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('../../assets/fonts/Satoshi-Medium.otf'),
    'Satoshi-Bold': require('../../assets/fonts/Satoshi-Bold.otf'),
    'Satoshi-Black': require('../../assets/fonts/Satoshi-Black.otf'),
    'Satoshi-Light': require('../../assets/fonts/Satoshi-Light.otf'),
  });

  return { fontsLoaded, fontError };
};
