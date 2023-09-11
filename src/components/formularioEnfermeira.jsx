import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toggleLoading from './toggleLoading';
import Loading from './loading';

const FormularioEnfermeira = (props) => {
  const router = useRouter()
  const [endereco, setEndereco] = useState({
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: ''
  })
  const [contato, setContato] = useState({
    telefone_1: '',
    telefone_2: '',
    email_1: '',
    email_2: ''
  })
  const [enfermeira, setEnfermeira] = useState({
    coren:'',
    cpf: '',
    nome: '',
    rg: '',
    num_sus: '',
    datNascimento: "",
    num_sus: "",
    endereco: endereco,
    contato: contato
  })

  const getPacientebyid = (idNum) => {
    toggleLoading()
    fetch(`http://localhost:3030/enfermeira/${idNum}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(dados => {
        setEndereco(dados.endereco)
        setContato(dados.contato)
        setEnfermeira(dados);
        console.log(dados);
        console.log(dados.endereco);
        console.log(dados.contato);
        toggleLoading()
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  useEffect(() => {
    console.log(props.id)
    if (props.id != null) {
      getPacientebyid(props.id);
      
    }
  }, [props.id]);



  const handleDateBlur = (e) => {
    const isoDate = convertToISO8601Complete(e.target.value);
    handleInputChangePaciente({
      target: {
        name: "datNascimento",
        value: isoDate,
      },
    });
  };

  function convertToISO8601Complete(dateTimeString) {
    const [datePart] = dateTimeString.split(" ");
    const [year, month, day] = datePart.split("-");
    const isoDateTime = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00Z`;
    return isoDateTime;
  }

  const handleInputChangePaciente = (e) => {
    const { name, value } = e.target;
    setEnfermeira((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleNumero = (e) => {
    const numero = Number(e.target.value)
    handleInputChangeEndereco({
      target: {
        name: "numero",
        value: numero
      }
    });
  };

  const handleInputChangeEndereco = (e) => {
    const { name, value } = e.target;
    setEndereco((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    enfermeira.endereco = endereco
  };
  const handleInputChangeContato = (e) => {
    const { name, value } = e.target;
    setContato((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    enfermeira.contato = contato
  };


  const checkCEP = (e) => {
      const cep = document.querySelector('#cep').value.replace(/\D/g,'')
      console.log(cep)
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(dados => {
        console.log(dados)
        endereco.bairro = dados.bairro
        endereco.rua = dados.logradouro
        endereco.cidade = dados.localidade
        endereco.uf = dados.uf
        document.querySelector('#rua').value = dados.logradouro
        document.querySelector('#bairro').value = dados.bairro
        document.querySelector('#cidade').value = dados.localidade
        document.querySelector('#uf').value = dados.uf
      })

  }

  const cadastrarEnfermeira = (pacienteData) => {
    fetch(`http://localhost:3030/enfermeira`, {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(pacienteData)
    })
      .then(res => {
        if (res.ok) {
          console.log('Enfermeira cadastrada') //depois vou colocar um get clientes aqui quando o metodo estiver pronto
          router.push('/admin/enfermeira/enfermeiras')
        }

      })
  }

  const atualizarEnfermeira = (pacienteData) => {
    fetch(`http://localhost:3030/enfermeira/${props.id}`, {
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(pacienteData)
    })
      .then(res => {
        if (res.ok) {
          console.log('Enfermeira atualizada') //depois vou colocar um get clientes aqui quando o metodo estiver pronto
          router.push('/admin/enfermeira/enfermeiras')
        }

      })
  }



  return (
    
    <div className="flex flex-col lg:flex-row justify-center lg:space-x-6 ">
      <Loading/>
      <div className="flex flex-col w-full lg:max-w-screen-lg space-y-6 p-6 rounded-2xl bg-gray-900 text-white">
      <p className="font-bold self-center">Dados passoais</p>
      <br />
      <Field
        label="Nome completo"
        name="nome"
        placeholder="nome"
        value={enfermeira.nome}
        onChange={handleInputChangePaciente}
      />
      <Field
        label="CPF"
        name="cpf"
        placeholder="cpf"
        value={enfermeira.cpf}
        onChange={handleInputChangePaciente}
      />
      <Field
        label="RG"
        name="rg"
        placeholder="rg"
        value={enfermeira.rg}
        onChange={handleInputChangePaciente}
      />
      <Field
        label="Data de nascimento"
        name="datNascimento"
        placeholder="01/01/1999"
        type="date"
        onBlur={handleDateBlur}
      />
      <Field
        label="COREN"
        name="coren"
        placeholder="65654646464643"
        value={enfermeira.coren}
        onChange={handleInputChangePaciente}
      />
      </div>



      <div className="flex flex-col w-full lg:max-w-screen-lg space-y-6 p-6 rounded-2xl bg-gray-900 text-white">
        <p className="font-bold self-center">Endereço</p>
        <br />
        <span className="relative w-full">
          <Field label="Cep"
            name="cep"
            placeholder="cep"
            value={endereco.cep}
            onChange={handleInputChangeEndereco}
            onBlur={checkCEP}

          />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={checkCEP} >
            <FontAwesomeIcon icon="search" className="text-gray-400" />
          </span>
        </span>
        <Field label="Rua"
          name="rua"
          id="rua"
          placeholder="rua"
          value={endereco.rua}
          onChange={handleInputChangeEndereco}
        />
        <Field label="Número"
          name="numero"
          placeholder="0000"
          value={endereco.numero}
          onChange={handleNumero}
        />
        {/* dot  - SE EU QUISER COLOCAR UM ALERTA DE PRIORIDADE NO CAMPO*/}
        <Field label="Bairro"
          name="bairro"
          placeholder="bairro"
          value={endereco.bairro}
          onChange={handleInputChangeEndereco}
        />
        <span className='flex  w-full items-center gap-2 p-0 m-0'>
          <Field label="Cidade"
            name="cidade"
            placeholder="Serra Talhada"
            value={endereco.cidade}
            onChange={handleInputChangeEndereco}
          />
          <Field label="Estado"
            name="uf"
            placeholder="PE"
            value={endereco.uf}
            onChange={handleInputChangeEndereco}
          />
        </span>
      </div>



      <div className="flex flex-col w-full lg:max-w-screen-lg space-y-6 p-6 rounded-2xl bg-gray-900 text-white">
          <p className="font-bold self-center">Contato</p>
          <br />
          <Field label="Telefone 1"
            name="telefone_1"
            placeholder="87 99999999"
            value={contato.telefone_1}
            onChange={handleInputChangeContato}
          />
          <Field label="Telefone 2"
            name="telefone_2"
            placeholder="87 99999999"
            value={contato.telefone_2}
            onChange={handleInputChangeContato}
          />
          <Field label="E-mail 1"
            name="email_1"
            placeholder="usuario@dominio.com"
            value={contato.email_1}
            onChange={handleInputChangeContato}
          />
          <Field label="E-mail 2"
          name="email_2"
          placeholder="usuario@dominio.com"
          value={contato.email_2}
          onChange={handleInputChangeContato}
          />

        <button className="rounded bg-red-500 h-11 mt-12 text-white" onClick={()=>{
          if (props.tipo == 'Cadastrar') {
            cadastrarEnfermeira(enfermeira)
        }else if (props.tipo == 'Atualizar') {
            atualizarEnfermeira(enfermeira)
        }
        }}>{props.tipo}</button>
      </div>
    </div>
)
}
/*  COMPONENT LOGIC */

const style = {
  dot: `after:content-['*'] after:ml-0.5 after:text-red-500`,
  error: `ring-red-500 ring-1`,
  disabled: `cursor-not-allowed`,
  container: `relative mb-6 w-100`,
  errorMessage: `text-sm text-red-500 mt-2`,
  checkboxLabel: `block overflow-hidden h-6 rounded-full bg-gray-300`,
  checkboxContainer: `relative w-10 mr-2 align-middle select-none mt-2`,
  iconContainer: `absolute flex border border-transparent left-0 top-0 h-full w-10`,
  icon: `flex items-center justify-center rounded-tl rounded-bl z-10 text-gray-400 text-lg h-full w-full`,
  checkbox: `checked:bg-blue-500 checked:right-0 focus:outline-none right-4 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`,
  default: `text-base relative flex flex-1 w-full mt-1 rounded-md py-2 px-4 bg-transparent text-white placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent border`,
};

const Field = forwardRef(
  (
    { disabled, dot, error, icon, label, name, type = 'text', ...rest },
    ref,
  ) => {
    let component;

    // if you won't use select, you can delete this part
    if (type === 'select') {
      component = (
        <select
          aria-required={dot}
          aria-invalid={!!error}
          className={`${style.default} ${disabled ? style.disabled : ''}
             ${error ? style.error : 'border-gray-300'}
          `}
          disabled={disabled}
          id={name}
          name={name}
          ref={ref}
          {...rest}
        />
      );
    }

    // if you won't use input, you can delete this part
    if (type !== 'checkbox' && type !== 'select' && type !== 'textarea') {
      component = (
        <div className="relative">
          <div className={style.iconContainer}>
            <div className={style.icon}>{icon}</div>
          </div>
          <input
            aria-required={dot}
            aria-invalid={!!error}
            className={`${style.default} ${icon ? 'pl-12' : ''}
               ${error ? style.error : 'border-gray-300'}
               ${disabled ? style.disabled : ''}
            `}
            disabled={disabled}
            id={name}
            name={name}
            type={type}
            ref={ref}
            {...rest}
          />
          {error && <ErrorIcon />}
        </div>
      );
    }

    return (
      <div className={`${style.container} ${disabled ? 'opacity-50' : ''}`}>
        <label htmlFor={name} className={`text-white ${dot && style.dot}`}>
          {label}
        </label>
        {component}
        {error && (
          <span role="alert" className={style.errorMessage}>
            {error}
          </span>
        )}
      </div>
    );
  },
);

Field.displayName = 'Field';

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="currentColor"
    className="absolute right-2 -mt-7 text-red-500"
    viewBox="0 0 1792 1792"
  >
    <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z" />
  </svg>
);

const LockIcon = () => (
  <svg
    height="20"
    width="20"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
  </svg>
);


export default FormularioEnfermeira