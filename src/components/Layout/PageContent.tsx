import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type PageContentProps = {
  children: ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex justify='center' p='16px 0px'>
      <Flex
        width='95%'
        justify='center'
        maxWidth='860px'
        direction={'column'}
        padding='2rem'
      >
        {children}
      </Flex>
    </Flex>
  );
};
export default PageContent;
