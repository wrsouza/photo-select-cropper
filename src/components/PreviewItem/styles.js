import styled from 'vue-styled-components';
import { darken } from 'polished';

export const ItemContainer = styled.div`
  margin: 3px;
  padding: 4px;
  background: transparent;
  border-radius: 7px;
  border: 3px solid transparent;

  &:hover {
    background: rgba(0, 108, 198, 0.1);
  }

  &.selected {
    background: rgba(0, 108, 198, 0.1);
    border: 3px solid rgba(0, 108, 198, 0.5);
  }
`;

const itemImageProps = {
  width: String,
  height: String,
};

export const ItemImage = styled('div', itemImageProps)`
  display: flex;
  margin: 0 auto;
  justify-content: center; /* x */
  align-items: center; /* y */
  width: ${props => props.width};
  height: ${props => props.height};
  background: #fff;
  border: 1px solid #000;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  span {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: rgba(100, 0, 0, 0.2);

    i {
      display: block;
      margin-bottom: 15px;
      font-size: 120px;
      color: rgba(200, 0, 0, 0.2);
    }
  }
`;

const itemToolsProps = {
  width: String,
};

export const ItemTools = styled('div', itemToolsProps)`
  position: relative;
  width: ${props => props.width};
  margin: 5px auto 0 auto;
  background: green;

  .title {
    display: block;
    margin-bottom: 3px;
    font-size: 11px;
    color: #666;
    text-align: center;
  }

  button {
    float: left;
    width: 40px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    border: none;
    outline: 0;

    i {
      font-size: 18px;
    }
  }

  .quantity {
    float: left;
    width: 138px;

    &-display {
      float: left;
      margin: 0 4px;
      width: 50px;
      height: 40px;
      font-size: 14px;
      color: #06c;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #000;
      background: #fff;
    }
  }

  .edit {
    float: left;
    margin: 0 7px;
    width: 40px;
  }

  .crop {
    float: left;
    width: 40px;
  }

  .trash {
    float: right;
    width: 40px;
  }

  .btn {
    &-plus,
    &-minus {
      background: #414141;

      &:hover {
        background: ${darken(0.1, '#414141')};
      }
    }

    &-edit {
      background: #0066cc;

      &:hover {
        background: ${darken(0.1, '#0066CC')};
      }
    }

    &-crop {
      background: #ff8800;

      &:hover {
        background: ${darken(0.1, '#ff8800')};
      }
    }

    &-trash {
      background: #c70000;

      &:hover {
        background: ${darken(0.1, '#c70000')};
      }
    }
  }
`;

export const TextTools = styled.div`
  position: absolute;
  top: -10px;
  left: 10px;
  width: 260px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease-in-out;

  &.active {
    transform: translateY(-100%);
    visibility: visible;
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }

  &::after {
    position: absolute;
    content: ' ';
    clear: both;
    left: 145px;
    bottom: 0;
    transform: translateY(100%);
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
  }

  textarea {
    display: block;
    min-width: 260px;
    max-width: 260px;
    width: 260px;
    min-height: 80px;
    max-height: 80px;
    height: 80px;
    padding: 8px;
    font-size: 13px;
    line-height: 20px;
    color: #06c;
    border: none;
    outline: none;
    background: transparent;

    &::placeholder {
      color: #aaa;
    }
  }
`;
