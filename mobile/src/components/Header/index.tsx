import { router, usePathname } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Row from '@components/Row';
import { vh, vw } from '@utils';

import Close from 'assets/close.svg';
import MinLogoWhite from 'assets/minLogoWhite.svg';

import { Container, Title } from './styles';

interface HeaderProps {
    children: string;
}

export default function Header({ children }: HeaderProps) {
    const pathname = usePathname();

    return (
        <Container>
            <Row>
                <Title>{children}</Title>
                {pathname === 'Educational' && <MinLogoWhite width={8 * vw} />}
            </Row>

            <TouchableOpacity
                onPress={() => router.navigate('Home')}
                containerStyle={{ borderRadius: 50 * vw, height: 5 * vh, width: 5 * vh }}
            >
                <Close height={5 * vh} width={5 * vh} />
            </TouchableOpacity>
        </Container>
    );
}
