const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const mensaje = document.querySelector('#mensaje');
const counter = document.querySelector('span');

counter.style.color = 'grey';

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{10,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10}$/, // 10 numeros.
	sitioweb: /^[a-zA-Z0-9_.+-]+[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos = {
	nombre: false,
	correo: false,
	telefono: false,
	sitioweb: false
}

mensaje.addEventListener('input', e => {
	if (mensaje.value.length < 500){
		counter.innerText = mensaje.value.length;
	} else {
		counter.innerText = 'Max';
		input.value = input.value.substring(0,500);
	}
})

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "sitioweb":
			validarCampo(expresiones.sitioweb, e.target, 'sitioweb');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		let campoerror = "Los siguientes campos no pueden quedar vacíos: <br>";
		if(!campos.nombre){
			campoerror = campoerror + "<b>Nombre<b> <br>";
		}
		if(!campos.correo){
			campoerror = campoerror + "<b>Correo<b> <br>";
		}
		if(!campos.telefono){
			campoerror = campoerror + "Telefono <br>";
		}
		if(!terminos.checked){
			campoerror = campoerror + "Términos y condiciones <br>";
		}
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		document.getElementById('mensajeerror').innerHTML = campoerror;

	}
});