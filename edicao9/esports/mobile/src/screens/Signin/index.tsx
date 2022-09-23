import { Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameController } from 'phosphor-react-native';
import * as AuthSession from 'expo-auth-session';

import { THEME } from '../../theme';
import { styles } from './styles';
import logImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';


export function SignIn() {
 
  async function handleDiscordSignIn() {
    AuthSession.startAsync({
      authUrl: ""
    })

  }
  
  return (
    <Background>
    <SafeAreaView  style={styles.container}>
      <Image source={logImg} style={styles.logo}
      />

      <Heading 
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleDiscordSignIn}        
      >

       <GameController
        color={THEME.COLORS.TEXT}
        size={20}        
      />

      <Text style={styles.buttonTitle}>
        Entrar com Discord
      </Text>
      </TouchableOpacity>
    </SafeAreaView>
    </Background>
  );
}