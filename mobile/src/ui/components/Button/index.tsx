import { Text, View } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
    background?: string;
    border?: string;
    color?: string;
    fontSize?: number;
    fill?: boolean;
    padding?: [number, number];
    paddingHorizontal?: number;
    paddingVertical?: number;
}

const Button: React.FC<ButtonProps> = ({
    background = '#625791',
    border,
    color = '#fff',
    fill = false,
    fontSize = 16,
    padding = [12, 24],
    paddingHorizontal,
    paddingVertical,
    children,
    style,
    ...rest
}) => {
    const borderWidth = border ? 4 : 0;

    return (
        <View style={[{ borderColor: border, borderRadius: 25 * 1.2, borderWidth }, style]}>
            <RectButton
                style={[
                    {
                        alignItems: 'center',
                        backgroundColor: background,
                        borderRadius: 25,
                        paddingBottom: (paddingVertical || padding[0]) - borderWidth,
                        paddingLeft: (paddingHorizontal || padding[1]) - borderWidth,
                        paddingRight: (paddingHorizontal || padding[1]) - borderWidth,
                        paddingTop: (paddingVertical || padding[0]) - borderWidth,
                    },
                    fill && {
                        width: '100%',
                    },
                ]}
                {...rest}
            >
                <Text style={{ color, fontSize }}>{children}</Text>
            </RectButton>
        </View>
    );
};

export default Button;
