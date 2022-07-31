import { TextInput } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
 flex-direction: row;
 align-items: center;

 position: relative;

 width: 100%;
 height: 64px;
 background: #8ca9d8;

 border-radius: 10px;
 margin-bottom: 12px;
`;

export const ErrorOutline = styled.View`
 position: absolute;

 width: 100%;
 height: 100%;

 border: #f00 2px;
 border-radius: 10px;
`;

export const CustomInput = styled(TextInput)`
 flex: 1;

 color: #000;
 font-size: 16px;

 margin-right: 16px;
`;
