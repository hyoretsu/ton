import styled from 'rn-css';

export const Header = styled.View`
    flex-direction: row;
    align-items: center;

    background-color: #fff;
    height: 15vh;

    padding: 0 8vw 0 20vw;
`;

export const HeaderCircle = styled.View`
    position: absolute;

    height: 15vh;
    width: 15vh;

    border-radius: 50vw;
`;

export const HeaderTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 2em;
`;

export const HeaderPhotoDesc = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.purple};

    margin-right: 2vw;
    margin-left: auto;
`;

export const HeaderPhotoView = styled.View`
    height: 9vh;
    width: 9vh;
`;

export const Container = styled.View`
    flex: 1;
    align-items: center;

    padding: 0 7vw 7vh;
`;

export const InfoTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1.8em;

    margin-bottom: 3vh;
`;

export const InfoView = styled.View`
    align-items: center;
`;

export const InfoCircle = styled.View`
    align-items: center;
    justify-content: center;

    background-color: #fff;
    width: 17vw;
    height: 17vw;

    border-radius: 50vw;
`;

export const InfoCircleText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.purple};

    margin-top: 1vh;
`;
