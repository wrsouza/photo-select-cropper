import styled from 'vue-styled-components';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);

  img {
    display: inline-block;
    margin: 0 auto 10px auto;
    height: 50px;
  }
`;

export const ContainerTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #999;
`;

export const Loader = styled.div`
  margin: 10px 0;
  text-align: center;
`;

export const Ball = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  opacity: 1;

  &:nth-child(1) {
    animation: scaleFade 1s 0.2s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }

  &:nth-child(2) {
    animation: scaleFade 1s 0.4s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }

  &:nth-child(3) {
    animation: scaleFade 1s 0.6s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }

  @keyframes scaleFade {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    25% {
      transform: scale(0.8);
      opacity: 0.8;
    }
    50% {
      transform: scale(1);
      opacity: 1;
      margin: 0 3px;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
`;

export const Info = styled.p`
  font-size: 12px;
  color: #06c;
  text-align: center;
  opacity: 0.5;
`;
