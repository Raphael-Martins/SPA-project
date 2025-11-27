import { Router } from './router.js';

const router = new Router(); // criei a classe Router aqui, poderia criar no export, mas assim e mais eficiente, pois posso passar parametros aqui se for nescessario, nao e esse caso, mas em outras class pode ser nescessario


router.add('/', '/pages/home.html');
router.add('/about', '/pages/about.html');
router.add('/contact', '/pages/contact.html');
router.add('404', '/pages/404.html');

// agora eu crio a routes, injetando la em router.js, em Router, as dependencias do objeto routes que havia aqui

// const routes = {
//   '/': '/pages/home.html',
//   '/about': '/pages/about.html',
//   '/contact': '/pages/contact.html',
//   404: '/pages/404.html',
// };

router.handle(); // para que o home seja setado quando inciar o script

window.onpopstate = () => router.handle(); //ira permitir a navegacao pela seta de historico, dispanrando minha funcao handle
window.route = (event) => router.route(event); // dispara a funcao route ao clicar para prevenir event default
