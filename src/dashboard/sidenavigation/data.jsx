import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const data = [
  {
    title: 'Página Inicial',
    icon: <FontAwesomeIcon className="h-6 w-6" icon="home" />,
    link: '/',
  },
  {
    title: 'Pacientes',
    icon: <FontAwesomeIcon className="h-6 w-6" icon="users" />,
    link: '/admin/paciente/pacientes',
  },
  {
    title: 'Funcionários',
    icon: <FontAwesomeIcon className="h-6 w-6" icon="user-nurse" />,
    link: '/admin/funcionarios',
  },
  {
    title: 'Procedimentos',
    icon: <FontAwesomeIcon icon="bed-pulse" />,
    link: '/admin/procedimentos',
  },
  {
    title: 'Configurações',
    icon: <FontAwesomeIcon className="h-6 w-6" icon="gear" />,
    link: '/admin/configuracoes',
  },
  {
    title: 'Sair',
    icon: <FontAwesomeIcon className='h-6 w-6' icon='sign-out' color='#ee6b6e' />,
    link: '/login',
  },
];

export default data;
