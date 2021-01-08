import styled from 'vue-styled-components';
import { darken } from 'polished';

export const CropContainer = styled.div`
  float: right;
  padding: 24px;
  width: 260px;
  height: 100%;

  @media (max-width: 900px) {
    float: none;
    width: 460px;
    height: 260px;
    margin: 0 auto;
    padding: 30px 0;
  }

  @media (max-width: 700px) {
    padding: 10px 0;
    width: 300px;
    height: 160px;
  }
`;

export const CropInfo = styled.div`
  padding: 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  background: #efefef;
  border: 1px dashed #ccc;

  @media (max-width: 900px) {
    padding: 12px;
    float: right;
    width: 200px;
    margin-bottom: 30px;
  }

  @media (max-width: 700px) {
    padding: 7px;
    margin-bottom: 18px;
    width: 140px;
    font-size: 10px;
  }
`;

export const CropButtons = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: -4px;
  margin-right: -4px;

  @media (max-width: 900px) {
    float: left;
    width: 220px;
    margin: 0;
  }

  @media (max-width: 700px) {
    width: 155px;
  }
`;

export const CropButtonsPosition = styled.div`
  float: left;
  display: table;
  padding: 0;
  width: 132px;

  span {
    display: block;
    font-size: 11px;
    text-align: center;

    @media (max-width: 700px) {
      font-size: 9px;
    }
  }

  button {
    float: left;
    width: 36px;
    height: 36px;
    margin: 4px;
    color: #fff;
    background: #3385d6;
    font-size: 18px;
    border-radius: 4px;
    border: none;
    outline: none;
    text-decoration: none;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: ${darken(0.1, '#3385d6')};
    }

    .rotate-increase {
      transform: rotate(45deg);
    }

    .rotate-decrease {
      transform: rotate(-45deg);
    }

    @media (max-width: 700px) {
      width: 26px;
      height: 26px;
      margin: 2px;
      font-size: 13px;
      border-radius: 3px;
    }
  }

  @media (max-width: 700px) {
    width: 94px;
  }
`;

export const CropButtonsZoom = styled.div`
  float: left;
  display: table;
  padding: 0;
  margin: 0;
  width: 44px;

  span {
    display: block;
    font-size: 11px;
    text-align: center;

    @media (max-width: 700px) {
      font-size: 9px;
    }
  }

  button {
    float: left;

    width: 36px;
    height: 36px;
    margin: 4px;
    color: #fff;
    background: #717171;
    font-size: 18px;
    border-radius: 4px;
    border: none;
    outline: none;
    text-decoration: none;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: ${darken(0.1, '#717171')};
    }

    @media (max-width: 700px) {
      width: 26px;
      height: 26px;
      margin: 2px;
      font-size: 13px;
      border-radius: 3px;
    }
  }

  @media (max-width: 700px) {
    width: 31px;
  }
`;

export const CropButtonsRotation = styled.div`
  float: left;
  display: table;
  padding: 0;
  width: 44px;

  span {
    display: block;
    font-size: 11px;
    text-align: center;

    @media (max-width: 700px) {
      font-size: 9px;
    }
  }

  button {
    float: left;
    width: 36px;
    height: 58px;
    margin: 4px;
    color: #fff;
    background: #ffa033;
    font-size: 18px;
    border-radius: 4px;
    border: none;
    outline: none;
    text-decoration: none;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: ${darken(0.1, '#ffa033')};
    }

    .flip {
      transform: scaleX(-1);
    }

    @media (max-width: 700px) {
      width: 26px;
      height: 41px;
      margin: 2px;
      font-size: 13px;
      border-radius: 3px;
    }
  }

  @media (max-width: 700px) {
    width: 31px;
  }
`;

export const CropSlidePb = styled.div`
  position: relative;
  display: table;
  width: 100%;
  margin: 0;
  padding: 4px;
  text-align: left;

  span {
    display: block;
    font-size: 11px;
    text-align: center;

    @media (max-width: 700px) {
      font-size: 9px;
    }
  }

  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 10px;
    background: #ddd;
    outline: none;
    padding: 0;
    margin: 0;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #fff;
      border: 2px solid #bbb;
      cursor: pointer;
      transition: all 0.15s ease-in-out;

      &:hover {
        width: 30px;
        height: 30px;
      }
    }
  }

  @media (max-width: 900px) {
  }

  @media (max-width: 768px) {
  }
`;

export const CropEvents = styled.div`
  margin: 0;
  padding: 0;

  button {
    width: 100%;
    padding: 12px 0;
    font-weight: 600;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    outline: none;

    i {
      margin-right: 5px;
    }

    &.cancel {
      color: #fff;
      background: #c70000;

      &:hover {
        background: ${darken(0.1, '#c70000')};
      }
    }

    &.confirm {
      margin-top: 8px;
      color: #fff;
      background: #0a9100;

      &:hover {
        background: ${darken(0.1, '#0a9100')};
      }
    }

    @media (max-width: 700px) {
      padding: 9px 0;
      font-size: 13px;
    }
  }

  @media (max-width: 900px) {
    float: right;
    width: 200px;
  }

  @media (max-width: 700px) {
    width: 140px;
  }
`;
