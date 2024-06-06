import { Text, View } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

import { vh, vw } from '@utils';

import mainTheme from '@theme';

interface ButtonProps extends RectButtonProperties {
    background?: string;
    bold?: boolean;
    border?: string;
    borderRadius?: number;
    color?: string;
    fontSize?: number;
    fill?: boolean;
    padding?: [number, number];
    paddingHorizontal?: number;
    paddingVertical?: number;
    selected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    background = mainTheme.colors.purple,
    bold = false,
    border = mainTheme.colors.purple,
    borderRadius = 50 * vw,
    color = '#fff',
    fill = false,
    fontSize = 16,
    padding = [1.4 * vh, 6 * vw],
    paddingHorizontal,
    paddingVertical,
    selected,
    children,
    style,
    ...rest
}) => {
    return (
        <View
            style={[
                {
                    borderColor: border,
                    borderRadius,
                    borderWidth: border ? 0.3 * vw : 0,
                },
                fill && {
                    width: '100%',
                },
                style,
            ]}
        >
            <RectButton
                style={{
                    alignItems: 'center',
                    backgroundColor: selected ? color : background,
                    borderRadius: borderRadius - 1,
                    marginRight: -1,
                    paddingBottom: paddingVertical || padding[0],
                    paddingLeft: paddingHorizontal || padding[1],
                    paddingRight: paddingHorizontal || padding[1] + 1,
                    paddingTop: paddingVertical || padding[0],
                }}
                {...rest}
            >
                {typeof children === 'string' ? (
                    <Text
                        style={{
                            color: selected ? background : color,
                            fontFamily: bold ? mainTheme.fontFamily.bold : mainTheme.fontFamily.regular,
                            fontSize,
                            textAlign: 'center',
                        }}
                    >
                        {children}
                    </Text>
                ) : (
                    children
                )}
            </RectButton>
        </View>
    );
};

export default Button;
