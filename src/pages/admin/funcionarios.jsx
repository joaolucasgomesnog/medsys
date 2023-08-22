import Content from '../../components/content';
import PrivateRoute from '../../components/privateRoute';

export default function Funcionarios() {
  return (
    <PrivateRoute>
      <Content title="Funcionários"></Content>
    </PrivateRoute>
  );
}
