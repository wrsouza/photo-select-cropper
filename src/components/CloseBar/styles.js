import styled from 'vue-styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background: #fafafa;
  border-bottom: 1px solid #ccc;
  z-index: 999;
`;

export const Revel = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  img {
    display: block;
    margin: 10px 15px;
    height: 34px;
  }
`;

export const Logotipo = styled.a`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 70px;
  background: #fff;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  cursor: pointer;

  img {
    display: block;
    margin: 10px auto;
    height: 50px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 36px;
  height: 36px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  transform: translateX(-6px);
  outline: none;

  i {
    font-size: 20px;
    color: #777;
  }

  &:hover {
    background: #c70000;
    border: 1px solid #c70000;

    i {
      color: #fff;
    }
  }
`;
