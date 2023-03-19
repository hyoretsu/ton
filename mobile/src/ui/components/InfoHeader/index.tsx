import { vh } from '@units/viewport';

import BackButton from '@components/BackButton';
import Row from '@components/Row';

import { Border, Container, Title } from './styles';

const InfoHeader: React.FC<{ children: string }> = ({ children }) => {
    return (
        <Container>
            <Row>
                <BackButton size={4 * vh} />

                <Title>{children}</Title>
            </Row>
            <Border />
        </Container>
    );
};

export default InfoHeader;
