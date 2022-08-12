import { useEffect, useState } from 'react';

import Button from '@components/Button';

import { Container, Example, Instructions, Body, Title } from '@styles/Checkup';

import checkup from 'assets/checkup.json';

const CheckupInstructions: React.FC = () => {
 const [example, setExample] = useState('');

 const { instructions, titles } = checkup;

 useEffect(() => {
  setExample('https://i.pinimg.com/originals/2e/c6/b5/2ec6b5e14fe0cba0cb0aa5d2caeeccc6.jpg');
 }, []);

 return (
  <Container>
   <Title>{titles[0]}</Title>
   <Instructions>{instructions[0]}</Instructions>
   <Body>
    {example && <Example source={{ uri: example }} />}

    <Button style={{ marginTop: 16, marginBottom: 12 }}>Tirar foto</Button>
   </Body>
  </Container>
 );
};

export default CheckupInstructions;
