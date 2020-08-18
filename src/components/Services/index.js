import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import InfoBlock from 'components/ui/InfoBlock';
import Container from 'components/ui/Container';
import TitleSection from 'components/ui/TitleSection';
import FormatHtml from 'components/utils/FormatHtml';

import * as Styled from './styles';

const Services = () => {
  const { markdownRemark, allMarkdownRemark } = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { category: { eq: "services section" } }) {
        frontmatter {
          title
          subtitle
        }
      }
      allMarkdownRemark(filter: { frontmatter: { category: { eq: "services" } } }, sort: { fields: fileAbsolutePath }) {
        edges {
          node {
            id
            html
            frontmatter {
              title
              icon
              description
            }
          }
        }
      }
    }
  `);

  const sectionTitle = markdownRemark.frontmatter;
  const services = allMarkdownRemark.edges;

  return (
    <Container section>
      <TitleSection title={sectionTitle.title} subtitle={sectionTitle.subtitle} center />
      <Styled.Services>
        {services.map((item) => {
          const {
            id,
            html,
            frontmatter: { title, icon, description }
          } = item.node;

          return (
            <Styled.ServiceItem key={id}>
              <InfoBlock 
                icon={icon} 
                title={title} 
                content={<FormatHtml content={html} />}
              />
            </Styled.ServiceItem>
          );
        })}
      </Styled.Services>
    </Container>
  );
};

export default Services;
