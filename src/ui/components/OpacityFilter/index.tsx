import { Container, FilterProps } from './styles';

const OpacityFilter: React.FC<FilterProps> = ({ opacity, children }) => {
  return <Container opacity={opacity}>{children}</Container>;
};

export default OpacityFilter;
