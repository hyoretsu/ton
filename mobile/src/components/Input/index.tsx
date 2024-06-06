import { Feather as Icon } from '@expo/vector-icons';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { vw } from '@utils';

import mainTheme from '@theme';

import { Container, CustomInput } from './styles';

interface InputProps extends TextInputProps {
    background?: string;
    borderColor?: string;
    icon: string | React.FC<SvgProps>;
    iconDivider?: boolean;
    iconSize?: number;
    isErrored: string | undefined;
    squared?: boolean;
    type?: TextInputProps['keyboardType'];
}

interface InputRef {
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
    {
        background = '#fff',
        borderColor = mainTheme.colors.purple,
        placeholder,
        icon,
        iconDivider = true,
        iconSize = 4.5 * vw,
        isErrored,
        type,
        returnKeyType = 'next',
        squared = false,
        style,
        ...rest
    },
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
        <Container
            isErrored={!!isErrored}
            style={[
                { backgroundColor: background, borderRadius: squared ? 4 * vw : 50 * vw },
                iconSize !== 4.5 * vw ? { paddingLeft: 3 * vw } : {},
                style,
            ]}
        >
            {typeof icon === 'string' ? (
                <Icon name={icon} size={iconSize} color={borderColor} style={{ marginRight: 10 }} />
            ) : (
                <ProvidedIcon height={iconSize} width={iconSize} color={borderColor} style={{ marginRight: 10 }} />
            )}
            <CustomInput
                ref={inputRef}
                placeholder={placeholder}
                placeholderTextColor={mainTheme.colors.gray}
                keyboardType={type || 'default'}
                autoCapitalize={type === 'email-address' ? 'none' : 'words'}
                returnKeyType={returnKeyType}
                style={!iconDivider && { borderColor: background, paddingLeft: 2 * vw }}
                {...rest}
            />
        </Container>
    );
};

export default forwardRef(Input);
