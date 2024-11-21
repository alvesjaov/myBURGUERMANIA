# MyBURGUERMANIA

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.12.

## Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Configuração do Ambiente de Desenvolvimento](#configuração-do-ambiente-de-desenvolvimento)
- [Uso](#uso)
- [Contribuição](#contribuição)

## Visão Geral

MyBURGUERMANIA é uma aplicação web para um restaurante fictício de hambúrgueres. A aplicação permite aos usuários visualizar o cardápio, fazer pedidos e finalizar compras.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
MyBURGUERMANIA/
├── .angular/
├── .cache/
├── .vscode/
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── footer/
│   │   │   └── header/
│   │   ├── views/
│   │   │   ├── home/
│   │   │   ├── menu/
│   │   │   └── order/
│   └── assets/
│       └── images/
├── .editorconfig
├── .gitignore
├── angular.json
├── db.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa a aplicação em modo de desenvolvimento. Abra [http://localhost:4200](http://localhost:4200) para visualizá-la no navegador.

### `npm run build`

Compila a aplicação para produção na pasta `dist`.

### `npm test`

Executa os testes unitários via Karma.

## Configuração do Ambiente de Desenvolvimento

### Extensões Recomendadas

As seguintes extensões do Visual Studio Code são recomendadas para um melhor desenvolvimento:
```
{
    "recommendations": ["angular.ng-template"]
}
```

### Configuração do Servidor JSON

Para executar o servidor JSON localmente, use o comando:
```
json-server db.json --port 3000
```

## Uso

### Visualizar o Cardápio

Acesse a página do cardápio para visualizar os produtos disponíveis.

### Fazer um Pedido

Selecione os produtos desejados e adicione-os ao pedido.

### Finalizar Pedido

Preencha as informações necessárias e finalize o pedido.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Galeria de Fotos

Confira algumas fotos do projeto:

![Tela Inicial](assets/images/print-tela-inicial.png)
![Tela Inicial Responsiva](assets/images/tela-inicial-responsiva.jpg)
