import { Container, FilterProps } from './styles';

const OpacityFilter: React.FC<FilterProps> = ({ opacity, children, style }) => {
    return (
        <Container opacity={opacity} style={style}>
            {children}
        </Container>
    );
};

export default OpacityFilter;
