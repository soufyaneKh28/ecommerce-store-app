# Satoshi Font Installation Guide

## Steps to Install Satoshi Font:

1. **Download Satoshi Font Files:**
   - Visit: https://www.fontshare.com/fonts/satoshi
   - Or search for "Satoshi font free download"
   - Download the following font weights:
     - `Satoshi-Regular.otf`
     - `Satoshi-Medium.otf`
     - `Satoshi-Bold.otf`
     - `Satoshi-Black.otf`
     - `Satoshi-Light.otf`

2. **Place Font Files:**
   - Copy all `.otf` files to: `assets/fonts/` directory
   - Make sure the files are named exactly as:
     - `Satoshi-Regular.otf`
     - `Satoshi-Medium.otf`
     - `Satoshi-Bold.otf`
     - `Satoshi-Black.otf`
     - `Satoshi-Light.otf`

3. **Restart Expo:**
   ```bash
   npm start
   # Press 'r' to reload or restart the dev server
   ```

## Usage in Your Components:

```typescript
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
  },
  boldText: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 18,
  },
  mediumText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
  },
});
```

## Available Font Weights:
- `Satoshi-Regular` - Regular weight
- `Satoshi-Medium` - Medium weight
- `Satoshi-Bold` - Bold weight
- `Satoshi-Black` - Black/Extra Bold weight
- `Satoshi-Light` - Light weight

Note: If you only have certain weights, you can modify `src/hooks/use-fonts.ts` to only include the fonts you have.

