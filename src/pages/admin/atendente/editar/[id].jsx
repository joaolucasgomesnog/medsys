import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Content from '../../../../components/content';
import FormularioAtendente from '../../../../components/formularioAtendente';

const editarAtendente = () => {
    
    const router = useRouter();
    const { id } = router.query;
    return (
        <Content title={'Atualizar atendente'}>
            <FormularioAtendente id={id} tipo={'Atualizar'}/>
        </Content>
    )
}
export default editarAtendente