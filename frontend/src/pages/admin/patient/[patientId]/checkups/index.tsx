import { Checkup } from 'backend';
import { format } from 'date-fns';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';

import api from '@api';

import { CheckupDiv, PhotoCategoryDiv, PhotosDiv, Styling } from '@styles/admin/patient/[patientId]/checkups';

const Checkups: React.FC = () => {
    const {
        back,
        push,
        query: { patientId },
    } = useRouter();
    const [checkups, setCheckups] = useState<Checkup[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.get(`/checkup?patientId=${patientId}`);
            setCheckups(data);
        };

        execute();
    }, [patientId]);

    return (
        <>
            <NextSeo title="Exames" nofollow noindex />
            <Styling>
                <button type="button" onClick={back} style={{ left: '2vw', position: 'absolute' }}>
                    Voltar
                </button>
                <button
                    type="button"
                    onClick={() => push(`/admin/patient/${patientId}/checkups/create`)}
                    style={{ margin: '0 auto' }}
                >
                    Criar
                </button>

                {checkups.map(checkup => {
                    return (
                        <CheckupDiv key={checkup.id}>
                            <div>
                                <span>Exame de {format(new Date(checkup.createdAt), 'dd/MM/yyyy')}</span>{' '}
                                <button
                                    type="button"
                                    onClick={async () => {
                                        await api.delete('/checkup', { data: { checkupId: checkup.id } });
                                        setCheckups(old => old.filter(stateCheckup => stateCheckup.id !== checkup.id));
                                    }}
                                >
                                    <BsTrashFill width={30} height={30} />
                                </button>
                            </div>

                            <span style={{ color: '#777' }}>{checkup.id}</span>

                            <br />

                            <p>Respostas:</p>

                            <br />

                            <div>
                                {checkup.answers.length > 0 ? (
                                    checkup.answers.map(answer => (
                                        <>
                                            <p key={answer.id}>{answer.question}</p>
                                            <p>{answer.answer}</p>
                                        </>
                                    ))
                                ) : (
                                    <span>---</span>
                                )}

                                <br />
                            </div>
                            <p>Fotos:</p>

                            <br />

                            <PhotosDiv>
                                {checkup.photos.map(photo => (
                                    <PhotoCategoryDiv key={photo.id}>
                                        <span>{photo.category}</span>
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/files/${photo.fileName}`}
                                            alt={photo.category}
                                            width={338}
                                            height={600}
                                        />
                                    </PhotoCategoryDiv>
                                ))}
                            </PhotosDiv>
                        </CheckupDiv>
                    );
                })}
            </Styling>
        </>
    );
};

export default Checkups;
