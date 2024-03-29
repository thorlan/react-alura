import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

import InputCustomizado from './componentes/InputCustomizado';
import SubmitCustomizado from './componentes/SubmitCustomizado';
import TratadorErros from './TratadorDeErros';

class LivroBox extends Component {

    constructor() {
        super();
        this.state = { lista: [], autores: [] };
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/livros",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        }
        );

        PubSub.subscribe('atualiza-lista-livros', function (topico, novaLista) {
            this.setState({ lista: novaLista });
        }.bind(this));

        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ autores: resposta });
            }.bind(this)
        }
        );
    }


    render() {
        return (
            <div>
                <div>
                    <div className="header">
                        <h1>Cadastro de Livros</h1>
                    </div>
                    <div className="content" id="content">
                        <br></br>
                        <FormularioLivro autores={this.state.autores} />
                        <TabelaDeLivros lista={this.state.lista} />
                    </div>
                </div>
            </div>
        );
    }
}

class FormularioLivro extends Component {

    constructor() {
        super();
        this.state = {titulo: '', preco: '', autorId: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/api/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId }),
            success: function (novaListagem) {
                PubSub.publish('atualiza-lista-livros', novaListagem);
                this.setState({ titulo: '', preco: '', autorId: '' }); // limpando os campos
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

    setTitulo(evento) {
        this.setState({ titulo: evento.target.value });
    }

    setPreco(evento) {
        this.setState({ preco: evento.target.value });
    }

    setAutorId(evento) {
        this.setState({ autorId: evento.target.value });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">

                    <InputCustomizado id="titulo" label="Título" type="text" name="titulo" value={this.state.titulo}
                        onChange={this.setTitulo} />

                    <InputCustomizado id="preco" label="Preço" type="number" name="preco" value={this.state.preco}
                        onChange={this.setPreco} />



                    <div className="pure-control-group">
                        <label>Autor</label>
                        <select value={this.state.autorId} name="autorId" onChange={this.setAutorId}>
                        <option value="">Selecione</option>
                        {
                            this.props.autores.map(function (autor) {
                                return <option key={autor.id} value={autor.id}>
                                    {autor.nome}
                                </option>;
                            })
                        }
                    </select>
                    </div>



                   

                    <SubmitCustomizado label="Gravar" />

                </form>

            </div>
        );
    }
}

class TabelaDeLivros extends Component {


    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (livro) {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
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

export default LivroBox;