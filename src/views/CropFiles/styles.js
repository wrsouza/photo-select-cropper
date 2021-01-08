import styled from 'vue-styled-components';

export const Container = styled.div`
  display: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
`;

export const CanvasContainer = styled.div`
  float: left;
  width: calc(100% - 260px);
  height: 100%;

  @media (max-width: 900px) {
    float: none;
    width: 100%;
    height: calc(100% - 260px);
  }

  @media (max-width: 700px) {
    height: calc(100% - 160px);
  }
`;
