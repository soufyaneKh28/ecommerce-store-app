# Qutli E-Commerce Store App

A beautiful Shein-style e-commerce mobile application built with Expo React Native and React Navigation.

## 🎨 Features

- **Product Browsing**: Grid view of products with search functionality
- **Categories**: Browse products by category (Dresses, Tops, Bottoms, Outerwear, Accessories, Shoes)
- **Product Details**: Full product information with image gallery, size/color selection
- **Shopping Cart**: Add items to cart with quantity management
- **User Profile**: Account management and settings
- **Authentication**: Login/Signup with demo credentials
- **Onboarding**: Beautiful swipeable introduction screens
- **Dark Mode**: Full support for light and dark themes
- **Discount Badges**: Visual indicators for sales and promotions
- **Cart Badge**: Live cart item counter on tab bar

## 🔐 Demo Credentials

For testing purposes, use these demo accounts:

| Email | Password | Description |
|-------|----------|-------------|
| `demo@qutli.com` | `demo123` | Main demo account |
| `user@test.com` | `password` | Test user account |
| `admin@qutli.com` | `admin123` | Admin demo account |

**Quick Login**: Tap "Use Demo Account" button on login screen to auto-fill credentials.

## 🛠 Tech Stack

- **Framework**: Expo SDK 54
- **Navigation**: React Navigation v7
  - Native Stack Navigator
  - Bottom Tabs Navigator
- **Language**: TypeScript
- **State Management**: React Context API
- **Storage**: AsyncStorage for persistence
- **UI Components**: React Native with custom components
- **Icons**: Expo Symbols

## 📁 Project Structure

```
ecommerce-store-app/
├── App.tsx                 # Main app entry point
├── index.js               # Expo entry point
├── screens/               # Screen components
│   ├── SplashScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   ├── ShopScreen.tsx
│   ├── CategoriesScreen.tsx
│   ├── CartScreen.tsx
│   ├── ProfileScreen.tsx
│   └── ProductDetailsScreen.tsx
├── navigation/            # Navigation configuration
│   ├── RootNavigator.tsx  # Stack navigator with auth flow
│   └── TabNavigator.tsx   # Bottom tab navigator
├── context/              # React Context providers
│   ├── AuthContext.tsx   # Authentication state management
│   └── CartContext.tsx   # Cart state management
├── data/                 # Mock data
│   └── products.ts       # Product and category data
├── types/                # TypeScript types
│   └── product.ts        # Product, CartItem, Category types
├── components/           # Reusable components
│   ├── haptic-tab.tsx
│   ├── ui/
│   └── ...
├── hooks/               # Custom hooks
│   ├── use-color-scheme.ts
│   └── ...
└── constants/           # App constants
    └── theme.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

## 📱 App Flow

### First Launch
1. **Splash Screen** → Loading animation
2. **Onboarding** → 4 swipeable introduction slides
3. **Login Screen** → Authentication
4. **Main App** → Shopping experience

### Subsequent Launches
1. **Splash Screen** → Quick loading
2. **Main App** → Direct access (if logged in)

### Authentication Flow
- **Login**: Email/password with demo credentials
- **Signup**: Create new account with validation
- **Social Login**: Google/Facebook options (UI only)
- **Logout**: Profile screen with confirmation

## 📱 Screens

### 1. Splash Screen
- Branded loading animation
- Decorative floating elements
- Auto-navigation based on auth state

### 2. Onboarding
- 4 beautiful introduction slides
- Swipeable interface with pagination
- Skip option available

### 3. Login/Signup
- Email and password authentication
- Demo account quick-fill button
- Social login options
- Form validation and error handling

### 4. Shop (Home)
- Featured product grid
- Search functionality
- Promotional banners
- Discount badges
- Product ratings

### 5. Categories
- Browse by category
- Category image cards
- Filtered product views

### 6. Cart
- Shopping cart management
- Quantity controls
- Price summary
- Checkout flow
- Empty cart state

### 7. Profile
- User information display
- Order statistics
- Account settings
- Order history
- Support options
- Logout functionality

### 8. Product Details
- Product image gallery
- Size and color selection
- Product description
- Features list
- Add to cart functionality

## 🎨 Design Features

- **Shein-Style UI**: Pink accent color (#FF6B9D)
- **Modern Cards**: Shadow effects and rounded corners
- **Responsive Grid**: 2-column product layout
- **Dark Mode**: Full theme support
- **Smooth Animations**: Haptic feedback on tabs
- **Professional Typography**: Clear hierarchy and readability

## 🛒 Cart Management

The app uses React Context for global cart state management:
- Add items to cart with size and color selection
- Update quantities
- Remove items
- Clear cart
- Calculate totals
- Persistent cart count badge

## 🔐 Authentication

- **Persistent Login**: Auth state saved with AsyncStorage
- **Demo Credentials**: Pre-configured test accounts
- **Form Validation**: Email format, password requirements
- **Error Handling**: User-friendly error messages
- **Social Login UI**: Google and Facebook integration ready

## 📝 Mock Data

The app includes 12 sample products across 6 categories:
- Dresses
- Tops
- Bottoms
- Outerwear
- Accessories
- Shoes

All products include:
- Multiple images
- Price and discounts
- Size and color options
- Ratings and reviews
- Detailed descriptions

## 🔧 Configuration

### Navigation

The app uses React Navigation with:
- **Stack Navigator**: For auth flow and product details
- **Tab Navigator**: For main app sections

### Theme

Theme colors are defined in `constants/theme.ts` with support for both light and dark modes.

## 📄 License

This project is private and for demonstration purposes.

## 🤝 Contributing

This is a demo project. Feel free to use it as a template for your own e-commerce applications!

---

Built with ❤️ using Expo and React Native