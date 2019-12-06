import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Error } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: 0,
    hasError: 0,
    errorMessage: [
      { code: 100, message: 'Você precisa indicar um repositório' },
      { code: 101, message: 'Este repositório já existe' },
      { code: 102, message: 'Repositório inválido ou inexistente' },
    ],
    errorCode: 0,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    try {
      const { repositories, newRepo } = this.state;

      e.preventDefault();

      this.setState({
        loading: 1,
      });

      if (newRepo.toLowerCase() === '') {
        this.setState({
          errorCode: 100,
        });
        throw new Error('Você precisa indicar um repositório');
      }

      const hasRepo = repositories.find(r => r.name === newRepo.toLowerCase());

      if (hasRepo) {
        this.setState({
          errorCode: 101,
        });
        throw new Error('Repositório Duplicado');
      }

      const response = await api
        .get(`/repos/${newRepo.toLowerCase()}`)
        .catch(error => {
          this.setState({
            errorCode: 102,
          });
          throw new Error(error);
        });

      const data = {
        name: response.data.full_name.toLowerCase(),
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: 0,
        hasError: 0,
      });
    } catch (error) {
      this.setState({
        hasError: 1,
      });
    } finally {
      this.setState({
        loading: 0,
      });
    }
  };

  render() {
    const {
      newRepo,
      repositories,
      loading,
      hasError,
      errorCode,
      errorMessage,
    } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={hasError}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
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

        <Error error={hasError}>
          <span>
            {errorMessage.map(m => m.code === errorCode && m.message)}
          </span>
        </Error>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
