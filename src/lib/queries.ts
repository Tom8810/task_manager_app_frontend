import { gql } from "@apollo/client";

export const USER_BY_NAME = gql`
  query USER_BY_NAME($name: String!) {
    userByName(name: $name) {
      id
      name
      projects {
        createdAt
        deadline
        deletedAt
        goalTime
        id
        name
        totalTime
        updatedAt
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: MutationUser!) {
    createUser(input: $input) {
      id
      name
      projects {
        createdAt
        deadline
        deletedAt
        goalTime
        id
        name
        totalTime
        updatedAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: MutationProject!) {
    createProject(input: $input) {
      id
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: MutationProject!) {
    updateProject(id: $id, input: $input) {
      id
    }
  }
`;

export const DELETE_PRORJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;
