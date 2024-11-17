import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="btn-class-name">
        <span>Explore Now</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z">
          </path>
        </svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn-class-name {
    --color: 180,255, 100;
    border-radius: .5em;
    transition: .3s;
    background-color: rgba(var(--color), .2);
    color: rgb(var(--color));
    fill: rgb(var(--color));
    font-family: monospace;
    font-weight: bolder;
    font-size: x-large;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    border: 2px solid rgb(var(--color));
    box-shadow: 0 0 10px rgba(var(--color), .4);
    outline: none;
    display: flex;
    align-items: center;
    padding: .5em 1em;
  }

  .btn-class-name:hover {
    box-shadow: 0 0 0 5px rgba(var(--color), .5);
  }

  .btn-class-name span {
    transform: scale(.8);
    transition: .3s;
  }

  .btn-class-name:hover span {
    transform: scale(1);
  }

  .btn-class-name svg {
    font-size: 0;
    transform: scale(0.5) translateX(0%) rotate(-180deg);
    transition: .3s;
  }

  .btn-class-name:hover svg {
    font-size: 20px;
    transform: scale(1) translateX(20%) rotate(0deg);
  }

  .btn-class-name:active {
    transition: 0s;
    box-shadow: 0 0 0 5px rgb(var(--color));
  }`;

export default Button;
