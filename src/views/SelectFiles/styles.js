import styled from 'vue-styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 220px;
  transform: translate(-50%, -50%);
`;

export const ContainerTitle = styled.h3`
  margin: 0 0 10px 0;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  color: #999;
  text-align: center;
`;

export const LocalButton = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  color: #0066cc;
  line-height: 20px;
  vertical-align: middle;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;

  i {
    margin-right: 5px;
    font-size: 15px;
  }

  &:hover {
    color: #fff;
    background: #c70000;
    border: 1px solid #c70000;
  }
`;

export const FacebookButton = styled.button`
  display: block;
  margin-top: 5px;
  width: 100%;
  height: 40px;
  background: #0066cc;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  line-height: 20px;
  vertical-align: middle;
  border-radius: 5px;
  border: 1px solid #0066cc;
  outline: none;

  i {
    margin-right: 5px;
    font-size: 15px;
  }

  &:hover {
    color: #fff;
    background: ${darken(0.1, '#0066cc')};
    border: 1px solid #0066cc;
  }
`;
