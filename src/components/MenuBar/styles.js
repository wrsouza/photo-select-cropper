import styled from 'vue-styled-components';
import { darken } from 'polished';

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
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  cursor: pointer;

  img {
    display: block;
    margin: 10px auto;
    height: 50px;
  }
`;

export const MenuButton = styled.button`
  position: absolute;
  top: 6px;
  left: -36px;
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
    background: #0066cc;
    border: 1px solid #0066cc;

    i {
      color: #fff;
    }
  }

  &.openned {
    border-radius: 5px 0 0 5px;
    transform: translateX(0);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);

    &:hover {
      background: #c70000;
      border: 1px solid #c70000;
    }
  }
`;

export const NavMenu = styled.div`
  position: fixed;
  right: 0;
  width: 220px;
  height: 100%;
  background: #fff;
  border-left: 1px solid #ccc;
  transform: translateX(100%);
  transition: all 0.5s ease-in-out;
  z-index: 999;

  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    transform: translateX(-100%);
    background: rgba(0, 0, 0, 0.8);
    visibility: hidden;
    opacity: 0;
    z-index: -1;
    transition: all 0.5s ease-in-out;
  }

  &.openned {
    transform: translateX(0);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    transition: all 0.5s ease-in-out;

    &::after {
      visibility: visible;
      opacity: 1;
      transition: all 0.5s ease-in-out;
    }
  }

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    min-height: 100%;
  }

  .container-top {
    margin-bottom: 5px;
  }

  .container-bottom {
    margin-top: 5px;
  }

  .btn-blue,
  .btn-gray,
  .btn-red {
    margin-bottom: 5px;
    width: 100%;
    height: 40px;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    border: none;
    border-radius: 5px;
    outline: none;
  }

  .btn-blue {
    background: #0066cc;

    &:hover {
      background: ${darken(0.1, '#0066cc')};
    }
  }

  .btn-gray {
    background: #666666;

    &:hover {
      background: ${darken(0.1, '#666666')};
    }
  }

  .btn-red {
    background: #c70000;

    &:hover {
      background: ${darken(0.15, '#c70000')};
    }
  }

  .box-info {
    margin-top: 5px;
    padding: 10px;
    background: #f5f5f5;
    border: 1px dashed #ccc;

    &-title {
      display: block;
      font-size: 10px;
    }

    &-size {
      display: block;
      margin-bottom: 10px;
      font-size: 13px;
      font-weight: bold;
      color: #0066cc;
    }

    &-paper {
      font-size: 12px;
      color: #0066cc;
    }
  }

  .resume-title {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    text-align: center;
  }

  .resume-item {
    display: block;
    margin-bottom: 3px;

    &-title {
      display: inline-block;
      width: 100px;
      font-size: 12px;
      color: #666;
      text-align: right;
    }

    &-fotos {
      font-weight: 600;
      color: #06c;
    }

    &-vfotos {
      color: #333;
    }

    &-vtotal {
      font-size: 16px;
      font-weight: 600;
      color: #06c;
    }
  }

  .btn-confirm,
  .btn-cancel {
    width: 100%;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    border: none;
    border-radius: 5px;
    outline: none;
  }

  .btn-confirm {
    margin-top: 10px;
    height: 40px;
    background: #0a9100;

    &:hover {
      background: ${darken(0.05, '#0a9100')};
    }
  }

  .btn-cancel {
    margin-top: 5px;
    height: 34px;
    background: #c70000;

    &:hover {
      background: ${darken(0.15, '#c70000')};
    }
  }
`;
