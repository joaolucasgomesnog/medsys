import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FormularioPaciente from '../../../../components/formularioPaciente';
import Content from '../../../../components/content';

const editarPaciente = () => {
    
    const router = useRouter();
    const { id } = router.query;
    return (
        <Content title={'Atualizar paciente'}>
            <FormularioPaciente id={id} tipo={'Atualizar'}/>
        </Content>
    )
}
export default editarPaciente