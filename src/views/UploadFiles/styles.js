import styled from 'vue-styled-components';

export const Container = styled.div`
  position: relative;
  margin: 30px auto 30px auto;
  width: 100%;
  max-width: 750px;
  padding: 0 25px;

  @media (max-width: 900px) {
    max-width: 650px;
  }

  @media (max-width: 700px) {
    max-width: auto;
  }
`;

export const ContainerTitle = styled.h3`
  margin: 0 0 10px 0;
  padding: 0;
  font-size: 20px;
  font-weight: 600;
  color: #999;
  text-align: center;
`;

export const ListFiles = styled.ul`
  display: block;
  width: 100%;
  list-style: none;
`;

export const ItemFile = styled.li`
  position: relative;
  margin-top: 7px;
  display: block;
  line-height: 45px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow: hidden;

  &:first-child {
    margin-top: 0;
  }

  @media (max-width: 900px) {
    margin-top: 5px;
    line-height: 34px;
  }

  @media (max-width: 700px) {
    margin-top: 4px;
    line-height: 30px;
  }
`;

export const ProgressBar = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  background: rgba(0, 100, 200, 0.07);
  border-radius: 4px;

  &.complete {
    background: rgba(0, 200, 0, 0.07);
  }

  &.error {
    background: rgba(200, 0, 0, 0.07);
  }
`;

export const Name = styled.span`
  display: block;
  padding: 0 15px;
  font-size: 16px;
  color: #06c;
  line-height: 45px;

  @media (max-width: 900px) {
    padding: 0 12px;
    font-size: 14px;
    line-height: 34px;
  }

  @media (max-width: 700px) {
    padding: 0 10px;
    font-size: 13px;
    line-height: 30px;
  }
`;
