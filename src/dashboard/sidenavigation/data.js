import HomeIcon from './icons/home';
import StatusIcon from './icons/status';
import PacientesIcon from './icons/pacientesIcon';
import ArchivesIcon from './icons/archives';
import SettingsIcon from './icons/settings';
import DocumentationIcon from './icons/documentation';
import CreditsIcon from './icons/credits';


const data = [
  {
    title: 'Página Inicial',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Pacientes',
    icon: <PacientesIcon />,
    link: '/admin/pacientes',
  },
  {
    title: 'Funcionários',
    icon: <ArchivesIcon />,
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
