import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import AutorBox from './AutorBox';

class App extends Component {

  constructor() {
    super();
    this.state = {
      lista: [],
      nome: '', email: '', senha: ''
    };
    this.populateAutores();
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  enviaForm(evento) {
    evento.preventDefault();
    $.ajax({
      url: "http://localhost:8080/api/autores",
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
      success: function (resposta) {
        this.setState({ lista: resposta });
      }.bind(this),
      error: function (resposta) {
        console.log("erro");
      }
    }
    );

    this.limpaCampos();

  }

  limpaCampos() {
    this.setState({ nome: '' });
    this.setState({ email: '' });
    this.setState({ senha: '' });
  }

  setNome(evento) {
    this.setState({ nome: evento.target.value });
  }
  setEmail(evento) {
    this.setState({ email: evento.target.value });
  }
  setSenha(evento) {
    this.setState({ senha: evento.target.value });
  }

  populateAutores() {
    $.ajax({
      url: "http://localhost:8080/api/autores",
      dataType: 'json',
      success: function (resposta) {
        this.setState({ lista: resposta });
      }.bind(this)
    }
    );
  }


  render() {
    return (

      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">

          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>


            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
            <br />
              <AutorBox/>
          </div>
        </div>


      </div>

    );
  }
}

export default App;
