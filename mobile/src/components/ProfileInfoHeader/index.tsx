import { ViewStyle } from 'react-native';

import BackButton from '@components/BackButton';
import Row from '@components/Row';
import { vh } from '@utils';

import { Border, Container, Title } from './styles';

interface ProfileInfoHeaderProps {
    children: string;
    style?: ViewStyle;
}

const ProfileInfoHeader: React.FC<ProfileInfoHeaderProps> = ({ children, style }) => {
    return (
        <Container style={style}>
            <Row style={{ justifyContent: 'center' }}>
                <BackButton size={4 * vh} style={{ marginRight: 'auto' }} />

                <Title>{children}</Title>
            </Row>

            <Border />
        </Container>
    );
};

export default ProfileInfoHeader;
