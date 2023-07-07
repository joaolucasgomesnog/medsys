import HomeIcon from './icons/home';
import ArchivesIcon from './icons/archives';
import SettingsIcon from './icons/settings';
import DocumentationIcon from './icons/documentation';
import CreditsIcon from './icons/credits';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers } from '@fortawesome/free-solid-svg-icons';


const data = [
  {
    title: 'Página Inicial',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Pacientes',
    icon: <FontAwesomeIcon icon='users' />,
    link: '/admin/pacientes',
  },
  {
    title: 'Funcionários',
    icon: <FontAwesomeIcon className='h-6 w-6' icon='user-nurse' stroke='curretColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} />,
    link: '/admin/funcionarios',
  },
  {
    title: 'Procedimentos',
    icon: <CreditsIcon />,
    link: '/admin/procedimentos',
  },
  {
    title: 'Configurações',
    icon: <SettingsIcon />,
    link: '/admin/configuracoes',
  },
  {
    title: 'Documentation',
    icon: <DocumentationIcon />,
    link: '/admin/documentation',
  },
];

export default data;
