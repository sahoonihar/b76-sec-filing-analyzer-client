import styled, { keyframes } from 'styled-components';

const Loader = ({ fixed }) => (
  <Container style={fixed && { position: 'fixed' }}>
    <LoaderTrack>
      <LoaderFill />
    </LoaderTrack>
  </Container>
);

export default Loader;

const Container = styled.div`
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 0.1rem;
`;

const LoaderTrack = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 0.1rem;
  overflow: hidden;
`;

const Anim1 = keyframes`
  0%   {
    right: 100%;
    left: -35%;
  }
  60%  {
    right: -90%;
    left: 100%;
  }
  100% {
    right: -35%;
  left: 100%;
  }
`;

const Anim2 = keyframes`
  0%   {
    right: 100%;
    left: -200%;
  }
  60%  {
    right:  -8%;
    left:  107%;
  }
  100% {
    right:  -8%;
    left:  107%;
  }
`;

const LoaderFill = styled.div`
  &::after,
  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      -135deg,
      #5d5fef 0%,
      #5d5fef 30%,
      transparent 100%
    );
    content: '';
    will-change: left, right;
  }
  &::before {
    animation: ${Anim1} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }
  &::after {
    animation: ${Anim2} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
  }
`;
