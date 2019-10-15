import styled from 'styled-components';

const Banner = styled.div`
    background-color: #fff;
    color: #575756;
    height: 600px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: verdana, sans-serif;
`;

const Content = styled.div`
    flex-direction: column;
`;

const Message = styled.p`
    margin: 20px auto 30px;
    text-align: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const LogoWrapper = styled.svg`
    width: 400px;
`;

const Logo = styled.image`
    width: 100%;
    height: 100%;
`;

export {
    Banner,
    Content,
    Message,
    ButtonWrapper,
    LogoWrapper,
    Logo
}

