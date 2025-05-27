'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth/AuthContext';
import { Button, Card, Container, Divider, Group, Stack, Title, Text, Table } from '@mantine/core';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user);
    if (user === null) {
      router.push('/login');
    }

    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        router.push('/login');
      });
    

  }, [user, router]);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  

  return (
    <Container size="sm" style={{ marginTop: 40 }}>
      <Title order={2} mb="lg">
        Account Info
      </Title>

      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th align='left'>Email:</th>
              <td>{userInfo?.user_email}</td>
            </tr>
            <tr>
              <th align='left'>Full Name:</th>
              <td>{userInfo?.user_fullname}</td>
            </tr>
            <tr>
              <th align='left'>Country:</th>
              <td>{userInfo?.user_countryinlive}</td>
            </tr>
            <tr>
              <th align='left'>Age:</th>
              <td>{userInfo?.user_age}</td>
            </tr>
          </thead>
        </Table>
      </Card>
    </Container>
  );
}