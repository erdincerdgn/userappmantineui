'use client';
import { Button, TextInput, PasswordInput, Title, Container, Paper, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      user_email: '',
      user_password: ''
    },

    validate: {
      user_email: (value) => (/^\S+@\S+$/.test(value) ? null : 'invalid email'),
      user_password: (value) =>
        value.length >= 8 ? null : 'Password must be at least 8 characters'
    }
  });

  const { login } = useAuth();

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError('');
    
    try {
      await login(values.user_email, values.user_password);
      router.push('/dashboard');
      console.log("giriş başarili");
    } catch (err: any) {
      setError(err.message || 'Login Failed.');
    } finally {
      setLoading(false);
    }
};

  return (
    <Container size={420} my={40}>
      <Title align="center">Login Page</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="E-mail"
                placeholder="mail@ornek.com"
                {...form.getInputProps('user_email')}
              />

              <PasswordInput
                label="Password"
                placeholder="••••••••"
                {...form.getInputProps('user_password')}
              />
            </Stack>

            <Button fullWidth mt="xl" type="submit">
              Sign In
            </Button>
          </form>
        </Paper>
    </Container>
  );




  // return (
  //   <Container size={420} my={100}>
  //     <Title align="center" mb="md">Giriş Yap</Title>
  //     <TextInput label="E-posta" placeholder="mail@ornek.com" required />
  //     <PasswordInput label="Şifre" required mt="sm" />
  //     <Group position="apart" mt="md">
  //       <Anchor component="button" size="sm">Şifremi unuttum</Anchor>
  //     </Group>
  //     <Button fullWidth mt="xl">Giriş Yap</Button>
  //   </Container>
  // );
}