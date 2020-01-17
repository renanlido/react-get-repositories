import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 16px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    & + li {
      margin-top: 10px;
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }
    div {
      flex: 1;
      margin-left: 15px;
      a {
        text-decoration: none;
        color: #333;
        &:hover {
          color: #7159c1;
        }
      }
      span {
        background: #eee;
        color: #333;
        border-radius: 4px;
        font-weight: 600;
        height: 20px;
        padding: 2px 4px;
        margin-left: 10px;
      }
    }
  }
`;

export const User = styled.a`
  text-decoration: none;
  margin-top: 5px;
  p {
    font-size: 12px;
    color: #999;
    &:hover {
      color: #7159c1;
    }
  }
`;

export const IssueFilter = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
  button {
    border-radius: 4px;
    border: 1px solid #7159c1;
    outline: 0;
    padding: 8px;
    margin: 0 0.25rem;
    background: white;
    color: #7159c1;
    &:nth-child(${props => props.active + 1}) {
      background: #7159c1;
      color: white;
      font-weight: bold;
    }
  }
`;

export const PageActions = styled.footer.attrs(props => ({
  disabled: props.disabledNext || props.disabledBack,
}))`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #7159c1;
  button {
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    background: #7159c1;
    color: white;
    &[disabled] {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;
