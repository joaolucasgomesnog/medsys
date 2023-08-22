import Content from '../components/content';
import PrivateRoute from '../components/privateRoute';
//import Block from '../components/block';

export default function HomePage() {
  return (
    <PrivateRoute>
      <Content title="Página Inicial"></Content>
    </PrivateRoute>
  );
}
