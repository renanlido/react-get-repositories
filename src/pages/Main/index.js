import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, ErrorMessage } from './styles';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepo: '',
      repositories: [],
      loading: 0,
      hasError: 0,
      errorMessage: '',
    };
  }

  /** NOTE  Carregar dados do localStorage */

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  /** NOTE Salvar dados no localStorage */

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSumbit = async e => {
    e.preventDefault();

    try {
      this.setState({
        loading: 1,
      });

      const { newRepo, repositories } = this.state;

      if (newRepo.toLowerCase() === '') {
        throw new Error('Você precisa adicionar um repositório.');
      }

      const hasRepo = repositories.find(
        r => r.name.toLowerCase() === newRepo.toLowerCase()
      );

      if (hasRepo) {
        throw new Error('Já existe um repositório com este nome, tente outro.');
      }

      const response = await api.get(`/repos/${newRepo}`).catch(() => {
        throw new Error('Repositório inválido ou inexistente.');
      });

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: 0,
        hasError: 0,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        loading: 0,
        hasError: 1,
      });
    }
  };

  render() {
    const {
      newRepo,
      repositories,
      loading,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSumbit} error={hasError}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <ErrorMessage error={hasError}>
          <span>{errorMessage}</span>
        </ErrorMessage>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhar
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
