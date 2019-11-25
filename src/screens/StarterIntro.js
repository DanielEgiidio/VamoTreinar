import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:#FFF;
    margin:0 30px;
`;

const WelcomeText = styled.Text`
    font-size:22px;
    color:#333;
    margin-top:50px;
`;
const WelcomeImage = styled.View`
    flex:1;
    justify-content:center;
`;
const WelcomeLogo = styled.Image`
    width:250px;
    height:250px;
`;

const BeginConfigArea = styled.View`
    width:100%;
    margin-bottom:50px;
`;
const ButtonText = styled.Text`
    color:#FFF;
`;

const Page = (props) => {

    const start = () => {
        props.navigation.navigate('StarterName');
    };

    return (
        <Container>
            <WelcomeText>Bem vindo(a) ao VamoTreinar</WelcomeText>
            <WelcomeImage>
                <WelcomeLogo source={require('../assets/boneco.png')} />
            </WelcomeImage>
            <BeginConfigArea>
                <DefaultButton width="100%" bgcolor="#04B431" underlayColor="#81F781" onPress={start}>
                    <ButtonText>Iniciar</ButtonText>
                </DefaultButton>
            </BeginConfigArea>
        </Container>
    );
};

Page.navigationOptions = {
    header:null
};

export default Page;