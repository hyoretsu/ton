import { Link } from '@hyoretsu/react-components';
import { ReactElement } from 'react';
import { BsPlusSquareFill } from 'react-icons/bs';

import { Info, InfoButtons, InfoText, Styling } from './styles';

interface InfoGridProps {
    children: [ReactElement, ReactElement] | [ReactElement, ReactElement, ReactElement];
    newLink?: string;
}

const InfoGrid: React.FC<InfoGridProps> = ({ children, newLink }) => {
    const text: ReactElement[] = children[0].props.children;
    const buttons: ReactElement[] = children[1].props.children;

    return (
        <Styling>
            {buttons.map((button, index) => (
                <Info key={index}>
                    <InfoText>{text[index]}</InfoText>
                    <InfoButtons>{button}</InfoButtons>
                </Info>
            ))}

            {newLink && (
                <Info style={{ alignItems: 'center', padding: '2vh' }}>
                    <Link href={newLink}>
                        <BsPlusSquareFill size={120} color="#555" />
                    </Link>
                </Info>
            )}
        </Styling>
    );
};

export default InfoGrid;
