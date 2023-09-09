import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FormularioEnfermeira from '../../../../components/formularioEnfermeira';
import Content from '../../../../components/content';

const editarEnfermeira = () => {
    
    const router = useRouter();
    const { id } = router.query;
    return (
        <Content title={'Atualizar enfermeira'}>
            <FormularioEnfermeira id={id} tipo={'Atualizar'}/>
        </Content>
    )
}
export default editarEnfermeira