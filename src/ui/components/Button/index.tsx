import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
 fill?: boolean;
 padding?: [number, number];
 paddingHorizontal?: number;
 paddingVertical?: number;
}

const Button: React.FC<ButtonProps> = ({
 fill = false,
 padding = [12, 24],
 paddingHorizontal,
 paddingVertical,
 children,
 style,
 ...rest
}) => {
 return (
  <Container
   style={[
    {
     paddingBottom: paddingVertical || padding[0],
     paddingLeft: paddingHorizontal || padding[1],
     paddingRight: paddingHorizontal || padding[1],
     paddingTop: paddingVertical || padding[0],
    },
    fill && {
     paddingBottom: 16,
     paddingTop: 16,
     width: '100%',
    },
    style,
   ]}
   {...rest}
  >
   <ButtonText>{children}</ButtonText>
  </Container>
 );
};

export default Button;
