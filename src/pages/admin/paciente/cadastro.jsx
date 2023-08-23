import Head from 'next/head';
import Content from '../../../components/content';
import FormularioPaciente from '../../../components/formularioPaciente';
import PrivateRoute from '../../../components/privateRoute';

export default function PacientesPage() {

  return (
    <PrivateRoute>
      <Content title="Cadastro de paciente">
        <FormularioPaciente tipo={'Cadastrar'}/>
      </Content>
    </PrivateRoute>
  );
}

