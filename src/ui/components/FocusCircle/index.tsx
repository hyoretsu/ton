import { ViewProps } from 'react-native';

import { InnerCircle, OuterCircle } from './styles';

interface FocusCircleProps extends ViewProps {
 size: number;
}

const FocusCircle: React.FC<FocusCircleProps> = ({ size, style }) => {
 return (
  <OuterCircle size={size} style={style}>
   <InnerCircle size={size} />
  </OuterCircle>
 );
};

export default FocusCircle;
