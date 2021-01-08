import styled from 'vue-styled-components';

const PreviewContainer = styled.div`
  display: flex;
  padding-top: 10px;
  flex-wrap: wrap;
  justify-content: left;

  & > * {
    flex: 1 0 280px;
  }
`;

export default PreviewContainer;
