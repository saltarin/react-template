import * as React from 'react';
import { Banner, Logo, LogoWrapper,Content, Message, ButtonWrapper } from './styled';
import { Button } from 'antd';
import img from '@app/src/assets/img/logo.svg';

const Welcome = () => (
    <Banner>
        <Content>
            <LogoWrapper>       
                <Logo href={img} />    
            </LogoWrapper>
            <Message>Bienvenido! Comienza a codear!</Message>
            <ButtonWrapper>
                <Button target="_blank" type="primary" href="http://orbis.docs.frontend.s3-website-eu-west-1.amazonaws.com/">Iniciar</Button>
            </ButtonWrapper>
        </Content>
    </Banner>
)

export {
    Welcome
}