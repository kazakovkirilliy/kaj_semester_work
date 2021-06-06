import React, { useState } from 'react';
import { Formik } from 'formik';
import axios, { AxiosError } from 'axios';

import { InputField } from '../../../components/Forms/Fields/fields/InputField';
import { ActionButton } from '../../../style/components/forms/ActionButton';
import LoadingPlaceholder from '../../LoadingPlaceholder';
import { Project } from './useProjects';
import { API_URL } from '../../../config/paths';
import { LoadingPlaceholderWrapper, SForm } from '../styles';

const EUR: 'EUR' = 'EUR'; // why oh why
const initialValues = {
  title: '',
  description: '',
  clientName: '',
  hourlyRate: 0,
  currency: EUR,
};

enum CreateProjectFormField {
  Title = 'title',
  Description = 'description',
  ClientName = 'clientName',
  HourlyRate = 'hourlyRate',
  Currency = 'currency',
}

interface CPFProps {
  onDone: () => void;
}

type ProjectCreationBody = Omit<Project, 'id'>;

const performProjectCreation = (project: ProjectCreationBody): Promise<string | void> => {
  return axios
    .post(`${API_URL}/projects`, project, {
      withCredentials: true,
    })
    .then((resp) => {
      if (resp instanceof Error) throw resp; // ????? round2
      return resp.status < 400 ? void 0 : resp.data.message;
    })
    .catch((e: AxiosError) => {
      return e?.response?.data?.message ?? 'An error has occurred.';
    });
};

export const CreateProjectForm: React.FC<CPFProps> = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const createProject = (values: ProjectCreationBody) => {
    setSubmitting(true);
    performProjectCreation(values).then((errMsg) => {
      if (errMsg) {
        setSubmitting(false);
        setErrorMessage(errMsg);
      } else {
        props[0].closeModal();
        props.onDone();
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        createProject(values);
        resetForm({});
      }}
    >
      {() =>
        submitting ? (
          <LoadingPlaceholderWrapper>
            <LoadingPlaceholder />
          </LoadingPlaceholderWrapper>
        ) : errorMessage ? (
          <>
            <p>{errorMessage}</p>
            <ActionButton type="button" onClick={() => setErrorMessage(undefined)}>
              Try again
            </ActionButton>
          </>
        ) : (
          <SForm>
            <InputField
              fieldType="string"
              label="Title"
              name={CreateProjectFormField.Title}
              required
            />
            <InputField
              fieldType="string"
              label="Description"
              name={CreateProjectFormField.Description}
            />
            <InputField
              fieldType="string"
              label="Client name"
              name={CreateProjectFormField.ClientName}
              required
            />
            <InputField
              fieldType="string"
              label="Hourly rate"
              name={CreateProjectFormField.HourlyRate}
              type="number"
            />
            <InputField
              required
              fieldType="select"
              label="Currency"
              name={CreateProjectFormField.Currency}
            >
              <option value={'CZK'}>Czech Koruna</option>
              <option value={'EUR'}>Euro</option>
              <option value={'USD'}>US Dollar</option>
            </InputField>
            <ActionButton type="submit">Create</ActionButton>
          </SForm>
        )
      }
    </Formik>
  );
};
