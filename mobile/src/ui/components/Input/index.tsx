import { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, CustomInput, ErrorOutline } from './styles';

interface InputProps extends TextInputProps {
  icon: string;
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

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  return (
    <Container style={style}>
      {isErrored && <ErrorOutline />}
      <Icon name={icon} size={20} color="#708fe5" style={{ marginLeft: 16, marginRight: 10 }} />
      <CustomInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor="#fff8"
        keyboardType={type || 'default'}
        autoCapitalize={type === 'email-address' ? 'none' : 'words'}
        returnKeyType={returnKeyType}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
