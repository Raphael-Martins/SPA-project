export class Router {
  routes = {}; // estou criando a variavel que ira receber os dados trazidos do index 

  add(routeName, page) {
    //estou acessando o objeto routes la no index, e pegando a propriedade "routName" e o valor "page", ou seja, o indice "/alguma coisa, pra referenciar o arquivo" e o href "o / caminho ate aquele arquivo"
    this.routes[routeName] = page;
  }

  route(event) {
    // basicamente isso so esta impedindo o default, pois o codigo funciona parcialmente bem sem ele.
    event = event || window.event;
    event.preventDefault(); //impde recarregamento nao intencional

    window.history.pushState(null, null, event.target.href); //so preciso do final desse metodo, nao faco ideia do que o resto faz, mas e um objeto e uma string, posso deixar tudo como null. mas no caso, eu estou usando para pegar o href do targuet que disparou o evento

    this.handle(); //disparo a funcao handle, pra fazer as trocas de aba || eu tb preciso usar o this aqui. ler explicacao no final
  }

  handle() {
    const { pathname } = window.location; //eu estou desestruturando de dentro de location, a propriedade que quero, assim nao tenho que especificar qual eu quero, ja que a propriedade dentro o objeto que criei, tem o mesmo nome, que a propriedade dentro do objeto location

    const route = this.routes[pathname] || this.routes[404]; // cria uma const route nesse escopo, que sera usada no fetch, nao tem haver com a function route, esta vai receber o pathname de routes, referente ao href que disparou o evento em route, se for invalido o href, vai disparar o href 404

    fetch(route)
      .then((data) => data.text()) //  isso e uma arrow function, o  mesmo que: function(data){return data.text;}
      .then((html) => {
        document.querySelector('div#app').innerHTML = html;
      }); //o fetch e uma promisse, ou seja, ele ira operar assincrono ao scrip principal, quando a promisse for finalizada, "then"-entao , os "data"-dados, serao convertidos em texto. "then"-entao esse texto sera passado como parametro"html", e o app pego em selector, vai receber em seu innerhtml, o parametro-"html"
  }
}

//isso e orientacao a objeto, eu criei um objeto que serve de molde para criar o que preciso,e esse e uma class, e semelhante a uma funcao construtora, mas mais eficiente, limpa, e segura
//ps:. atualmente nao vejo razao para usar funcoes construtoras

// sempre que precisar usar um funcao ou propriedade dentro do par de {}, preciso referenciar com "this" onde for usar, para que fique visivel la dentro do escopo
