import { Checkup } from 'backend';
import { format } from 'date-fns';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import api from '@api';

import { CheckupDiv, PhotoCategoryDiv, PhotosDiv, Styling } from '@styles/admin/patient/[patientId]/checkups';

const Checkups: React.FC = () => {
    const {
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
                {checkups.map(checkup => {
                    return (
                        <CheckupDiv key={checkup.id}>
                            <span>Exame de {format(new Date(checkup.createdAt), 'dd/MM/yyyy')}</span>
                            <p>Respostas:</p>
                            <div>
                                {checkup.answers.length > 0 ? (
                                    checkup.answers.map(answer => (
                                        <>
                                            <p key={answer.id}>{answer.question}</p>
                                            <span>{answer.answer}</span>
                                        </>
                                    ))
                                ) : (
                                    <span>---</span>
                                )}
                            </div>
                            <p>Fotos:</p>
                            <PhotosDiv>
                                {checkup.photos.map(photo => {
                                    const fixedCategory = photo.category.replace('Ã­', 'í').replace('Ã©', 'é');

                                    return (
                                        <PhotoCategoryDiv key={photo.id}>
                                            <span>{fixedCategory}</span>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/files/${photo.fileName}`}
                                                alt={fixedCategory}
                                                width={600}
                                                height={338}
                                            />
                                        </PhotoCategoryDiv>
                                    );
                                })}
                            </PhotosDiv>
                        </CheckupDiv>
                    );
                })}
            </Styling>
        </>
    );
};

export default Checkups;
