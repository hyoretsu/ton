import { vh, vw } from '@units/viewport';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import mainTheme from 'ui/theme/main';

interface ButtonProps extends RectButtonProperties {
    background?: string;
    bold?: boolean;
    border?: string;
    color?: string;
    fontSize?: number;
    fill?: boolean;
    padding?: [number, number];
    paddingHorizontal?: number;
    paddingVertical?: number;
}

const Button: React.FC<ButtonProps> = ({
    background = mainTheme.colors.purple,
    bold = false,
    border = mainTheme.colors.purple,
    color = '#fff',
    fill = false,
    fontSize = 16,
    padding = [1.4 * vh, 6 * vw],
    paddingHorizontal,
    paddingVertical,
    children,
    style,
    ...rest
}) => {
    return (
        <View
            style={[
                {
                    borderColor: border,
                    borderRadius: 50 * vw,
                    borderWidth: border ? 0.3 * vw : 0,
                },
                style,
            ]}
        >
            <RectButton
                style={[
                    {
                        alignItems: 'center',
                        backgroundColor: background,
                        borderRadius: 25,
                        paddingBottom: paddingVertical || padding[0],
                        paddingLeft: paddingHorizontal || padding[1],
                        paddingRight: paddingHorizontal || padding[1],
                        paddingTop: paddingVertical || padding[0],
                    },
                    fill && {
                        width: '100%',
                    },
                ]}
                {...rest}
            >
                <Text
                    style={{
                        color,
                        fontFamily: bold ? mainTheme.fontFamily.bold : mainTheme.fontFamily.regular,
                        fontSize,
                    }}
                >
                    {children}
                </Text>
            </RectButton>
        </View>
    );
};

export default Button;
