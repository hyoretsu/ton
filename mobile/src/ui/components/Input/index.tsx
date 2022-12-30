import { vw } from '@units/viewport';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { SvgProps } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import mainTheme from 'ui/theme/main';

import { Container, CustomInput } from './styles';

interface InputProps extends TextInputProps {
    icon: string | React.FC<SvgProps>;
    isErrored: string | undefined;
    type?: TextInputProps['keyboardType'];
}

interface InputRef {
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
    { placeholder, icon, isErrored, type, returnKeyType = 'next', style, ...rest },
    ref,
) => {
    const inputRef = useRef<any>(null);
    const ProvidedIcon = icon;

    useImperativeHandle(ref, () => ({
        focus() {
            inputRef.current.focus();
        },
    }));

    return (
        <Container isErrored={!!isErrored} style={style}>
            {typeof icon === 'string' ? (
                <Icon name={icon} size={4.5 * vw} color={mainTheme.colors.purple} style={{ marginRight: 10 }} />
            ) : (
                <ProvidedIcon
                    height={4.5 * vw}
                    width={4.5 * vw}
                    color={mainTheme.colors.purple}
                    style={{ marginRight: 10 }}
                />
            )}
            <CustomInput
                ref={inputRef}
                placeholder={placeholder}
                placeholderTextColor="#0006"
                keyboardType={type || 'default'}
                autoCapitalize={type === 'email-address' ? 'none' : 'words'}
                returnKeyType={returnKeyType}
                {...rest}
            />
        </Container>
    );
};

export default forwardRef(Input);
