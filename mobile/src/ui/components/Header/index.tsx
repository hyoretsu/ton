import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Row from '@components/Row';

import { vh, vw } from '@units/viewport';

import Close from 'assets/close.svg';
import MinLogoWhite from 'assets/minLogoWhite.svg';

import { Container, Title } from './styles';

interface HeaderProps {
    children: string;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    const { navigate } = useNavigation();
    const { name } = useRoute();

    return (
        <Container>
            <Row>
                <Title>{children}</Title>
                {name === 'Educational' && <MinLogoWhite width={8 * vw} />}
            </Row>

            <TouchableOpacity
                onPress={() => navigate('Home')}
                containerStyle={{ borderRadius: 50 * vw, height: 5 * vh, width: 5 * vh }}
            >
                <Close height={5 * vh} width={5 * vh} />
            </TouchableOpacity>
        </Container>
    );
};

export default Header;
