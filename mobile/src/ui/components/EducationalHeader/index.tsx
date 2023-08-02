import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Row from '@components/Row';

import { vh, vw } from '@units/viewport';

import Close from 'assets/close.svg';
import MinLogoWhite from 'assets/minLogoWhite.svg';

import { Header, HeaderTitle } from './styles';

const EducationalHeader: React.FC = () => {
    const { navigate } = useNavigation();
    const { name } = useRoute();

    return (
        <Header>
            <Row>
                <HeaderTitle>Educação</HeaderTitle>
                {name === 'Educational' && <MinLogoWhite width={8 * vw} />}
            </Row>

            <TouchableOpacity
                onPress={() => navigate('Home')}
                containerStyle={{ borderRadius: 50 * vw, height: 5 * vh, width: 5 * vh }}
            >
                <Close height={5 * vh} width={5 * vh} />
            </TouchableOpacity>
        </Header>
    );
};

export default EducationalHeader;
