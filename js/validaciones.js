export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
      input.parentElement.classList.remove('input-container--invalid')
      input.parentElement.querySelector('.input-message-error').innerHTML = ''

    }else{
      input.parentElement.classList.add('input-container--invalid')
      input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput,input)
    }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
];

const mensajesDeError = {
  nombre:{
    valueMissing: 'El campo nombre no puede estar vacio'
  },
  email:{
    valueMissing: 'El campo correo no puede estar vacio',
    typeMismatch: 'El Correo no es valido'
  },
  password:{
    valueMissing: 'El campo contaseña no puede estar vacio',
    patternMismatch: 'Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.'
  },
  nacimiento:{
    valueMissing: 'El campo fecha de nacimiento no puede estar vacio',
    customError: 'Debes tener al menos de 18 años de edad'
  },
  numero:{
    valueMissing: 'El campo numero no puede estar vacio',
    patternMismatch:'El Formato requerido es de 12 digitos (XXX XXXXXXXX)'
  },
  direccion:{
    valueMissing: 'El campo direccion completa no puede estar vacio',
    patternMismatch:'Minimo 10 caracteres y maximo 40'
  },
  ciudad:{
    valueMissing: 'El campo ciudad no puede estar vacio',
    patternMismatch:'Minimo 10 caracteres y maximo 40'
  },
  estado:{
    valueMissing: 'El campo estado no puede estar vacio',
    patternMismatch:'Minimo 10 caracteres y maximo 40'
  }
}

const mostrarMensajeDeError = (tipoDeInput,input)=>{
  let mensaje = ''
  tipoDeErrores.forEach(error=>{
    if(input.validity[error]){
      mensaje = mensajesDeError[tipoDeInput][error]
    }
  })
  return mensaje
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
  validarNacimiento(evento.target);
});

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = ""
  if (!mayorEdad(fechaCliente)){
    mensaje = 'Debes ser mayor de edad'
  }


  input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
