import { View, ViewProps } from 'react-native';

const Row: React.FC<ViewProps> = ({ children, style }) => {
    return <View style={[{ flexDirection: 'row' }, style]}>{children}</View>;
};

export default Row;
