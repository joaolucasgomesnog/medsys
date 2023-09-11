import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FormularioPaciente from '../../../../components/formularioPaciente';
import Content from '../../../../components/content';
import FormularioMedico from '../../../../components/formularioMedico';

const editarMedico = () => {
    
    const router = useRouter();
    const { id } = router.query;
    return (
        <Content title={'Atualizar médico'}>
            <FormularioMedico id={id} tipo={'Atualizar'}/>
        </Content>
    )
}
export default editarMedico