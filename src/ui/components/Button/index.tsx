import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
 fill?: boolean;
}

const Button: React.FC<ButtonProps> = ({ fill = false, children, ...rest }) => {
 return (
  <Container style={fill && { paddingBottom: 16, paddingTop: 16, width: '100%' }} {...rest}>
   <ButtonText>{children}</ButtonText>
  </Container>
 );
};

export default Button;
