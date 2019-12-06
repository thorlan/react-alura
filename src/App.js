import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css'

class App extends Component {

  constructor() {
    super();
    this.state = {
      lista: [
        { nome: 'alberto', email: "alberto@oi.com", senha: '123456' }
      ]
    };
  }

  render() {
    return (

      <div id="layout">

        <a href="#menu" id="menuLink" class="menu-link">

          <span></span>
        </a>

        <div id="menu">
          <div class="pure-menu">
            <a class="pure-menu-heading" href="#">Company</a>

            <ul class="pure-menu-list">
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">Home</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">Autor</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">Livro</a></li>


            </ul>
          </div>
        </div>

        <div id="main">
          <div class="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div class="content" id="content">
            <div class="pure-form pure-form-aligned">
              <form class="pure-form pure-form-aligned">
                <div class="pure-control-group">
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" type="text" name="nome" value="" />
                </div>
                <div class="pure-control-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value="" />
                </div>
                <div class="pure-control-group">
                  <label htmlFor="senha">Senha</label>
                  <input id="senha" type="password" name="senha" />
                </div>
                <div class="pure-control-group">
                  <label></label>
                  <button type="submit" class="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>

            </div>
            <div>
              <table class="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map(function (autor) {
                      return (
                        <tr>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>


      </div>

    );
  }
}

export default App;
