'use client';
import React from 'react';
import { Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

const LandingBox = () => {
  return (
    <Flex
      minHeight={'inherit'}
      alignItems={'center'}
      justifyContent={'center'}
      w={'100%'}
    >
      <VStack textAlign="center" spacing={0}>
        <Text
          as="h1"
          fontFamily={'Tomorrow'}
          fontSize="5xl"
          fontWeight="500"
          color="hashlists.grey"
        >
          <Flex align="center" justify="center">
            <Text as="span" mr={2}>
              <Image
                src="/logo-uap.png"
                alt="Hashlists logo"
                height={'100px'}
                width={'120px'}
              />
            </Text>
            <Text
              as="span"
              fontSize={{
                base: '2xl',
                sm: '3xl',
                md: '4xl',
              }}
            >
              Universal Assistant Protocol
            </Text>
          </Flex>
        </Text>
        <Text
          lineHeight="34px"
          fontSize={{
            base: 'lg',
            sm: 'xl',
            md: '2xl',
          }}
          color="hashlists.grey"
          fontFamily="Montserrat"
          fontWeight={500}
          align="center"
        >
          Engage your personal blockchain assistant
        </Text>
        <Flex gap={4} mt="30px">
          <Link href={'/urd/config'}>
            <Button
              color={'hashlists.grey'}
              borderRadius="10px"
              border="1px solid var(--chakra-colors-hashlists-grey)"
              fontFamily={'Montserrat'}
              fontWeight={500}
              backgroundColor={'hashlists.yellow'}
            >
              Configure
            </Button>
          </Link>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default LandingBox;
