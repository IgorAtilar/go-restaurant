# ![logo](https://user-images.githubusercontent.com/73081443/196050119-8c5c3518-b5fc-440d-b808-ebc91527c2fd.svg)

[![codecov](https://codecov.io/gh/IgorAtilar/go-restaurant/branch/main/graph/badge.svg?token=RRCHEG0RCQ)](https://codecov.io/gh/IgorAtilar/go-restaurant)

## Preview

https://user-images.githubusercontent.com/73081443/196052082-0b2624f3-f881-495b-adb4-712fd1b8b7f8.mp4

## Sobre

O GoRestaurante é um web app desenvolvido para visualização de uma página de cadastro de pratos de um restaurante, sendo possível para o usuário adicionar um novo prato bem como editar suas informações, excluir e informar se o mesmo está disponível ou não nas aulas do bootcamp [Ignite](https://lp.rocketseat.com.br/ignite) da RocketSeat.

O projeto foi utilizado no trabalho prático 2 da matéria de Teste e Manutenção de Software do curso de Sistemas de informação da PUC Minas e por conta disso adicionamos e alteramos algumas funcionalidades do projeto como também adicionamos a configuração de teste e os casos de teste.

## Ferramentas utilizadas nos testes

-   [Jest](https://jestjs.io/pt-BR/);
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Relatório LCOV do coverage

![Code coverage](https://user-images.githubusercontent.com/73081443/196050920-a9730665-9766-4a9f-820b-6fe5f6294026.png)

### O relatório gerado analisa algumas categorias de coverage:

-   Statements (Declarações): indica quais termos de declarações foram ou não cobertos;
-   Branch (Ramificações): indica quais ramos do código (if/else) foram abrangidos/executados;
-   Functions (Funções): indica quais funções foram executadas durante os testes;
-   Lines (Linhas): indica as linhas que foram ou não testadas.

## Gráficos de coverage

<table align="center">
  <tr>
    <td>
    <img src="https://codecov.io/gh/IgorAtilar/go-restaurant/branch/main/graphs/sunburst.svg?token=RRCHEG0RCQ" height="140px;" alt="Gráfico Sunburst"/>
    <br />
    <b>Gráfico Sunburst</b>
    <br />
    <p>O círculo mais interno é todo o projeto, afastando-se do centro estão as pastas e, finalmente, um único arquivo. O tamanho e a cor de cada fatia representam o número de declarações e a cobertura, respectivamente.</p>
    <td>
    <img src="https://codecov.io/gh/IgorAtilar/go-restaurant/branch/main/graphs/tree.svg?token=RRCHEG0RCQ" height="140px;" alt="Gráfico Grid"/>
    <br />
    <b>Gráfico Grid</b>
    <br />
    <p>Cada bloco representa um único arquivo no projeto. O tamanho e a cor de cada bloco são representados pelo número de declarações e pela cobertura, respectivamente.</p>
    </td>
  </tr>
  <tr>
     <td>
    <img src="https://codecov.io/gh/IgorAtilar/go-restaurant/branch/main/graphs/icicle.svg?token=RRCHEG0RCQ" height="140px;" alt="Gráfico Icicle"/>
    <br />
    <b>Gráfico Icicle</b>
    <br />
    <p>A seção superior representa todo o projeto. Prosseguindo com pastas e, finalmente, arquivos individuais. O tamanho e a cor de cada fatia representam o número de declarações e a cobertura, respectivamente.</p>
    </td>
  </tr>
</table>

# Instalação

Antes de seguir os próximos passos de instalação é necessário ter instalado o [Node.js](https://nodejs.org/en/), [Git](https://git-scm.com/) e o gerenciador de pacotes [Yarn](https://yarnpkg.com/).

Clone o projeto na pasta escolhida com o seguinte comando:

```
git clone https://github.com/IgorAtilar/go-restaurant.git
```

Depois acesse o diretório utilizando:

```
cd go-restaurant
```

Instale as dependências do projeto utilizando:

```
yarn
```

Rode o comando a seguir para iniciar o servidor fake:

```
yarn server
```

E depois rode o comando para inicializar o projeto:

```
yarn start
```

Para rodar os testes podemos utilizar o comando:

```
yarn test
```

Para rodar os testes e gerar o relatório de coverage podemos utilizar o comando:

```
yarn test --coverage
```

## :construction_worker: Créditos

-   Arthur Almeida
-   Emmerson Rodrigues
-   Felipe Barbosa
-   Igor Atilar
-   Juan Gabriel

## Bibliografia

-   https://about.codecov.io/
-   https://gabrieluizramos.com.br/anatomia-de-um-teste-em-javascript
-   https://jestjs.io/pt-BR/
-   https://testing-library.com/docs/react-testing-library/intro/
