import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

import InputCustomizado from './componentes/InputCustomizado';
import SubmitCustomizado from './componentes/SubmitCustomizado';
import TratadorErros from './TratadorDeErros';


class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        }
        );

        PubSub.subscribe('atualiza-lista-autores', function (topico, novaLista) {
            this.setState({ lista: novaLista });
        }.bind(this));
    }


    render() {
        return (
            <div>
                <div>
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                        <br></br>
                        <FormularioAutor />
                        <TabelaAutores lista={this.state.lista} />
                    </div>
                </div>
            </div>
        );
    }
}

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: function (novaListagem) {
                PubSub.publish('atualiza-lista-autores', novaListagem);
                this.setState({ nome: '', email: '', senha: '' }); // limpando os campos
            }.bind(this),
            error: function (resposta) {
                if (resposta.status === 400) {
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros", {});
            }.bind(this)
        });


    }

    salvaAlteracao(nomeInput,evento) {
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;
        this.setState(campoSendoAlterado);
    }


    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">

                    <InputCustomizado id="nome" label="Nome" type="text" name="name" value={this.state.nome}
                        onChange={this.salvaAlteracao.bind(this,'nome')} />

                    <InputCustomizado id="email" label="Email" type="email" name="email" value={this.state.email}
                        onChange={this.salvaAlteracao.bind(this,'email')} />

                    <InputCustomizado id="senha" label="Senha" type="password" name="senha" value={this.state.senha}
                        onChange={this.salvaAlteracao.bind(this,'senha')} />

                    <SubmitCustomizado label="Gravar" />

                </form>

            </div>
        );
    }
}

class TabelaAutores extends Component {


    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (autor) {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AutorBox;