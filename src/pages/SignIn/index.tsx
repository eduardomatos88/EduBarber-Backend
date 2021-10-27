import { FC } from 'react'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Background, Container, Content } from './styles'

const SignIn: FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="EduBarber" />
      <form>
        <h1>Faça seu login</h1>
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          type="password"
          icon={FiLock}
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
        <a href="forgot">Esqueci minha senha</a>
      </form>
      <a href="login">
        <FiLogIn /> Criar conta
      </a>
    </Content>
    <Background />
  </Container>
)

export default SignIn
