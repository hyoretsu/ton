import styled from 'styled-components';

interface MessageDivProps {
    sentFromUser: boolean;
}

export const Styling = styled.div``;

export const ChatBox = styled.div`
    display: flex;
    flex-direction: column-reverse;

    width: 80vw;
    height: 92vh;

    padding: 4vh 3vw;
    border: 3px solid #000;
    border-radius: 5vw;
`;

export const Messages = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;

    padding-right: 1vw;
`;

export const DateSpan = styled.span`
    align-self: center;

    margin-bottom: 2vh;
`;

export const MessageDiv = styled.div<MessageDivProps>`
    display: flex;
    flex-direction: column;
    align-self: ${({ sentFromUser }) => (sentFromUser ? 'flex-end' : 'flex-start')};

    border: 1px solid #000;
    border-radius: 0.5vw;
    padding: 2vh 1vw;

    &:not(:last-child) {
        margin-bottom: 2vh;
    }

    span {
        align-self: flex-end;

        font-size: 0.8em;
    }
`;

export const InputDiv = styled.form`
    display: flex;

    margin-top: 2vh;
`;

export const InputSendCircle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 4.5vh;
    height: 4.5vh;

    border: 1px solid #000;
    border-radius: 50vw;
    margin-left: 1vw;
`;
