import { VStack } from "native-base";

import Logo from '../assets/logo.svg';

import { Header } from "../components/Header";

export function New() {
  return(
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack >
        <Logo />
      </VStack>

    </VStack>
  );
}