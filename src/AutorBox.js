import React, { Component } from 'react';
import InputCustomizado from './componentes/InputCustomizado';
import SubmitCustomizado from './componentes/SubmitCustomizado';


class AutorBox extends Component {
    render() {
        return (
            <div>
                <FormularioAutor />
                <InputCustomizado />
            </div>
        );
    }
}

class FormularioAutor extends Component {
    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">

                    <InputCustomizado id="nome" label="Nome" type="text" name="name" value={this.state.nome}
                        onChange={this.setNome} />

                    <InputCustomizado id="email" label="Email" type="email" name="email" value={this.state.email}
                        onChange={this.setEmail} />

                    <InputCustomizado id="senha" label="Senha" type="password" name="senha" value={this.state.senha}
                        onChange={this.setSenha} />

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
                            this.state.lista.map(function (autor) {
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