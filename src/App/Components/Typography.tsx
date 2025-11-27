import { Colors, Fonts, getFontFamily } from '@/src/constants/theme';
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface TypographyProps extends TextProps {
  weight?: 'regular' | 'medium' | 'bold' | 'black' | 'light';
  color?: string;
  size?: number;
  align?: 'left' | 'center' | 'right';
}

export const Typography: React.FC<TypographyProps> = ({
  weight = 'regular',
  color = Colors.textPrimary,
  size = 16,
  align = 'left',
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: getFontFamily(weight),
          color,
          fontSize: size,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

// Pre-styled text components for common use cases
export const Heading1: React.FC<Omit<TypographyProps, 'size'>> = ({ style, ...props }) => (
  <Typography size={32} weight="bold" style={style} {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'size'>> = ({ style, ...props }) => (
  <Typography size={28} weight="bold" style={style} {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'size'>> = ({ style, ...props }) => (
  <Typography size={24} weight="bold" style={style} {...props} />
);

export const Body: React.FC<Omit<TypographyProps, 'size'>> = ({ style, ...props }) => (
  <Typography size={16} weight="regular" style={style} {...props} />
);

export const BodyMedium: React.FC<Omit<TypographyProps, 'size'>> = ({ style, ...props }) => (
  <Typography size={16} weight="medium" style={style} {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'size'>> = ({ style, ...props }) => (
  <Typography size={14} weight="regular" color={Colors.textSecondary} style={style} {...props} />
);

export const Small: React.FC<Omit<TypographyProps, 'size'>> = ({ style, ...props }) => (
  <Typography size={12} weight="regular" color={Colors.textSecondary} style={style} {...props} />
);

